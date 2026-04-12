"use client";

import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../account/client";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FormControl, FormSelect } from "react-bootstrap";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  const startEditing = () => {
    setName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
    setEmail(user.email || "");
    setRole(user.role || "");
    setEditing(true);
  };

  const saveUser = async () => {
    const parts = name.trim().split(" ");
    const firstName = parts[0] || user.firstName;
    const lastName = parts.slice(1).join(" ") || user.lastName;
  
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      role,
    };
  
    const savedUser = await client.updateUser(updatedUser);
    setUser(savedUser);
    setName(`${savedUser.firstName || ""} ${savedUser.lastName || ""}`.trim());
    setEmail(savedUser.email || "");
    setRole(savedUser.role || "");
    setEditing(false);
    fetchUser();
  };
  const handleEnterSave = (e: any) => {
    if (e.key === "Enter") {
      saveUser();
    }
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  return (
    <div
      className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow"
      style={{ width: "360px", zIndex: 1050 }}
    >
      <button
        onClick={onClose}
        className="btn position-absolute top-0 end-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2 mb-3">
        <FaUserCircle className="text-secondary" style={{ fontSize: "72px" }} />
      </div>

      <hr />

      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="text-danger fs-4 fw-semibold flex-grow-1 me-2">
          {!editing ? (
            <div
              className="wd-name"
              onClick={startEditing}
              style={{ cursor: "pointer" }}
            >
              {user.firstName} {user.lastName}
            </div>
          ) : (
            <FormControl
              className="wd-edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleEnterSave}
            />
          )}
        </div>

        {!editing ? (
          <FaPencil
            onClick={startEditing}
            className="fs-5 mt-1 wd-edit"
            style={{ cursor: "pointer" }}
          />
        ) : (
          <FaCheck
            onClick={saveUser}
            className="fs-5 mt-1 me-1 text-success wd-save"
            style={{ cursor: "pointer" }}
          />
        )}
      </div>

      <div className="mb-3">
        <div className="fw-semibold mb-1">Role</div>
        {!editing ? (
          <div className="wd-roles">{user.role}</div>
        ) : (
          <FormSelect
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={handleEnterSave}
          >
            <option value="STUDENT">Students</option>
            <option value="TA">Assistants</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrators</option>
          </FormSelect>
        )}
      </div>

      <div className="mb-3">
        <div className="fw-semibold mb-1">Email</div>
        {!editing ? (
          <div className="wd-email">{user.email}</div>
        ) : (
          <FormControl
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEnterSave}
          />
        )}
      </div>

      <div className="mb-2">
        <span className="fw-semibold">Section:</span>{" "}
        <span className="wd-section">{user.section}</span>
      </div>

      <div className="mb-3">
        <span className="fw-semibold">Total Activity:</span>{" "}
        <span className="wd-total-activity">{user.totalActivity}</span>
      </div>

      <hr />

      <div className="d-flex justify-content-end gap-2">
        <button onClick={onClose} className="btn btn-secondary wd-cancel">
          Cancel
        </button>
        <button
          onClick={() => deleteUser(uid)}
          className="btn btn-danger wd-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}