"use client";
import Link from "next/link";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
export default function Profile() {
  return (
    <Row className="vh-100 d-flex justify-content-center align-items-center">
    <Col md={9} className="d-flex justify-content-center">
      <Card className="p-4 shadow-sm" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="mb-4 text-center">Profile</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="alice" placeholder="Username" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue="123" type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue="Alice" placeholder="First Name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue="Wonderland" placeholder="Last Name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue="2000-01-01" type="date" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue="alice@wonderland" type="email" />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Select defaultValue="FACULTY">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </Form.Group>

          <Link href="/account/signin" className="btn btn-danger w-100 text-decoration-none">
            <Button variant="danger" type="button">
              Sign Out
            </Button>
          </Link>
        </Form>
      </Card>
    </Col>
  </Row>
);}

