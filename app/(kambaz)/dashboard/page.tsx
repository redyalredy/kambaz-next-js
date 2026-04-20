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
import { setCourses } from "../courses/reducer";
import { RootState } from "../store";
import * as coursesClient from "../courses/client";
import * as enrollmentsClient from "../courses/enrollments/client";

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

  const [showAll, setShowAll] = useState(false);
  const [allCourses, setAllCourses] = useState<any[]>([]);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "",
    startDate: "",
    endDate: "",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchMyCourses = async () => {
    try {
      const myCourses = await enrollmentsClient.findMyCourses();
      dispatch(setCourses(myCourses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const all = await coursesClient.fetchAllCourses();
      setAllCourses(all);
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await coursesClient.createCourse(course);
    dispatch(setCourses([...safeCourses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(safeCourses.filter((c) => c._id !== courseId)));
    setAllCourses(allCourses.filter((c) => c && c._id !== courseId));
  };

  const onUpdateCourse = async () => {
    await coursesClient.updateCourse(course);
    dispatch(
      setCourses(
        safeCourses.map((c) => (c._id === course._id ? course : c))
      )
    );
    setAllCourses(
      allCourses.map((c) => (c && c._id === course._id ? course : c))
    );
  };

  const onEnroll = async (courseId: string) => {
    await enrollmentsClient.enrollIntoCourse("current", courseId);
    await fetchMyCourses();
  };

  const onUnenroll = async (courseId: string) => {
    await enrollmentsClient.unenrollFromCourse("current", courseId);
    await fetchMyCourses();
  };

  useEffect(() => {
    if (currentUser) {
      fetchMyCourses();
      fetchAllCourses();
    }
  }, [currentUser]);

  if (!currentUser) return <div>Loading...</div>;

  const safeCourses = (courses || []).filter((c: any) => c && c._id);
  const safeAllCourses = (allCourses || []).filter((c: any) => c && c._id);

  const enrolledCourseIds = new Set(
    safeCourses.map((c: any) => c._id)
  );

  const visibleCourses = isStudent
    ? showAll
      ? safeAllCourses
      : safeCourses
    : safeAllCourses;

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
              <Button onClick={onAddNewCourse} variant="primary">
                Add
              </Button>

              <Button onClick={onUpdateCourse} variant="warning">
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
        {visibleCourses.map((c: any) => {
          const isEnrolled = enrolledCourseIds.has(c._id);

          return (
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
                    {(!showAll && (isStudent ? isEnrolled : canEdit)) && (
                      <Link href={`/courses/${c._id}/home`}>
                        <Button variant="primary">Go</Button>
                      </Link>
                    )}

                    {isStudent && showAll && (
                      isEnrolled ? (
                        <Button
                          variant="danger"
                          onClick={() => onUnenroll(c._id)}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => onEnroll(c._id)}
                        >
                          Enroll
                        </Button>
                      )
                    )}

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
                            onDeleteCourse(c._id);
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
          );
        })}
      </Row>
    </div>
  );
}