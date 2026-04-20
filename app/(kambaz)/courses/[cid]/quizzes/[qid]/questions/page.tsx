"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import * as client from "../../../../client";

export default function QuizQuestionsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;

  const [questions, setQuestions] = useState<any[]>([]);

  const loadQuestions = async () => {
    if (!quizId) return;
    const data = await client.findQuestionsForQuiz(quizId as string);
    setQuestions((data || []).filter(Boolean));
  };

  useEffect(() => {
    loadQuestions();
  }, [quizId]);

  const handleNewQuestion = async () => {
    if (!quizId) return;

    const newQuestion = await client.createQuestionForQuiz(quizId as string, {
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      questionText: "",
      choices: ["Option 1", "Option 2"],
      correctChoice: 0,
      trueFalseAnswer: true,
      blankAnswers: [],
    });

    if (newQuestion?._id) {
      router.push(
        `/courses/${courseId}/quizzes/${quizId}/questions/${newQuestion._id}`
      );
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!quizId) return;
    await client.deleteQuestion(quizId as string, questionId);
    await loadQuestions();
  };

  const totalPoints = questions.reduce(
    (sum: number, q: any) => sum + (q.points || 0),
    0
  );

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

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-muted">Total Points: {totalPoints}</div>
        <Button variant="danger" onClick={handleNewQuestion}>
          + New Question
        </Button>
      </div>

      {questions.length === 0 && (
        <Card className="p-4 text-center">
          <p>No questions yet. Click + New Question to add one.</p>
        </Card>
      )}

      <ListGroup className="rounded-0">
        {questions.map((question: any, index: number) => (
          <ListGroupItem
            key={question?._id || `question-${index}`}
            className="mb-3 p-3"
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="mb-1">{question.title || "Untitled Question"}</h5>
                <div className="text-muted small mb-2">
                  {question.type} | {question.points || 0} pts
                </div>
              </div>

              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() =>
                    router.push(
                      `/courses/${courseId}/quizzes/${quizId}/questions/${question._id}`
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDeleteQuestion(question._id)}
                >
                  Delete
                </Button>
              </div>
            </div>

            <div className="mt-2">
              <strong>Question:</strong> {question.questionText || "No question text"}
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}