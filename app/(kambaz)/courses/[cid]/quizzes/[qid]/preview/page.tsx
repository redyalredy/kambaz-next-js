"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../../../client";

export default function QuizPreviewPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const canPreview = currentUser && currentUser.role !== "STUDENT";

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const loadData = async () => {
    if (!quizId) return;
    const quizData = await client.findQuizById(quizId as string);
    const questionData = await client.findQuestionsForQuiz(quizId as string);
    setQuiz(quizData);
    setQuestions((questionData || []).filter(Boolean));
  };

  useEffect(() => {
    loadData();
  }, [quizId]);

  const updateAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const gradedResults = useMemo(() => {
    let total = 0;

    const results = questions.map((question: any) => {
      const submittedAnswer = answers[question._id];
      let isCorrect = false;

      if (question.type === "MULTIPLE_CHOICE") {
        isCorrect = Number(submittedAnswer) === question.correctChoice;
      } else if (question.type === "TRUE_FALSE") {
        isCorrect = submittedAnswer === question.trueFalseAnswer;
      } else if (question.type === "FILL_IN_BLANK") {
        const normalized = String(submittedAnswer || "").trim().toLowerCase();
        isCorrect = (question.blankAnswers || []).some(
          (a: string) => String(a).trim().toLowerCase() === normalized
        );
      }

      if (isCorrect) total += question.points || 0;

      return {
        questionId: question._id,
        isCorrect,
      };
    });

    return { results, total };
  }, [answers, questions]);

  const handleSubmitPreview = () => {
    setScore(gradedResults.total);
    setSubmitted(true);
  };

  if (!quiz) return <div className="p-4">Loading...</div>;

  if (!canPreview) {
    return (
      <div className="p-4">
        <Alert variant="warning">
          Students cannot access preview mode.
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2>{quiz.title} - Preview</h2>
      <p className="text-muted">This preview does not save to the database.</p>

      {submitted && (
        <Alert variant="info">
          Preview Score: {score} / {quiz.points || 0}
        </Alert>
      )}

      {(questions || []).filter(Boolean).map((question: any, index: number) => {
        const result = gradedResults.results.find(
          (r) => r.questionId === question._id
        );

        return (
          <Card
            key={question?._id || `preview-question-${index}`}
            className="p-3 mb-4"
          >
            <h5>
              Question {index + 1}: {question.title || "Untitled Question"}
            </h5>
            <div className="text-muted mb-2">{question.points || 0} pts</div>
            <div className="mb-3">{question.questionText || ""}</div>

            {question.type === "MULTIPLE_CHOICE" && (
              <div>
                {(question.choices || []).map(
                  (choice: string, choiceIndex: number) => (
                    <Form.Check
                      key={`${question?._id || index}-choice-${choiceIndex}`}
                      type="radio"
                      name={`question-${question?._id || index}`}
                      label={choice}
                      checked={answers[question._id] === choiceIndex}
                      onChange={() =>
                        updateAnswer(question._id, choiceIndex)
                      }
                      disabled={submitted}
                    />
                  )
                )}
              </div>
            )}

            {question.type === "TRUE_FALSE" && (
              <div>
                <Form.Check
                  type="radio"
                  name={`question-${question?._id || index}`}
                  label="True"
                  checked={answers[question._id] === true}
                  onChange={() => updateAnswer(question._id, true)}
                  disabled={submitted}
                />
                <Form.Check
                  type="radio"
                  name={`question-${question?._id || index}`}
                  label="False"
                  checked={answers[question._id] === false}
                  onChange={() => updateAnswer(question._id, false)}
                  disabled={submitted}
                />
              </div>
            )}

            {question.type === "FILL_IN_BLANK" && (
              <Form.Control
                type="text"
                value={answers[question._id] || ""}
                onChange={(e) =>
                  updateAnswer(question._id, e.target.value)
                }
                disabled={submitted}
              />
            )}

            {submitted && (
              <div
                className={`mt-3 ${
                  result?.isCorrect ? "text-success" : "text-danger"
                }`}
              >
                {result?.isCorrect ? "✅ Correct" : "❌ Incorrect"}
              </div>
            )}
          </Card>
        );
      })}

      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="secondary"
          onClick={() =>
            router.push(`/courses/${courseId}/quizzes/${quizId}/questions`)
          }
        >
          Edit Quiz
        </Button>

        {!submitted ? (
          <Button variant="primary" onClick={handleSubmitPreview}>
            Submit Preview
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => {
              setSubmitted(false);
              setScore(0);
              setAnswers({});
            }}
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}