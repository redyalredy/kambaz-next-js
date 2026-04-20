"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Button, Card, Nav } from "react-bootstrap";
import * as client from "../../../../../client";

export default function QuestionEditorPage() {
  const { cid, qid, questionId } = useParams();
  const router = useRouter();

  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;
  const qstId = Array.isArray(questionId) ? questionId[0] : questionId;

  const [loaded, setLoaded] = useState(false);
  const [originalQuestion, setOriginalQuestion] = useState<any>(null);
  const [question, setQuestion] = useState<any>({
    _id: "",
    title: "",
    type: "MULTIPLE_CHOICE",
    points: 1,
    questionText: "",
    choices: ["Option 1", "Option 2"],
    correctChoice: 0,
    trueFalseAnswer: true,
    blankAnswers: [],
  });

  const loadQuestion = async () => {
    if (!qstId) return;

    const found = await client.findQuestionById(qstId as string);

    if (found) {
      const normalized = {
        ...found,
        _id: found._id || qstId,
        choices: found.choices || ["Option 1", "Option 2"],
        blankAnswers: found.blankAnswers || [],
      };
      setOriginalQuestion(normalized);
      setQuestion(normalized);
    }

    setLoaded(true);
  };

  useEffect(() => {
    loadQuestion();
  }, [qstId]);

  const handleSave = async () => {
    if (!quizId || !qstId) return;

    await client.updateQuestion(quizId as string, qstId as string, {
      ...question,
      _id: qstId,
    });

    router.push(`/courses/${courseId}/quizzes/${quizId}/questions`);
  };

  const handleCancel = () => {
    if (originalQuestion) {
      setQuestion(originalQuestion);
    }
    router.push(`/courses/${courseId}/quizzes/${quizId}/questions`);
  };

  const updateChoice = (index: number, value: string) => {
    const newChoices = [...(question.choices || [])];
    newChoices[index] = value;
    setQuestion({ ...question, choices: newChoices });
  };

  const addChoice = () => {
    setQuestion({
      ...question,
      choices: [...(question.choices || []), ""],
    });
  };

  const removeChoice = (index: number) => {
    const newChoices = (question.choices || []).filter(
      (_: string, i: number) => i !== index
    );
    setQuestion({
      ...question,
      choices: newChoices,
      correctChoice:
        question.correctChoice >= newChoices.length ? 0 : question.correctChoice,
    });
  };

  const updateBlank = (index: number, value: string) => {
    const newAnswers = [...(question.blankAnswers || [])];
    newAnswers[index] = value;
    setQuestion({ ...question, blankAnswers: newAnswers });
  };

  const addBlank = () => {
    setQuestion({
      ...question,
      blankAnswers: [...(question.blankAnswers || []), ""],
    });
  };

  const removeBlank = (index: number) => {
    const newAnswers = (question.blankAnswers || []).filter(
      (_: string, i: number) => i !== index
    );
    setQuestion({ ...question, blankAnswers: newAnswers });
  };

  if (!loaded) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2>Edit Quiz</h2>

      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              router.push(`/courses/${courseId}/quizzes/${quizId}/edit`)
            }
            style={{ cursor: "pointer" }}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active>Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      <Form>
        <h4 className="mb-3">Edit Question</h4>
        <hr />

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={question.title || ""}
            onChange={(e) => setQuestion({ ...question, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select
            value={question.type || "MULTIPLE_CHOICE"}
            onChange={(e) =>
              setQuestion({
                ...question,
                type: e.target.value,
                choices:
                  e.target.value === "MULTIPLE_CHOICE"
                    ? question.choices?.length
                      ? question.choices
                      : ["Option 1", "Option 2"]
                    : [],
                correctChoice: 0,
                blankAnswers:
                  e.target.value === "FILL_IN_BLANK"
                    ? question.blankAnswers?.length
                      ? question.blankAnswers
                      : [""]
                    : [],
              })
            }
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_IN_BLANK">Fill in the Blank</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={question.points ?? 1}
            onChange={(e) =>
              setQuestion({ ...question, points: Number(e.target.value) })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={question.questionText || ""}
            onChange={(e) =>
              setQuestion({ ...question, questionText: e.target.value })
            }
          />
        </Form.Group>

        {question.type === "MULTIPLE_CHOICE" && (
          <Card className="p-3 mb-3">
            <Form.Label>Choices</Form.Label>
            {(question.choices || []).map((choice: string, index: number) => (
              <div key={`choice-${index}`} className="d-flex gap-2 mb-2">
                <Form.Check
                  type="radio"
                  name="correct-choice"
                  checked={question.correctChoice === index}
                  onChange={() =>
                    setQuestion({ ...question, correctChoice: index })
                  }
                />
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={choice || ""}
                  onChange={(e) => updateChoice(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={() => removeChoice(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline-secondary" onClick={addChoice}>
              + Add Choice
            </Button>
          </Card>
        )}

        {question.type === "TRUE_FALSE" && (
          <Card className="p-3 mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="True"
                name="tf-answer"
                checked={question.trueFalseAnswer === true}
                onChange={() =>
                  setQuestion({ ...question, trueFalseAnswer: true })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="False"
                name="tf-answer"
                checked={question.trueFalseAnswer === false}
                onChange={() =>
                  setQuestion({ ...question, trueFalseAnswer: false })
                }
              />
            </div>
          </Card>
        )}

        {question.type === "FILL_IN_BLANK" && (
          <Card className="p-3 mb-3">
            <Form.Label>Accepted Answers</Form.Label>
            {(question.blankAnswers || []).map((answer: string, index: number) => (
              <div key={`blank-${index}`} className="d-flex gap-2 mb-2">
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={answer || ""}
                  onChange={(e) => updateBlank(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={() => removeBlank(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline-secondary" onClick={addBlank}>
              + Add Answer
            </Button>
          </Card>
        )}

        <div className="d-flex justify-content-end gap-2">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={handleSave}>
            Save Question
          </Button>
        </div>
      </Form>
    </div>
  );
}