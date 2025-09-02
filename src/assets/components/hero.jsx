import React from 'react';
import { Container, Row, Col, Image, Button, } from 'react-bootstrap';
import { ImPencil } from "react-icons/im";
import { MdOutlineVerifiedUser } from "react-icons/md";

const Hero = () => {
    return (
        <Container fluid className="bg-white p-0 rounded-4 shadow-sm">
            <div className="position-relative" style={{ height: '20em' }}>
                <Image src='https://www.20i.com/blog/wp-content/uploads/2021/04/burst.jpg' className="w-100 h-100 object-fit-cover rounded-top-4 cursor-pointer" />
                <Button variant="light" className="rounded-circle position-absolute me-3 mt-3 top-0 end-0 py-2 text-primary">
                    <ImPencil />
                </Button>
            </div>

            < div className="mx-1 ms-3">
                <Row className="position-relative">
                    <Col xs={12} className="pt-2">
                        <div className="position-absolute" style={{ top: '-100px' }}>
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" className="border border-white border-3 rounded-circle cursor-pointer" style={{ width: '130px', height: '130px' }} />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} className="mt-5 mt-md-4">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h3 className="h3 fw-bold mb-0">Thomas Lino Galbignani <MdOutlineVerifiedUser /></h3>
                                <p className="mt-1">Junior Front-end developer </p>
                                <p className="mt-1">Pavia, Lombardia, Italia <a href="#" className="text-decoration-none">Informazioni di contatto</a></p>
                                <p className="mt-1"><a href="#" className="text-decoration-none text-primary">6 collegamenti</a></p>
                            </div>
                            <span className="text-secondary cursor-pointer me-4">
                                <ImPencil />
                            </span>

                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Button variant="primary" className="rounded-pill me-2 mt-1 mb-3 fw-bold">Disponibile per</Button>
                        <Button variant="outline-primary" className="rounded-pill me-2 mt-1 mb-3  fw-bold">Aggiungi sezione del profilo</Button>
                        <Button variant="outline-primary" className="rounded-pill me-2  mt-1 mb-3 fw-bold">Migliora profilo</Button>
                        <Button variant="outline-secondary" className="rounded-pill mt-1 mb-3  fw-bold text-dark border-dark">Risorse</Button>
                    </Col>
                </Row>

            </div>
        </Container>
    );
};

export default Hero;