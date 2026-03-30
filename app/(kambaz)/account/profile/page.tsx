"use client";
import Link from "next/link";
import * as client from "../client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };
  const fetchProfile = () => {
    if (!currentUser) return redirect("/account/signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/account/signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
 
  return (
<Row className="vh-100 d-flex justify-content-center align-items-center">
  <Col md={9} className="d-flex justify-content-center">
    <Card className="p-4 shadow-sm" style={{ width: "100%", maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Profile</h2>

      {profile && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              id="wd-username"
              defaultValue={profile.username}
              placeholder="Username"
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              id="wd-password"
              type="password"
              defaultValue={profile.password}
              placeholder="Password"
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              id="wd-firstname"
              defaultValue={profile.firstName}
              placeholder="First Name"
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              id="wd-lastname"
              defaultValue={profile.lastName}
              placeholder="Last Name"
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              id="wd-dob"
              type="date"
              defaultValue={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              id="wd-email"
              type="email"
              defaultValue={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Select
              id="wd-role"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </Form.Group>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
          <Button
            onClick={signout}
            className="w-100"
            variant="danger"
            id="wd-signout-btn"
          >
            Sign Out
          </Button>
        </Form>
      )}
    </Card>
  </Col>
</Row>

);}

