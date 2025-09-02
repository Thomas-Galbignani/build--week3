import { useState } from "react";
import { MdAddToPhotos } from "react-icons/md";
import { Modal, Button, Form } from "react-bootstrap";
import GetYourId from "../functions/GetYourId";

function ModalFormExperiences() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Await the result of the async function to get the actual ID
    const myId = await GetYourId();

    // 2. Correct the URL by removing the extra colon
    const EndpointExp = `https://striveschool-api.herokuapp.com/api/profile/${myId}/experiences`;
    const AbbronzatoKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI2ZWYyODU2MzA1YzAwMTU1ODgzNTUiLCJpYXQiOjE3NTY4MTkyNDAsImV4cCI6MTc1ODAyODg0MH0.mJDQJKbzQs0cNjxS0dB4A7-DFPVUYsM0hZGX7abJwLY";

    const Target = e.target;

    const FD = new FormData(Target);
    const Payload = {
      role: FD.get("role"),
      company: FD.get("company"),
      startDate: FD.get("startDate"),
      endDate: FD.get("endDate"),
      description: FD.get("description"),
      area: FD.get("area"),
    };

    try {
      const Res = await fetch(`${EndpointExp}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${AbbronzatoKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Payload),
      });
      console.log(Res);
      if (!Res.ok) {
        throw new Error(Res.status);
      }
      Target.reset();
    } catch (err) {
      console.log(err);
    }
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
              <Form.Control
                type="text"
                placeholder="Es. Sviluppatore Frontend"
                required
                name="role"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompagnia">
              <Form.Label>Compagnia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Es. OpenAI"
                required
                name="company"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formInizio">
              <Form.Label>Data di inizio</Form.Label>
              <Form.Control type="date" required name="startDate" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFine">
              <Form.Label>Data di fine</Form.Label>
              <Form.Control type="date" name="endDate" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescrizione">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descrivi la tua esperienza"
                name="description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLuogo">
              <Form.Label>Luogo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Es. Milano, Italia"
                name="area"
              />
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
