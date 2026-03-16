"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Row, Col, Card, FormSelect, FormCheck, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../../../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const courseId = Array.isArray(cid) ? cid[0] : cid;

  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any;
  const isStudent = currentUser?.role === "STUDENT";
  const canEdit = !isStudent;

  const assignments = useSelector((state: RootState) => state.coursesReducer.assignments);
  const existingAssignment = aid
    ? assignments.find(a => a.course === courseId && a._id === aid)
    : undefined;

  const [assignment, setAssignment] = useState<any>(
    existingAssignment || {
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
    }
  );

  const isNew = !existingAssignment;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleSave = () => {
    if (isNew) {
      dispatch(addAssignment({ ...assignment, _id: crypto.randomUUID() }));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/courses/${courseId}/assignments`);
  };

  const handleCancel = () => router.push(`/courses/${courseId}/assignments`);

  if (isStudent) return null; 

  return (
    <Form className="p-4" id="wd-assignments-editor">
      <h2>{isNew ? "Add Assignment" : "Edit Assignment"}</h2>
      <hr />

      <Form.Group className="mb-3">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control type="text" name="title" value={assignment.title} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={assignment.description} onChange={handleChange} />
      </Form.Group>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">Points</Col>
        <Col sm={9}>
          <Form.Control type="number" name="points" value={assignment.points} onChange={handleChange} />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">Assignment Group</Col>
        <Col sm={9}>
          <FormSelect name="group" value={assignment.group} onChange={handleChange}>
            <option value="Assignments">Assignments</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">Display Grade As</Col>
        <Col sm={9}>
          <FormSelect name="gradeDisplay" value={assignment.gradeDisplay} onChange={handleChange}>
            <option value="Letter">Letter</option>
            <option value="Points">Points</option>
            <option value="Percentage">Percentage</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <Col sm={3} className="text-end">Submission Type</Col>
        <Col sm={9}>
          <Card className="p-3">
            <FormSelect name="submissionType" value={assignment.submissionType} onChange={handleChange}>
              <option value="InPerson">InPerson</option>
              <option value="Online">Online</option>
            </FormSelect>

            <Form.Label className="mt-3">Online Entry Options</Form.Label>
            <div className="ms-3">
              <FormCheck type="checkbox" label="Text Entry" />
              <FormCheck type="checkbox" label="Website URL" />
              <FormCheck type="checkbox" label="Media Recordings" />
              <FormCheck type="checkbox" label="Student Annotations" />
              <FormCheck type="checkbox" label="File Uploads" />
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <Col sm={3} className="text-end">Assign</Col>
        <Col sm={9}>
          <Card className="p-3">
            <Form.Group className="mb-3">
              <Form.Label>Assign To</Form.Label>
              <Form.Control type="text" defaultValue="Everyone" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due</Form.Label>
              <Form.Control type="date" name="dueDate" value={assignment.dueDate} onChange={handleChange} />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Available From</Form.Label>
                  <Form.Control type="date" name="availableFrom" value={assignment.availableFrom} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  <Form.Control type="date" name="availableUntil" value={assignment.availableUntil} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>{isNew ? "Add" : "Update"}</Button>
      </div>
    </Form>
  );
}
