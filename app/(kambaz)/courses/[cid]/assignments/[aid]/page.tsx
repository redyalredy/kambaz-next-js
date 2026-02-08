"use client";
import { FormGroup, FormLabel, FormControl, Row, Col, FormSelect, FormCheck, Button, Form, Card } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
      <Form className="p-4" id="wd-assignments-editor">
      <Form.Group className="mb-3" controlId="wd-name">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="wd-description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          defaultValue="The assignment is available online Submit a link to the landing page of"
        />
      </Form.Group>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">
          Points
        </Col>
        <Col sm={9}>
          <Form.Control type="number" defaultValue={100} />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">
          Assignment Group
        </Col>
        <Col sm={9}>
          <Form.Select defaultValue="Assignments">
            <option value="Assignments">ASSIGNMENTS</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">
          Display Grade As
        </Col>
        <Col sm={9}>
          <Form.Select defaultValue="Percentage">
            <option value="Letter">Letter</option>
            <option value="Points">Points</option>
            <option value="Percentage">Percentage</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <Col sm={3} className="text-end">
          Submission Type
        </Col>
        <Col sm={9}>
          <Card className="p-3">
            <Form.Select defaultValue="Online">
              <option value="InPerson">InPerson</option>
              <option value="Online">Online</option>
            </Form.Select>

            <Form.Label className="mt-3">Online Entry Options</Form.Label>
            <div className="ms-3">
              <Form.Check type="checkbox" id="wd-chkbox-text" label="Text Entry" />
              <Form.Check type="checkbox" id="wd-chkbox-website" label="Website URL" />
              <Form.Check type="checkbox" id="wd-chkbox-media" label="Media Recordings" />
              <Form.Check type="checkbox" id="wd-chkbox-student" label="Student Annotations" />
              <Form.Check type="checkbox" id="wd-chkbox-file" label="File Uploads" />
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
              <Form.Control type="text" defaultValue="Everyone" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due</Form.Label>
              <Form.Control type="date" defaultValue="2026-11-25" />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Available From</Form.Label>
                  <Form.Control type="date" defaultValue="2026-11-22" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  <Form.Control type="date" defaultValue="2026-11-25" />
                </Form.Group>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save</Button>
      </div>
    </Form>
  );}
  
  