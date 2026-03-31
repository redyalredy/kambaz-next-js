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
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../assignments/client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const assignmentId = Array.isArray(aid) ? aid[0] : aid;

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const isStudent = currentUser?.role === "STUDENT";
  const canEdit = !isStudent;
  const isNew = !assignmentId || assignmentId === "new";

  const [assignment, setAssignment] = useState<any>({
    _id: "",
    title: "",
    description: "",
    course: courseId,
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    group: "Assignments",
    gradeDisplay: "Percentage",
    submissionType: "Online",
  });

  const loadAssignment = async () => {
    if (isNew || !assignmentId) return;
    const existingAssignment = await client.findAssignmentById(assignmentId);
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  };

  useEffect(() => {
    loadAssignment();
  }, [assignmentId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: name === "points" ? Number(value) : value });
  };

  const handleSave = async () => {
    if (isNew) {
      await client.createAssignmentForCourse(courseId as string, {
        ...assignment,
        course: courseId,
      });
    } else {
      await client.updateAssignment(assignment);
    }
    router.push(`/courses/${courseId}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${courseId}/assignments`);
  };

  if (isStudent) return null;

  return (
    <Form className="p-4" id="wd-assignments-editor">
      <h2>{isNew ? "Add Assignment" : "Edit Assignment"}</h2>
      <hr />

      <Form.Group className="mb-3">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={assignment.title}
          onChange={handleChange}
          disabled={!canEdit}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={assignment.description}
          onChange={handleChange}
          disabled={!canEdit}
        />
      </Form.Group>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">
          Points
        </Col>
        <Col sm={9}>
          <Form.Control
            type="number"
            name="points"
            value={assignment.points}
            onChange={handleChange}
            disabled={!canEdit}
          />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">
          Assignment Group
        </Col>
        <Col sm={9}>
          <FormSelect
            name="group"
            value={assignment.group}
            onChange={handleChange}
            disabled={!canEdit}
          >
            <option value="Assignments">Assignments</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">
          Display Grade As
        </Col>
        <Col sm={9}>
          <FormSelect
            name="gradeDisplay"
            value={assignment.gradeDisplay}
            onChange={handleChange}
            disabled={!canEdit}
          >
            <option value="Letter">Letter</option>
            <option value="Points">Points</option>
            <option value="Percentage">Percentage</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <Col sm={3} className="text-end">
          Submission Type
        </Col>
        <Col sm={9}>
          <Card className="p-3">
            <FormSelect
              name="submissionType"
              value={assignment.submissionType}
              onChange={handleChange}
              disabled={!canEdit}
            >
              <option value="InPerson">InPerson</option>
              <option value="Online">Online</option>
            </FormSelect>

            <Form.Label className="mt-3">Online Entry Options</Form.Label>
            <div className="ms-3">
              <FormCheck type="checkbox" label="Text Entry" disabled />
              <FormCheck type="checkbox" label="Website URL" disabled />
              <FormCheck type="checkbox" label="Media Recordings" disabled />
              <FormCheck type="checkbox" label="Student Annotations" disabled />
              <FormCheck type="checkbox" label="File Uploads" disabled />
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <Col sm={3} className="text-end">
          Assign
        </Col>
        <Col sm={9}>
          <Card className="p-3">
            <Form.Group className="mb-3">
              <Form.Label>Assign To</Form.Label>
              <Form.Control type="text" defaultValue="Everyone" disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={assignment.dueDate}
                onChange={handleChange}
                disabled={!canEdit}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Available From</Form.Label>
                  <Form.Control
                    type="date"
                    name="availableFrom"
                    value={assignment.availableFrom}
                    onChange={handleChange}
                    disabled={!canEdit}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="date"
                    name="availableUntil"
                    value={assignment.availableUntil}
                    onChange={handleChange}
                    disabled={!canEdit}
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
          {isNew ? "Add" : "Update"}
        </Button>
      </div>
    </Form>
  );
}