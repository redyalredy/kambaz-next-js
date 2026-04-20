"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const isStudent = currentUser?.role === "STUDENT";
  const canEdit = !isStudent;

  const [quiz, setQuiz] = useState<any>(null);

  const loadQuiz = async () => {
    if (!quizId) return;
    const data = await client.findQuizById(quizId);
    setQuiz(data);
  };

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      <hr />

      <p><strong>Description:</strong> {quiz.description || "No description"}</p>
      <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
      <p><strong>Points:</strong> {quiz.points || 0}</p>
      <p><strong>Assignment Group:</strong> {quiz.assignmentGroup}</p>
      <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>
      <p><strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? "Yes" : "No"}</p>
      <p><strong>How Many Attempts:</strong> {quiz.howManyAttempts}</p>
      <p><strong>Access Code:</strong> {quiz.accessCode || "None"}</p>

      <Card className="p-3 mt-3">
        <p><strong>Due:</strong> {quiz.dueDate || "None"}</p>
        <p><strong>Available From:</strong> {quiz.availableDate || "None"}</p>
        <p><strong>Until:</strong> {quiz.untilDate || "None"}</p>
      </Card>

      <div className="d-flex justify-content-end gap-2 mt-4">
        {canEdit ? (
          <>
            <Button
              variant="secondary"
              onClick={() => router.push(`/courses/${courseId}/quizzes/${quizId}/preview`)}
            >
              Preview
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push(`/courses/${courseId}/quizzes/${quizId}/edit`)}
            >
              Edit
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={() => router.push(`/courses/${courseId}/quizzes/${quizId}/take`)}
          >
            Start Quiz
          </Button>
        )}
      </div>
    </div>
  );
}