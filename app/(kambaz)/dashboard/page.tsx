"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../courses/reducer";

import { RootState } from "../store";
import * as client from "../courses/client";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { courses } = useSelector(
    (state: RootState) => state.coursesReducer
  );

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const isStudent = currentUser?.role === "STUDENT";
  const canEdit = currentUser && !isStudent;

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "",
    startDate: "",
    endDate: "",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));};


  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Dashboard</h1>
      </div>

      <hr />

      {canEdit && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">New Course</h5>

            <div className="d-flex gap-2">
              <Button
                onClick={onAddNewCourse}
                variant="primary"
              >
                Add
              </Button>

              <Button
                onClick={onUpdateCourse}
                variant="warning"
              >
                Update
              </Button>
            </div>
          </div>

          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) =>
              setCourse({ ...course, name: e.target.value })
            }
          />

          <FormControl
            as="textarea"
            rows={3}
            value={course.description}
            className="mb-3"
            onChange={(e) =>
              setCourse({
                ...course,
                description: e.target.value,
              })
            }
          />

          <hr />
        </div>
      )}

      <Row xs={1} md={4} className="g-4">
        {courses.map((c) => (
          <Col key={c._id}>
            <Card>
              <CardImg
                src={c.image || "/images/react.jpg"}
                height={160}
              />

              <CardBody>
                <CardTitle>{c.name}</CardTitle>

                <CardText
                  style={{
                    height: "100px",
                    overflowY: "auto",
                    paddingRight: "5px",
                  }}
                >
                  {c.description}
                </CardText>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <Link href={`/courses/${c._id}/home`}>
                    <Button variant="primary">Go</Button>
                  </Link>

                  {canEdit && (
                    <div className="d-flex gap-2">
                      <Button
                        onClick={() => setCourse(c)}
                        variant="warning"
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={(event) => {
                          event.preventDefault();
                          onDeleteCourse(course._id)
                        }}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}