"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../../../client";

export default function TakeQuizPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const isStudent = currentUser?.role === "STUDENT";

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [error, setError] = useState("");

  const loadData = async () => {
    if (!quizId || !currentUser?._id) return;

    const quizData = await client.findQuizById(quizId as string);
    const questionData = await client.findQuestionsForQuiz(quizId as string);
    const last = await client.findLastAttemptForQuiz(
      quizId as string,
      currentUser._id
    );

    setQuiz(quizData);
    setQuestions(questionData);
    setLastAttempt(last);
  };

  useEffect(() => {
    loadData();
  }, [quizId, currentUser?._id]);

  const attemptsUsed = useMemo(() => {
    return lastAttempt?.attemptNumber || 0;
  }, [lastAttempt]);

  const attemptsRemaining = useMemo(() => {
    if (!quiz) return 0;

    if (!quiz.multipleAttempts) {
      return attemptsUsed >= 1 ? 0 : 1;
    }

    return Math.max((quiz.howManyAttempts || 1) - attemptsUsed, 0);
  }, [quiz, attemptsUsed]);

  const availabilityMessage = useMemo(() => {
    if (!quiz || !isStudent) return "";

    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!quiz.published) {
      return "This quiz is not published yet.";
    }

    if (availableDate && now < availableDate) {
      return `This quiz is not available until ${quiz.availableDate}.`;
    }

    if (untilDate && now > untilDate) {
      return `This quiz closed on ${quiz.untilDate}.`;
    }

    return "";
  }, [quiz, isStudent]);

  const isAvailable = useMemo(() => {
    if (!quiz) return false;

    if (!isStudent) return true;

    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!quiz.published) return false;
    if (availableDate && now < availableDate) return false;
    if (untilDate && now > untilDate) return false;

    return true;
  }, [quiz, isStudent]);

  const updateAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!quizId || !currentUser?._id) return;

    try {
      setError("");

      const payload = questions.map((question) => ({
        question: question._id,
        answer: answers[question._id],
      }));

      await client.submitAttempt(quizId as string, currentUser._id, payload);

      router.push(`/courses/${courseId}/quizzes/${quizId}/results`);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Could not submit quiz.");
    }
  };

  if (!quiz) return <div className="p-4">Loading...</div>;

  if (!isStudent) {
    return (
      <div className="p-4">
        <Alert variant="warning">
          This page is for students. Admin, faculty, and TAs should use Preview instead.
        </Alert>
        <Button
          variant="primary"
          onClick={() =>
            router.push(`/courses/${courseId}/quizzes/${quizId}/preview`)
          }
        >
          Go to Preview
        </Button>
      </div>
    );
  }

  if (!isAvailable) {
    return (
      <div className="p-4">
        <Alert variant="warning">
          {availabilityMessage || "This quiz is not currently available."}
        </Alert>
      </div>
    );
  }

  if (attemptsRemaining <= 0) {
    return (
      <div className="p-4">
        <Alert variant="warning">
          You have no attempts remaining for this quiz.
        </Alert>
        <Button
          variant="primary"
          onClick={() =>
            router.push(`/courses/${courseId}/quizzes/${quizId}/results`)
          }
        >
          View Last Results
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      <p className="text-muted">
        Points: {quiz.points || 0} | Attempts Remaining: {attemptsRemaining}
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      {questions.map((question: any, index: number) => (
        <Card key={question._id} className="p-3 mb-4">
          <h5>
            Question {index + 1}: {question.title}
          </h5>
          <div className="text-muted mb-2">{question.points} pts</div>
          <div className="mb-3">{question.questionText}</div>

          {question.type === "MULTIPLE_CHOICE" && (
            <div>
              {(question.choices || []).map(
                (choice: string, choiceIndex: number) => (
                  <Form.Check
                    key={choiceIndex}
                    type="radio"
                    name={`question-${question._id}`}
                    label={choice}
                    checked={answers[question._id] === choiceIndex}
                    onChange={() => updateAnswer(question._id, choiceIndex)}
                  />
                )
              )}
            </div>
          )}

          {question.type === "TRUE_FALSE" && (
            <div>
              <Form.Check
                type="radio"
                name={`question-${question._id}`}
                label="True"
                checked={answers[question._id] === true}
                onChange={() => updateAnswer(question._id, true)}
              />
              <Form.Check
                type="radio"
                name={`question-${question._id}`}
                label="False"
                checked={answers[question._id] === false}
                onChange={() => updateAnswer(question._id, false)}
              />
            </div>
          )}

          {question.type === "FILL_IN_BLANK" && (
            <Form.Control
              type="text"
              value={answers[question._id] || ""}
              onChange={(e) => updateAnswer(question._id, e.target.value)}
              placeholder="Type your answer"
            />
          )}
        </Card>
      ))}

      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${courseId}/quizzes/${quizId}`)}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}