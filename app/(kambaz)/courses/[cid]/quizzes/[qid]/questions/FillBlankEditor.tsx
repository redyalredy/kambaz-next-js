"use client";

import { useEffect, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";

export default function FillBlankEditor({
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
    blankAnswers: question?.blankAnswers || [],
    type: question?.type || "FILL_IN_BLANK",
  });

  useEffect(() => {
    setEditedQuestion({
      _id: question?._id || "",
      title: question?.title || "",
      points: question?.points ?? 1,
      questionText: question?.questionText || "",
      blankAnswers: question?.blankAnswers || [],
      type: question?.type || "FILL_IN_BLANK",
    });
  }, [question]);

  const updateBlankAnswer = (index: number, value: string) => {
    const newAnswers = [...(editedQuestion.blankAnswers || [])];
    newAnswers[index] = value;
    setEditedQuestion({ ...editedQuestion, blankAnswers: newAnswers });
  };

  const addBlankAnswer = () => {
    setEditedQuestion({
      ...editedQuestion,
      blankAnswers: [...(editedQuestion.blankAnswers || []), ""],
    });
  };

  const removeBlankAnswer = (index: number) => {
    const newAnswers = (editedQuestion.blankAnswers || []).filter(
      (_: string, i: number) => i !== index
    );
    setEditedQuestion({ ...editedQuestion, blankAnswers: newAnswers });
  };

  return (
    <Form>
      <h5>Edit Fill in the Blank Question</h5>

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
        <Form.Label>Accepted Answers</Form.Label>
        {(editedQuestion.blankAnswers || []).map(
          (answer: string, index: number) => (
            <div
              key={`${editedQuestion._id || "new"}-blank-${index}`}
              className="d-flex align-items-center gap-2 mb-2"
            >
              <Form.Control
                type="text"
                value={answer || ""}
                onChange={(e) => updateBlankAnswer(index, e.target.value)}
              />
              <Button
                type="button"
                variant="outline-danger"
                size="sm"
                onClick={() => removeBlankAnswer(index)}
              >
                Remove
              </Button>
            </div>
          )
        )}

        <Button type="button" variant="outline-secondary" onClick={addBlankAnswer}>
          + Add Answer
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