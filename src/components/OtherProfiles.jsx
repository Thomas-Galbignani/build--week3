import { Card, Col, Button, ListGroup, Image, Row } from "react-bootstrap";

const Mario = {
    name: "Mario Rossi",
    job: "Full-Stack Developer with Front-End specialization",
    img: "https://placecats.com/50/50",
};

const OtherProfiles = () => {
    return (
        <Col xs={12}>
            <Card className="shadow-sm rounded-3">
                <Card.Body className="pb-2">
                    <Card.Title className="mb-0 fs-6 fw-bold">Altri Profili per te</Card.Title>
                </Card.Body>
                <ListGroup className="rounded-0 border-0 px-2">
                    <ListGroup.Item className="border-start-0 border-end-0 py-2 pb-4">
                        <Row className="g-2 align-items-center">
                            <Col xs={"auto"} className="align-self-start mt-3">
                                <Image src={Mario.img} roundedCircle width={50} height={50} alt={Mario.name} />
                            </Col>
                            <Col>
                                <div className="fw-semibold d-flex align-items-center">{Mario.name}</div>
                                <div className=" small two-lines my-1">{Mario.job}</div>
                                <div>
                                    <Button size="sm" variant="outline-secondary" className="rounded-pill fw-bold">
                                        <span className="me-1">+</span> Collegati
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-start-0 border-end-0 py-2 pb-4">
                        <Row className="g-2 align-items-center">
                            <Col xs={"auto"} className="align-self-start mt-3">
                                <Image src={Mario.img} roundedCircle width={50} height={50} alt={Mario.name} />
                            </Col>
                            <Col>
                                <div className="fw-semibold d-flex align-items-center">{Mario.name}</div>
                                <div className=" small two-lines my-1">{Mario.job}</div>
                                <div>
                                    <Button size="sm" variant="outline-secondary" className="rounded-pill fw-bold">
                                        <span className="me-1">+</span> Collegati
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-start-0 border-end-0 py-2 pb-4">
                        <Row className="g-2 align-items-center">
                            <Col xs={"auto"} className="align-self-start mt-3">
                                <Image src={Mario.img} roundedCircle width={50} height={50} alt={Mario.name} />
                            </Col>
                            <Col>
                                <div className="fw-semibold d-flex align-items-center">{Mario.name}</div>
                                <div className=" small two-lines my-1">{Mario.job}</div>
                                <div>
                                    <Button size="sm" variant="outline-secondary" className="rounded-pill fw-bold">
                                        <span className="me-1">+</span> Collegati
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-start-0 border-end-0 py-2 pb-4">
                        <Row className="g-2 align-items-center">
                            <Col xs={"auto"} className="align-self-start mt-3">
                                <Image src={Mario.img} roundedCircle width={50} height={50} alt={Mario.name} />
                            </Col>
                            <Col>
                                <div className="fw-semibold d-flex align-items-center">{Mario.name}</div>
                                <div className=" small two-lines my-1">{Mario.job}</div>
                                <div>
                                    <Button size="sm" variant="outline-secondary" className="rounded-pill fw-bold">
                                        <span className="me-1">+</span> Collegati
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>

                <Button variant="muted" className="text-decoration-none w-100 fw-bold text-secondary">
                    Mostra tutto
                </Button>
            </Card>
        </Col>
    );
};

export default OtherProfiles;
