import Link from "next/link";
import AssignmentControls from "./assignmentControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { FaPlus } from "react-icons/fa6";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br /><br />

      <ListGroup className="rounded-0" id="wd-assignment-list">

        <ListGroupItem className="p-3 ps-2 fs-5 bg-light">
          <div className="d-flex align-items-center justify-content-between">

            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>

            <div className="d-flex align-items-center">
              <span className="rounded-pill border px-3 py-1 me-3 text-muted">
                40% of Total
              </span>
              <FaPlus className="fs-4 me-3" />
              <IoEllipsisVertical className="fs-4" />
            </div>

          </div>
        </ListGroupItem>

        <ListGroupItem className="wd-lesson p-3 ps-2">
          <div className="d-flex align-items-center justify-content-between">

            <div className="d-flex align-items-center">
              <BsGripVertical className="fs-3 me-3" />
              <FaRegFileAlt className="text-success fs-5 me-3" />
            </div>

            <div className="flex-grow-1">
              <Link href="/courses/1234/assignments/123"
             className="wd-assignment-link">
                <div className="fw-bold text-primary" style={{ cursor: "pointer" }}>
                  A1
                </div>
              </Link>
              <div className="small">

                <div>
                  <span className="text-danger">Multiple Modules</span>
                  <span className="text-muted"> | Not available until May 6 at 12:00am |</span>
                </div>

                <div className="text-muted">
                  Due May 13 at 11:59pm | 100 pts
                </div>

              </div>
            </div>

            <div className="d-flex align-items-center">
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4 ms-3" />
            </div>

          </div>
        </ListGroupItem>

        <ListGroupItem className="wd-lesson p-3 ps-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="fs-3 me-3" />
              <FaRegFileAlt className="text-success fs-5 me-3" />
            </div>

            <div className="flex-grow-1">
              <div className="fw-bold">A2</div>
              <div className="small">

                <div>
                  <span className="text-danger">Multiple Modules</span>
                  <span className="text-muted"> | Not available until May 6 at 12:00am |</span>
                </div>

                <div className="text-muted">
                  Due May 20 at 11:59pm | 100 pts
                </div>

              </div>
            </div>


            <div className="d-flex align-items-center">
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4 ms-3" />
            </div>
          </div>
        </ListGroupItem>

      </ListGroup>
    </div>
  );
}
