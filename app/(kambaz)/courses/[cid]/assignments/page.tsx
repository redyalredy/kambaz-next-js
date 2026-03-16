"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AssignmentControls from "./assignmentControls";
import { ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../modules/GreenCheckmark";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "../../reducer";

export default function Assignments() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;

  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const assignments =
    useSelector((state: RootState) => state.coursesReducer.assignments) || [];

  const courseAssignments = assignments.filter(
    (a) => a.course === courseId
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setAssignmentToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) dispatch(deleteAssignment(assignmentToDelete));
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  const isStudent = !currentUser || currentUser.role === "STUDENT";

  return (
    <div id="wd-assignments">
      <AssignmentControls canEdit={currentUser?.role !== "STUDENT"} />
      <br /><br />

      <ListGroup className="rounded-0" id="wd-assignment-list">

        <ListGroupItem className="p-3 ps-2 fs-5 bg-light">
          <div className="d-flex align-items-center justify-content-between">

            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>

            {!isStudent && (
              <div className="d-flex align-items-center">
                <span className="rounded-pill border px-3 py-1 me-3 text-muted">
                  40% of Total
                </span>
                <FaPlus className="fs-4 me-3" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            )}

          </div>
        </ListGroupItem>

        {courseAssignments.map((assignment) => (
          <ListGroupItem key={assignment._id} className="wd-lesson p-3 ps-2">

            <div className="d-flex align-items-center justify-content-between">

              <div className="d-flex align-items-center">
                <BsGripVertical className="fs-3 me-3" />
                <FaRegFileAlt className="text-success fs-5 me-3" />
              </div>

              <div className="flex-grow-1">

                <Link
                  href={`/courses/${courseId}/assignments/${assignment._id}`}
                  className="wd-assignment-link"
                >
                  <div
                    className="fw-bold text-primary"
                    style={{ cursor: "pointer" }}
                  >
                    {assignment.title}
                  </div>
                </Link>

                <div className="small mt-1">
                  <div>
                    <span className="text-danger">Multiple Modules</span>
                    <span className="text-muted">
                      {" "}
                      | Not available until {assignment.availableFrom} |
                    </span>
                  </div>

                  <div className="text-muted">
                    Due {assignment.dueDate} | {assignment.points} pts
                  </div>
                </div>

              </div>

              <div className="d-flex align-items-center">
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4 ms-3" />

                {!isStudent && (
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-3"
                    onClick={() => handleDeleteClick(assignment._id)}
                  >
                    Delete
                  </Button>
                )}
              </div>

            </div>

          </ListGroupItem>
        ))}

      </ListGroup>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete this assignment?
        </Modal.Body>

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