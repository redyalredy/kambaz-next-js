"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;

  const [moduleObj, setModuleObj] = useState({
    id: "m1",
    name: "Web Development",
    description: "Learning React and Node",
    course: "CS4550",
  });

  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">

      <h4>Modifying Properties</h4>

      <div className="d-flex align-items-center mb-3">
        <FormControl
          id="wd-assignment-title"
          className="me-2 w-75"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a
          id="wd-update-assignment-title"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Title
        </a>
      </div>

      <hr />

      <h3>Working With Objects</h3>

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>

      <hr />

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>

      <hr />

      <h4>Update Score</h4>

      <div className="d-flex align-items-center mb-3">
        <FormControl
          type="number"
          className="me-2 w-75"
          value={assignment.score}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              score: parseInt(e.target.value),
            })
          }
        />
        <a
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
      </div>

      <hr />

      <h4>Update Completed</h4>

      <div className="d-flex align-items-center mb-3">
        <input
          type="checkbox"
          className="me-2"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              completed: e.target.checked,
            })
          }
        />
        <a
          className="btn btn-dark"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>

      <hr />

      <h3>Module</h3>

      <h4>Get Module</h4>
      <a className="btn btn-primary me-2" href={`${MODULE_API_URL}`}>
        Get Module
      </a>
      <a className="btn btn-secondary" href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>

      <hr />

      <h4>Update Module Name</h4>

      <div className="d-flex align-items-center mb-3">
        <FormControl
          className="me-2 w-75"
          value={moduleObj.name}
          onChange={(e) =>
            setModuleObj({ ...moduleObj, name: e.target.value })
          }
        />
        <a
          className="btn btn-success"
          href={`${MODULE_API_URL}/name/${moduleObj.name}`}
        >
          Update Module Name
        </a>
      </div>

      <hr />

      <h4>Update Module Description</h4>

      <div className="d-flex align-items-center mb-3">
        <FormControl
          className="me-2 w-75"
          value={moduleObj.description}
          onChange={(e) =>
            setModuleObj({
              ...moduleObj,
              description: e.target.value,
            })
          }
        />
        <a
          className="btn btn-warning"
          href={`${MODULE_API_URL}/description/${moduleObj.description}`}
        >
          Update Description
        </a>
      </div>

      <hr />
    </div>
  );
}