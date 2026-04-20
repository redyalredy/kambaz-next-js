"use client";

import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function TrueFalseEditor({
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
    trueFalseAnswer: question?.trueFalseAnswer ?? true,
    type: question?.type || "TRUE_FALSE",
  });

  useEffect(() => {
    setEditedQuestion({
      _id: question?._id || "",
      title: question?.title || "",
      points: question?.points ?? 1,
      questionText: question?.questionText || "",
      trueFalseAnswer: question?.trueFalseAnswer ?? true,
      type: question?.type || "TRUE_FALSE",
    });
  }, [question]);

  return (
    <Form>
      <h5>Edit True/False Question</h5>

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

      <Form.Group className="mb-3">
        <Form.Label>Correct Answer</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            label="True"
            name={`true-false-${editedQuestion._id || "new"}`}
            checked={editedQuestion.trueFalseAnswer === true}
            onChange={() =>
              setEditedQuestion({ ...editedQuestion, trueFalseAnswer: true })
            }
          />
          <Form.Check
            inline
            type="radio"
            label="False"
            name={`true-false-${editedQuestion._id || "new"}`}
            checked={editedQuestion.trueFalseAnswer === false}
            onChange={() =>
              setEditedQuestion({ ...editedQuestion, trueFalseAnswer: false })
            }
          />
        </div>
      </Form.Group>

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