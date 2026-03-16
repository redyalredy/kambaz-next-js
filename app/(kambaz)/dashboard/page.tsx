"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { RootState } from "../store";
import * as db from "../database";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any;
  const { enrollments } = db;

  if (!currentUser) return <div>Loading...</div>;

  const isStudent = currentUser.role === "STUDENT";
  const canEdit = !isStudent;

  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(() => {
    const saved = localStorage.getItem(`enrollments_${currentUser._id}`);
    return saved
      ? JSON.parse(saved)
      : enrollments
          .filter(e => e.user === currentUser._id)
          .map(e => e.course);
  });

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (isStudent) {
      localStorage.setItem(`enrollments_${currentUser._id}`, JSON.stringify(enrolledCourses));
    }
  }, [enrolledCourses]);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    description: "New Description",
    image: "/images/reactjs.jpg",
  });

  const visibleCourses = isStudent
    ? showAll
      ? courses
      : courses.filter(c => enrolledCourses.includes(c._id))
    : courses;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Dashboard</h1>
        {isStudent && (
          <Button onClick={() => setShowAll(!showAll)} variant="primary">
            {showAll ? "Show My Courses" : "Show All Courses"}
          </Button>
        )}
      </div>
      <hr />

      {canEdit && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">New Course</h5>
            <div className="d-flex gap-2">
              <Button onClick={() => dispatch(addNewCourse(course))} variant="primary">Add</Button>
              <Button onClick={() => dispatch(updateCourse(course))} variant="warning">Update</Button>
            </div>
          </div>
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            rows={3}
            value={course.description}
            className="mb-3"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </div>
      )}

      <Row xs={1} md={4} className="g-4">
        {visibleCourses.map(c => {
          const isEnrolled = enrolledCourses.includes(c._id);

          return (
            <Col key={c._id}>
              <Card>
                <CardImg src={c.image || "/images/react.jpg"} height={160} />
                <CardBody>
                  <CardTitle>{c.name}</CardTitle>
                  <CardText
                    style={{
                      height: "100px",
                      overflowY: "auto",
                      paddingRight: "5px"
                    }}
                  >
                    {c.description}
                  </CardText>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    {(!showAll && (isStudent ? isEnrolled : canEdit)) && (
                      <Link href={`/courses/${c._id}/home`}>
                        <Button variant="primary">Go</Button>
                      </Link>
                    )}

                    {isStudent && showAll && (
                      isEnrolled ? (
                        <Button
                          variant="danger"
                          onClick={() => setEnrolledCourses(prev => prev.filter(id => id !== c._id))}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => setEnrolledCourses(prev => [...prev, c._id])}
                        >
                          Enroll
                        </Button>
                      )
                    )}

                    {canEdit && (
                      <div className="d-flex gap-2">
                        <Button onClick={() => setCourse(c)} variant="warning">Edit</Button>
                        <Button onClick={() => dispatch(deleteCourse(c._id))} variant="danger">Delete</Button>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
