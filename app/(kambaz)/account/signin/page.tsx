"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../database";
import { Row, Col, Card, Form, Button, FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const signin = async () => {
    const user = await client.signin(credentials);

    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/dashboard");
  };
 
return (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "80vh" }}
  >
    <Card className="p-4" style={{ width: "400px" }}>
      <h2 className="mb-4 text-center">Signin</h2>

      <div id="wd-signin-screen">
        <FormControl
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="mb-3"
          placeholder="Username"
          id="wd-username"
        />

        <FormControl
          defaultValue={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="mb-3"
          placeholder="Password"
          type="password"
          id="wd-password"
        />

        <Button
          onClick={signin}
          id="wd-signin-btn"
          variant="primary"
          className="w-100 mb-3"
        >
          Signin
        </Button>

        <div className="text-center">
          <Link id="wd-signup-link" href="/account/signup">
            Signup
          </Link>
        </div>
      </div>
    </Card>
  </div>
);
        }
