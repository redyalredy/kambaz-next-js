"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";
import GreenCheckmark from "../modules/GreenCheckmark";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

export default function Quizzes() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  const isStudent = !currentUser || currentUser.role === "STUDENT";
  const canEdit = currentUser?.role !== "STUDENT";

  const loadQuizzes = async () => {
    if (!courseId) return;
    const data = await client.findQuizzesForCourse(courseId);
    setQuizzes(data);

    if (currentUser?._id && isStudent) {
      const scoreMap: Record<string, number> = {};
      for (const quiz of data) {
        const lastAttempt = await client.findLastAttemptForQuiz(quiz._id, currentUser._id);
        if (lastAttempt) {
          scoreMap[quiz._id] = lastAttempt.score;
        }
      }
      setScores(scoreMap);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, [courseId]);

  const handleDeleteClick = (id: string) => {
    setQuizToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (quizToDelete && courseId) {
      await client.deleteQuiz(courseId, quizToDelete);
      setQuizzes(quizzes.filter((q) => q._id !== quizToDelete));
    }
    setShowDeleteModal(false);
    setQuizToDelete(null);
  };

  const handleAddQuiz = async () => {
    if (!courseId) return;
    await client.createQuizForCourse(courseId, { title: "New Quiz" });
    loadQuizzes();
  };

  const handleTogglePublish = async (quiz: any) => {
    if (quiz.published) {
      await client.unpublishQuiz(quiz._id);
    } else {
      await client.publishQuiz(quiz._id);
    }
    loadQuizzes();
  };

  const getAvailabilityText = (quiz: any) => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (available && now < available) {
      return `Not available until ${quiz.availableDate}`;
    }
    if (until && now > until) {
      return "Closed";
    }
    return "Available";
  };

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quizzes</h2>
        {canEdit && (
          <Button variant="danger" onClick={handleAddQuiz}>
            + Quiz
          </Button>
        )}
      </div>

      {quizzes.length === 0 && (
        <p>No quizzes yet. Click + Quiz to create one.</p>
      )}

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-3 ps-2 fs-5 bg-light">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              QUIZZES
            </div>

            {canEdit && (
              <div className="d-flex align-items-center">
                <FaPlus className="fs-4 me-3" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            )}
          </div>
        </ListGroupItem>

        {quizzes.map((quiz) => (
          <ListGroupItem key={quiz._id} className="p-3 ps-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <BsGripVertical className="fs-3 me-3" />
                <FaRegFileAlt className="text-success fs-5 me-3" />
              </div>

              <div className="flex-grow-1">
                <Link
                  href={`/courses/${courseId}/quizzes/${quiz._id}`}
                  className="wd-assignment-link"
                >
                  <div className="fw-bold text-primary" style={{ cursor: "pointer" }}>
                    {quiz.title}
                  </div>
                </Link>

                <div className="small mt-1">
                  <div>
                    <span className={quiz.published ? "text-success" : "text-danger"}>
                      {quiz.published ? "Available" : "Unpublished"}
                    </span>
                    <span className="text-muted">
                      {" | "}{getAvailabilityText(quiz)}
                    </span>
                  </div>

                  <div className="text-muted">
                    Due {quiz.dueDate || "No due date"} | {quiz.points || 0} pts |{" "}
                    {quiz.questions?.length || 0} questions
                    {isStudent && scores[quiz._id] !== undefined && (
                      <> | Score: {scores[quiz._id]}</>
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center">
                {quiz.published ? <GreenCheckmark /> : <span className="me-2">🚫</span>}
                <IoEllipsisVertical className="fs-4 ms-3" />

                {canEdit && (
                  <>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="ms-3"
                      onClick={() => handleTogglePublish(quiz)}
                    >
                      {quiz.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-3"
                      onClick={() => handleDeleteClick(quiz._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}