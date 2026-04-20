"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../../../client";

export default function QuizResultsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [lastAttempt, setLastAttempt] = useState<any>(null);

  const loadData = async () => {
    if (!quizId || !currentUser?._id) return;

    const quizData = await client.findQuizById(quizId as string);
    const questionData = await client.findQuestionsForQuiz(quizId as string);
    const attempt = await client.findLastAttemptForQuiz(
      quizId as string,
      currentUser._id
    );

    setQuiz(quizData);
    setQuestions(questionData);
    setLastAttempt(attempt);
  };

  useEffect(() => {
    loadData();
  }, [quizId, currentUser?._id]);

  const getSubmittedAnswer = (questionId: string) => {
    return lastAttempt?.answers?.find((a: any) => a.question === questionId);
  };

  const renderCorrectAnswer = (question: any) => {
    if (question.type === "MULTIPLE_CHOICE") {
      return question.choices?.[question.correctChoice] || "";
    }
    if (question.type === "TRUE_FALSE") {
      return question.trueFalseAnswer ? "True" : "False";
    }
    if (question.type === "FILL_IN_BLANK") {
      return (question.blankAnswers || []).join(", ");
    }
    return "";
  };

  const renderStudentAnswer = (question: any, submitted: any) => {
    if (!submitted) return "No answer";

    if (question.type === "MULTIPLE_CHOICE") {
      return question.choices?.[submitted.answer] || "No answer";
    }
    if (question.type === "TRUE_FALSE") {
      return submitted.answer === true ? "True" : "False";
    }
    if (question.type === "FILL_IN_BLANK") {
      return submitted.answer || "No answer";
    }
    return "No answer";
  };

  if (!quiz) return <div className="p-4">Loading...</div>;

  if (!lastAttempt) {
    return (
      <div className="p-4">
        <Alert variant="warning">No attempt found for this quiz yet.</Alert>
        <Button
          variant="primary"
          onClick={() => router.push(`/courses/${courseId}/quizzes/${quizId}/take`)}
        >
          Take Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2>{quiz.title} - Results</h2>

      <Card className="p-3 mb-4">
        <h4>Score: {lastAttempt.score} / {quiz.points || 0}</h4>
        <div className="text-muted">
          Attempt #{lastAttempt.attemptNumber}
        </div>
        <div className="text-muted">
          Submitted: {lastAttempt.submittedAt}
        </div>
      </Card>

      {questions.map((question: any, index: number) => {
        const submitted = getSubmittedAnswer(question._id);
        const isCorrect = submitted?.isCorrect;

        return (
          <Card key={question._id} className="p-3 mb-4">
            <h5>
              Question {index + 1}: {question.title}
            </h5>
            <div className="mb-2">{question.questionText}</div>
            <div className="mb-2">
              <strong>Your Answer:</strong> {renderStudentAnswer(question, submitted)}
            </div>
            <div className="mb-2">
              <strong>Correct Answer:</strong> {renderCorrectAnswer(question)}
            </div>
            <div className={isCorrect ? "text-success fw-bold" : "text-danger fw-bold"}>
              {isCorrect ? "✅ Correct" : "❌ Incorrect"}
            </div>
          </Card>
        );
      })}

      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${courseId}/quizzes`)}
        >
          Back to Quizzes
        </Button>
      </div>
    </div>
  );
}