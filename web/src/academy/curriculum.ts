export type CourseModule={title:string;topicIds:number[];order:number};
export const curriculum:Record<string,CourseModule[]>={
  "RED": [
    {
      "title": "Como funciona uma rede",
      "topicIds": [
        1,
        91
      ],
      "order": 1
    },
    {
      "title": "IP, sub-redes e roteamento",
      "topicIds": [
        2,
        19,
        92,
        24,
        25,
        153
      ],
      "order": 2
    },
    {
      "title": "Redes locais, MAC e VLAN",
      "topicIds": [
        3,
        20,
        118,
        120
      ],
      "order": 3
    },
    {
      "title": "TCP, UDP e serviços web",
      "topicIds": [
        21,
        119,
        26
      ],
      "order": 4
    },
    {
      "title": "DNS, DHCP e diagnóstico",
      "topicIds": [
        22,
        23,
        93,
        121,
        152
      ],
      "order": 5
    }
  ],
  "SEG": [
    {
      "title": "Princípios e gestão do risco",
      "topicIds": [
        4,
        27,
        94,
        33,
        122
      ],
      "order": 1
    },
    {
      "title": "Identidade, acesso e confiança",
      "topicIds": [
        28,
        124,
        155
      ],
      "order": 2
    },
    {
      "title": "Criptografia e aplicações",
      "topicIds": [
        5,
        29,
        30,
        95,
        34
      ],
      "order": 3
    },
    {
      "title": "Incidentes e continuidade",
      "topicIds": [
        31,
        32,
        96,
        123,
        154
      ],
      "order": 4
    }
  ],
  "SO": [
    {
      "title": "Processos, Linux e permissões",
      "topicIds": [
        6,
        35,
        36,
        37,
        98,
        126,
        157
      ],
      "order": 1
    },
    {
      "title": "Windows Server e Active Directory",
      "topicIds": [
        38,
        97,
        125,
        156
      ],
      "order": 2
    },
    {
      "title": "Virtualização, contêineres e armazenamento",
      "topicIds": [
        7,
        39,
        40,
        41,
        42,
        99,
        127,
        128
      ],
      "order": 3
    }
  ],
  "POR": [
    {
      "title": "Leitura, inferência e sentido",
      "topicIds": [
        8,
        43,
        100,
        49,
        158
      ],
      "order": 1
    },
    {
      "title": "Concordância, regência e pontuação",
      "topicIds": [
        9,
        44,
        129,
        45,
        130,
        46,
        132
      ],
      "order": 2
    },
    {
      "title": "Coesão, sintaxe e reescrita",
      "topicIds": [
        47,
        50,
        48,
        101,
        102,
        131,
        159
      ],
      "order": 3
    }
  ],
  "GOV": [
    {
      "title": "ITIL e serviços de TI",
      "topicIds": [
        10,
        51,
        52,
        103,
        133
      ],
      "order": 1
    },
    {
      "title": "Governança, COBIT e planejamento",
      "topicIds": [
        11,
        53,
        55,
        104,
        134,
        135,
        161
      ],
      "order": 2
    },
    {
      "title": "Metas e indicadores de serviço",
      "topicIds": [
        54,
        136,
        160
      ],
      "order": 3
    },
    {
      "title": "Métodos ágeis e contratos",
      "topicIds": [
        56,
        105,
        57,
        58
      ],
      "order": 4
    }
  ],
  "BD": [
    {
      "title": "Modelagem e normalização",
      "topicIds": [
        13,
        63,
        106,
        139
      ],
      "order": 1
    },
    {
      "title": "SQL, junções e agregações",
      "topicIds": [
        12,
        59,
        60,
        61,
        107,
        140,
        162
      ],
      "order": 2
    },
    {
      "title": "Transações e concorrência",
      "topicIds": [
        62,
        108,
        137,
        163
      ],
      "order": 3
    },
    {
      "title": "Desempenho, segurança e recuperação",
      "topicIds": [
        64,
        65,
        66,
        138
      ],
      "order": 4
    }
  ],
  "ENG": [
    {
      "title": "Requisitos, modelagem e aceite",
      "topicIds": [
        14,
        67,
        68,
        109,
        164
      ],
      "order": 1
    },
    {
      "title": "HTTP e integração de APIs",
      "topicIds": [
        15,
        71,
        72,
        110,
        142,
        165
      ],
      "order": 2
    },
    {
      "title": "Testes, Git e entrega contínua",
      "topicIds": [
        69,
        70,
        73,
        111,
        141,
        143,
        74
      ],
      "order": 3
    }
  ],
  "LOG": [
    {
      "title": "Proposições e equivalências",
      "topicIds": [
        16,
        75,
        76,
        77,
        112,
        144,
        145
      ],
      "order": 1
    },
    {
      "title": "Conjuntos e contagem",
      "topicIds": [
        80,
        79,
        147,
        166
      ],
      "order": 2
    },
    {
      "title": "Probabilidade e eventos",
      "topicIds": [
        78,
        113,
        146,
        167
      ],
      "order": 3
    },
    {
      "title": "Sequências e proporcionalidade",
      "topicIds": [
        81,
        82,
        114
      ],
      "order": 4
    }
  ],
  "LEG": [
    {
      "title": "LGPD e proteção de dados",
      "topicIds": [
        17,
        83,
        84,
        85,
        115,
        148,
        149,
        168
      ],
      "order": 1
    },
    {
      "title": "Contratações públicas de TI",
      "topicIds": [
        18,
        86,
        87,
        116,
        150,
        169
      ],
      "order": 2
    },
    {
      "title": "Transparência e Governo Digital",
      "topicIds": [
        88,
        89,
        90,
        117,
        151
      ],
      "order": 3
    }
  ]
};
export function positionInCourse(code:string,topicId:number){let index=0;for(const group of curriculum[code]||[]){for(const id of group.topicIds){if(id===topicId)return index;index++}}return 1000+topicId}
export function moduleForTopic(code:string,topicId:number){return (curriculum[code]||[]).find(g=>g.topicIds.includes(topicId))}
