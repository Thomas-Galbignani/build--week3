import { Card, Col, Button, ListGroup, Image, Row } from "react-bootstrap";

const Google = {
    name: "Google",
    type: "Sviluppo di software",
    img: "https://placecats.com/50/50",
    followers: "30.000.000",
    links: "4",
};

const YouCouldLike = () => {
    return (
        <Col xs={12}>
            <Card className="shadow-sm rounded-3">
                <Card.Body className="pb-2">
                    <Card.Title className="mb-0 fs-6 fw-bold">Potrebbe Interessarti</Card.Title>
                    <Card.Subtitle className="text-muted mt-1 small">Dal tuo settore</Card.Subtitle>
                </Card.Body>
                <ListGroup className="rounded-0 border-0 px-2">
                    <ListGroup.Item className="border-start-0 border-end-0 py-2 pb-4">
                        <Row className="g-2 align-items-center">
                            <Col xs={"auto"} className="align-self-start mt-3">
                                <Image src={Google.img} width={50} height={50} alt={Google.name} />
                            </Col>
                            <Col>
                                <div className="fw-semibold d-flex align-items-center">{Google.name}</div>
                                <div className=" small two-lines">{Google.type}</div>
                                <div className="text-secondary small two-lines">{Google.followers} follower</div>
                                <div className=" small two-lines mb-2">{Google.links} collegamenti seguono questa pagina</div>
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

export default YouCouldLike;
