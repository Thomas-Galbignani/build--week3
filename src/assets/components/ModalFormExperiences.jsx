import { useState } from "react";
import { MdAddToPhotos } from "react-icons/md";
import { Modal, Button, Form } from "react-bootstrap";

function ModalFormExperiences() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Qui puoi gestire i dati del form
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <MdAddToPhotos />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi esperienza lavorativa</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formRuolo">
                            <Form.Label>Ruolo</Form.Label>
                            <Form.Control type="text" placeholder="Es. Sviluppatore Frontend" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCompagnia">
                            <Form.Label>Compagnia</Form.Label>
                            <Form.Control type="text" placeholder="Es. OpenAI" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formInizio">
                            <Form.Label>Data di inizio</Form.Label>
                            <Form.Control type="date" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formFine">
                            <Form.Label>Data di fine</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDescrizione">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Descrivi la tua esperienza" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLuogo">
                            <Form.Label>Luogo</Form.Label>
                            <Form.Control type="text" placeholder="Es. Milano, Italia" />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Annulla
                        </Button>
                        <Button variant="primary" type="submit">
                            Salva
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default ModalFormExperiences;
