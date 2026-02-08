"use client";
import Link from "next/link";
import { Card, Form, Button } from "react-bootstrap";
export default function Signup() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Card className="p-4" style={{ width: "400px" }}>
        <h2 className="mb-4 text-center">Signup</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Control placeholder="Username" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Link href="/account/profile" className="d-grid mb-3">
            <Button variant="primary">Signup</Button>
          </Link>

          <div className="text-center">
            <Link href="/account/signup">Signin</Link>
          </div>
        </Form>
      </Card>
    </div>
);}

