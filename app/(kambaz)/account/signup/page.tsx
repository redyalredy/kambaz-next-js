"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";
import { Card, Form } from "react-bootstrap";
export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/profile");
  };

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
            <Button onClick={signup} variant="primary">Signup</Button>
          </Link>

          <div className="text-center">
            <Link href="/account/signup">Signin</Link>
          </div>
        </Form>
      </Card>
    </div>
);}

