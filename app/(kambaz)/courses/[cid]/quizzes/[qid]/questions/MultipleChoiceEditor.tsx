"use client";

import { useEffect, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";

export default function MultipleChoiceEditor({
  question,
  onSave,
  onCancel,
}: {
  question: any;
  onSave: (question: any) => void;
  onCancel: () => void;
}) {
  const [editedQuestion, setEditedQuestion] = useState<any>({
    _id: question?._id || "",
    title: question?.title || "",
    points: question?.points ?? 1,
    questionText: question?.questionText || "",
    choices: question?.choices || [],
    correctChoice: question?.correctChoice ?? 0,
    type: question?.type || "MULTIPLE_CHOICE",
  });

  useEffect(() => {
    setEditedQuestion({
      _id: question?._id || "",
      title: question?.title || "",
      points: question?.points ?? 1,
      questionText: question?.questionText || "",
      choices: question?.choices || [],
      correctChoice: question?.correctChoice ?? 0,
      type: question?.type || "MULTIPLE_CHOICE",
    });
  }, [question]);

  const updateChoice = (index: number, value: string) => {
    const newChoices = [...(editedQuestion.choices || [])];
    newChoices[index] = value;
    setEditedQuestion({ ...editedQuestion, choices: newChoices });
  };

  const addChoice = () => {
    setEditedQuestion({
      ...editedQuestion,
      choices: [...(editedQuestion.choices || []), ""],
    });
  };

  const removeChoice = (index: number) => {
    const newChoices = (editedQuestion.choices || []).filter(
      (_: string, i: number) => i !== index
    );

    let newCorrectChoice = editedQuestion.correctChoice ?? 0;
    if (newCorrectChoice >= newChoices.length) {
      newCorrectChoice = 0;
    }

    setEditedQuestion({
      ...editedQuestion,
      choices: newChoices,
      correctChoice: newCorrectChoice,
    });
  };

  return (
    <Form>
      <h5>Edit Multiple Choice Question</h5>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={editedQuestion.title || ""}
          onChange={(e) =>
            setEditedQuestion({ ...editedQuestion, title: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          value={editedQuestion.points ?? 1}
          onChange={(e) =>
            setEditedQuestion({
              ...editedQuestion,
              points: Number(e.target.value),
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={editedQuestion.questionText || ""}
          onChange={(e) =>
            setEditedQuestion({
              ...editedQuestion,
              questionText: e.target.value,
            })
          }
        />
      </Form.Group>

      <Card className="p-3 mb-3">
        <Form.Label>Choices</Form.Label>
        {(editedQuestion.choices || []).map((choice: string, index: number) => (
          <div
            key={`${editedQuestion._id || "new"}-choice-${index}`}
            className="d-flex align-items-center gap-2 mb-2"
          >
            <Form.Check
              type="radio"
              name={`correct-choice-${editedQuestion._id || "new"}`}
              checked={editedQuestion.correctChoice === index}
              onChange={() =>
                setEditedQuestion({ ...editedQuestion, correctChoice: index })
              }
            />
            <Form.Control
              type="text"
              value={choice || ""}
              onChange={(e) => updateChoice(index, e.target.value)}
            />
            <Button
              type="button"
              variant="outline-danger"
              size="sm"
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

      <div className="d-flex justify-content-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={() => onSave(editedQuestion)}
        >
          Save Question
        </Button>
      </div>
    </Form>
  );
}