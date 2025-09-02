import { Card } from "react-bootstrap"
import { Pencil, Gem } from "react-bootstrap-icons"

function InformazioniSection() {
    return (
        <Card className="border rounded mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white">
                <span className="fw-bold">Informazioni</span>
                <Pencil className="text-secondary" />
            </Card.Header>
            <Card.Body className="text-start">
                <Card.Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
                    quisquam aperiam illo atque laborum mollitia dignissimos distinctio,
                    voluptates, recusandae porro vel, rem enim excepturi dolores quo at
                    eius eveniet tempora!
                </Card.Text>
                <div className="mt-3 d-flex align-items-center">
                    <Gem className="me-2 text-secondary" />
                    <span className="fw-bold">Competenze principali</span>
                </div>
                <div className="mt-2">
                    <small>Teamwork da remoto</small> <small>·</small>{" "}
                    <small>Lingua inglese</small> <small>·</small>{" "}
                    <small>Service Desk</small> <small>·</small> <small>ICT</small>
                </div>
            </Card.Body>
        </Card>
    )
}

export default InformazioniSection