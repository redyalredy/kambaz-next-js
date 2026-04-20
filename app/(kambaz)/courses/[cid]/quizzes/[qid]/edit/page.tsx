"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  Row,
  Col,
  Card,
  FormSelect,
  FormCheck,
  Button,
  Nav,
} from "react-bootstrap";
import * as client from "../../../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;

  const [quiz, setQuiz] = useState<any>(null);

  const loadQuiz = async () => {
    if (!quizId) return;
    const data = await client.findQuizById(quizId as string);

    setQuiz({
      _id: data?._id || "",
      title: data?.title || "",
      description: data?.description || "",
      quizType: data?.quizType || "Graded Quiz",
      assignmentGroup: data?.assignmentGroup || "Quizzes",
      shuffleAnswers: data?.shuffleAnswers ?? true,
      timeLimit: data?.timeLimit ?? 20,
      multipleAttempts: data?.multipleAttempts ?? false,
      howManyAttempts: data?.howManyAttempts ?? 1,
      oneQuestionAtATime: data?.oneQuestionAtATime ?? true,
      webcamRequired: data?.webcamRequired ?? false,
      lockQuestionsAfterAnswering: data?.lockQuestionsAfterAnswering ?? false,
      dueDate: data?.dueDate || "",
      availableDate: data?.availableDate || "",
      untilDate: data?.untilDate || "",
      published: data?.published ?? false,
    });
  };

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setQuiz((prev: any) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "timeLimit" || name === "howManyAttempts"
          ? Number(value)
          : value,
    }));
  };

  const handleSave = async () => {
    await client.updateQuiz(courseId as string, quiz);
    router.push(`/courses/${courseId}/quizzes/${quizId}`);
  };

  const handleSaveAndPublish = async () => {
    if (!quiz || !courseId || !quizId) return;

    const updatedQuiz = {
      ...quiz,
      published: true,
    };

    await client.updateQuiz(courseId as string, updatedQuiz);
    router.push(`/courses/${courseId}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${courseId}/quizzes`);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2>Edit Quiz</h2>

      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link active>Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              router.push(`/courses/${courseId}/quizzes/${quizId}/questions`)
            }
            style={{ cursor: "pointer" }}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={quiz.title || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={quiz.description || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end">
            Quiz Type
          </Col>
          <Col sm={9}>
            <FormSelect
              name="quizType"
              value={quiz.quizType || "Graded Quiz"}
              onChange={handleChange}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end">
            Assignment Group
          </Col>
          <Col sm={9}>
            <FormSelect
              name="assignmentGroup"
              value={quiz.assignmentGroup || "Quizzes"}
              onChange={handleChange}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end">
            Time Limit
          </Col>
          <Col sm={9}>
            <Form.Control
              type="number"
              name="timeLimit"
              value={quiz.timeLimit ?? 20}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-end">
            Options
          </Col>
          <Col sm={9}>
            <Card className="p-3">
              <FormCheck
                type="checkbox"
                name="multipleAttempts"
                label="Multiple Attempts"
                checked={quiz.multipleAttempts ?? false}
                onChange={handleChange}
              />
              <FormCheck
                type="checkbox"
                name="shuffleAnswers"
                label="Shuffle Answers"
                checked={quiz.shuffleAnswers ?? true}
                onChange={handleChange}
              />
              <FormCheck
                type="checkbox"
                name="oneQuestionAtATime"
                label="One Question at a Time"
                checked={quiz.oneQuestionAtATime ?? true}
                onChange={handleChange}
              />
              <FormCheck
                type="checkbox"
                name="webcamRequired"
                label="Webcam Required"
                checked={quiz.webcamRequired ?? false}
                onChange={handleChange}
              />
              <FormCheck
                type="checkbox"
                name="lockQuestionsAfterAnswering"
                label="Lock Questions After Answering"
                checked={quiz.lockQuestionsAfterAnswering ?? false}
                onChange={handleChange}
              />
            </Card>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end">
            How Many Attempts
          </Col>
          <Col sm={9}>
            <Form.Control
              type="number"
              name="howManyAttempts"
              value={quiz.howManyAttempts ?? 1}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-end">
            Dates
          </Col>
          <Col sm={9}>
            <Card className="p-3">
              <Form.Group className="mb-3">
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dueDate"
                  value={quiz.dueDate || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Available From</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="availableDate"
                      value={quiz.availableDate || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="untilDate"
                      value={quiz.untilDate || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <hr />
        <div className="d-flex justify-content-end gap-2">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>

          <Button type="button" variant="primary" onClick={handleSave}>
            Save
          </Button>

          <Button
            type="button"
            variant="success"
            onClick={handleSaveAndPublish}
          >
            Save & Publish
          </Button>
        </div>
      </Form>
    </div>
  );
}