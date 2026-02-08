import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
            
            <Col className="Wd-dashboard-course" style={{width: "300px"}}>
                <Card>
                <Link href="/courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                    <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                            CS1234 React JS
                        </CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                            Full Stack software developer 
                        </CardText>
                        <Button variant="primary">Go</Button>
                    </CardBody>
                </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                    <Link href="/courses/5678" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/javascript.jpg" width={200} height={150} alt="javascript"/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                CS5678 JavaScript
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Front-End Web Development
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                    <Link href="/course/1429" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/arthistory.jpg" width={200} height={150} alt="arthistory"/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                ART1429 Art History 
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                The Beginnings of Art
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                    <Link href="/course/6823" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/writing.jpg" width={200} height={150} alt="writing"/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                ENGW683 Writing
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Interdisiplinary Advanced English Writing
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                    <Link href="/course/9963" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/physics.jpg" width={200} height={150} alt="physics"/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                PHYS9963 Physics
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Physics II
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                    <Link href="/course/6193" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/chemistry.jpg" width={200} height={150} alt="chemistry"/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                CHEM6193 Chemistry
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Understanding the Chemistry Around Us
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                    <Link href="/course/9366" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/biology.jpg" width={200} height={150} alt="biology"/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                BIO9366 Biology
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Understanding the Living
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>
        </Row>

      </div>
    </div>
);}
