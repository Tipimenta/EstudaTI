"""Download seguro de edital PDF público, sem SSRF nem credenciais.

Regras:
- HTTPS obrigatório; porta 443; sem usuário/senha; redirects revalidados.
- Cada endereço DNS deve ser público. A conexão é presa ao IP validado,
  evitando resolução diferente entre verificação e acesso (DNS rebinding).
- TLS/SNI e certificado são verificados contra o hostname original.
- Máximo de 8 MiB, 3 URLs ao todo e timeout curto. Nenhum proxy de ambiente.
"""
from __future__ import annotations

import ipaddress
import socket
from urllib.parse import urljoin, urlsplit

import certifi
import urllib3

from auth import ApiError

MAX_BYTES = 8 * 1024 * 1024
MAX_REDIRECTS = 2
HTTP_TIMEOUT = urllib3.Timeout(connect=4.0, read=12.0)


def _validate_url(url: str) -> tuple[str, str]:
    if not isinstance(url, str) or len(url) > 2000:
        raise ApiError(400, "Informe um endereço HTTPS de PDF válido (até 2000 caracteres).")
    try:
        parsed = urlsplit(url)
        port = parsed.port
        host = parsed.hostname
    except ValueError:
        raise ApiError(400, "Endereço do edital inválido.")
    if (parsed.scheme.lower() != "https" or not host or
            parsed.username is not None or parsed.password is not None or
            port not in (None, 443) or parsed.fragment):
        raise ApiError(400, "Somente links HTTPS públicos sem credenciais e sem portas alternativas.")
    try:
        ascii_host = host.encode("idna").decode("ascii").lower().rstrip(".")
    except (UnicodeError, ValueError):
        raise ApiError(400, "Nome de domínio inválido.")
    if (not ascii_host or ascii_host in {"localhost"} or
            ascii_host.endswith((".localhost", ".local", ".internal", ".test"))):
        raise ApiError(400, "Domínios locais ou internos não são permitidos.")
    path = parsed.path or "/"
    if parsed.query:
        path += "?" + parsed.query
    return ascii_host, path


def _public_ip_addresses(host: str) -> list[str]:
    try:
        addresses = {
            item[4][0].split("%", 1)[0]
            for item in socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM)
        }
    except (socket.gaierror, OSError):
        raise ApiError(502, "Não foi possível resolver o domínio do edital.")
    if not addresses:
        raise ApiError(502, "Nenhum endereço de rede foi encontrado.")
    # Bloqueia o domínio inteiro se a resolução contiver QUALQUER endereço privado,
    # reservado, de loopback, link-local, multicast ou não global.
    try:
        if any(not ipaddress.ip_address(address).is_global for address in addresses):
            raise ApiError(400, "Endereços de rede privados ou reservados são proibidos.")
    except ValueError:
        raise ApiError(400, "Endereço DNS não reconhecido.")
    return sorted(addresses)


def download_public_pdf(url: str) -> bytes:
    current = url.strip()
    for hop in range(MAX_REDIRECTS + 1):
        host, path = _validate_url(current)
        addresses = _public_ip_addresses(host)
        # Pin DNS: TCP conecta APENAS ao endereço já checado, TLS usa host
        # original para validar CA/SNI e Host HTTP.
        ip = addresses[0]
        pool = urllib3.HTTPSConnectionPool(
            host=ip, port=443, maxsize=1, block=True,
            server_hostname=host, assert_hostname=host,
            cert_reqs="CERT_REQUIRED", ca_certs=certifi.where(),
            timeout=HTTP_TIMEOUT,
        )
        response = None
        try:
            response = pool.request(
                "GET", path,
                headers={
                    "Host": host,
                    "User-Agent": "Estuda/2.2 (consulta pública de edital)",
                    "Accept": "application/pdf",
                    "Accept-Encoding": "identity",
                },
                preload_content=False, redirect=False, retries=False,
            )
            if response.status in (301, 302, 303, 307, 308):
                if hop >= MAX_REDIRECTS:
                    raise ApiError(400, "O edital excedeu o limite de redirecionamentos.")
                location = response.headers.get("Location", "")
                if not location:
                    raise ApiError(502, "Redirecionamento do PDF sem destino.")
                # Sempre volta ao topo para validar hostname, DNS e IP.
                current = urljoin(current, location)
                continue
            if response.status != 200:
                raise ApiError(502, f"O servidor do edital respondeu HTTP {response.status}.")
            try:
                announced = int(response.headers.get("Content-Length", "0"))
            except ValueError:
                announced = 0
            if announced > MAX_BYTES:
                raise ApiError(413, "O PDF ultrapassa 8 MiB. Envie apenas as páginas relevantes.")
            data = response.read(MAX_BYTES + 1)
            if len(data) > MAX_BYTES:
                raise ApiError(413, "O PDF ultrapassa 8 MiB. Envie apenas as páginas relevantes.")
            if not data.startswith(b"%PDF-"):
                raise ApiError(400, "O endereço não retornou um PDF válido. Use o link direto do arquivo.")
            return data
        except urllib3.exceptions.HTTPError:
            raise ApiError(502, "Falha segura ao conectar ao endereço público do edital.")
        finally:
            if response is not None:
                response.release_conn()
            pool.close()
    raise ApiError(400, "Endereço de edital não pôde ser validado.")
