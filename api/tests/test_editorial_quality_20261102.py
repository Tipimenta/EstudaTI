"""Verificações de qualidade do curso que não dependem de rede nem de banco vivo."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COURSE_FILES = [
    "rewrittenInfrastructure.ts",
    "rewrittenFoundations.ts",
    "rewrittenPractice.ts",
    "rewrittenOps.ts",
    "rewrittenPlanning.ts",
    "rewrittenIntegration.ts",
]
QUESTION_FILES = [
    "aulas_editoriais_questoes_20261102_01.json",
    "aulas_editoriais_questoes_20261102_02.json",
]
EDITED_IDS = {21, 23, 30, 33, 37, 38, 44, 46, 53, 55, 62, 63, 71, 72, 77, 80, 85, 86}


def lessons():
    data = {}
    for name in COURSE_FILES:
        code = (ROOT / "web" / "src" / "academy" / name).read_text(encoding="utf-8")
        payload = code.split("=\n", 1)[-1] if "=\n" in code else code.split("=", 1)[-1]
        records = json.loads(payload.strip().rstrip(";"))
        for key, lesson in records.items():
            identifier = int(key)
            assert identifier not in data, f"Aula {identifier} cadastrada duas vezes"
            data[identifier] = lesson
    return data


class EditorialQuality(unittest.TestCase):
    def test_only_18_intentionally_rewritten_lessons(self):
        self.assertEqual(set(lessons()), EDITED_IDS)

    def test_lessons_are_continuous_and_substantive(self):
        for id, lesson in lessons().items():
            with self.subTest(topic_id=id):
                self.assertGreater(len(lesson["goal"]), 75)
                self.assertGreaterEqual(len(lesson["steps"]), 4)
                self.assertGreaterEqual(sum(len(s["body"]) for s in lesson["steps"]), 2200)
                self.assertGreaterEqual(len(lesson["worked"]["body"]), 470)
                self.assertGreaterEqual(len(lesson["pitfalls"]), 4)
                self.assertGreaterEqual(len(lesson["review"]), 4)
                self.assertEqual(len({x["title"] for x in lesson["steps"]}), len(lesson["steps"]))
                self.assertEqual(len({x["ask"] for x in lesson["review"]}), len(lesson["review"]))

    def test_study_questions_have_answer_and_all_distractors_explained(self):
        questions = []
        for file in QUESTION_FILES:
            path = ROOT / "api" / "enrichment" / file
            questions.extend(json.loads(path.read_text(encoding="utf-8")))
        self.assertEqual(len(questions), 36)
        self.assertEqual({q["topic_id"] for q in questions}, EDITED_IDS)
        self.assertEqual(len({q["fingerprint"] for q in questions}), 36)
        self.assertEqual(len({q["question"] for q in questions}), 36)
        topic_counts = {id: 0 for id in EDITED_IDS}
        for q in questions:
            topic_counts[q["topic_id"]] += 1
            with self.subTest(question=q["fingerprint"]):
                self.assertEqual(len(q["choices"]), 4)
                self.assertEqual(set(q["choice_rationales"]), set("ABCD"))
                self.assertTrue(0 <= q["correct_index"] < 4)
                self.assertGreater(len(q["explanation"]), 45)
                self.assertTrue(all(len(x) > 30 for x in q["choice_rationales"].values()))
        self.assertEqual(set(topic_counts.values()), {2})


if __name__ == "__main__":
    unittest.main()
