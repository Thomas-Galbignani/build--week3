import { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"

const API_URL = "https://striveschool-api.herokuapp.com/api/profile/"
const AbbronzatoKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI2ZWYyODU2MzA1YzAwMTU1ODgzNTUiLCJpYXQiOjE3NTY4MTkyNDAsImV4cCI6MTc1ODAyODg0MH0.mJDQJKbzQs0cNjxS0dB4A7-DFPVUYsM0hZGX7abJwLY"

export default function ModalFormExperiences({
  experience,
  onClose,
  onUpdate,
  userId,
}) {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    area: "",
    description: "",
    startDate: "",
    endDate: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (experience) {
      setFormData({
        ...experience,
        startDate: experience.startDate
          ? experience.startDate.substring(0, 10)
          : "",
        endDate: experience.endDate
          ? experience.endDate.substring(0, 10)
          : null,
      })
    } else {
      setFormData({
        role: "",
        company: "",
        area: "",
        description: "",
        startDate: "",
        endDate: null,
      })
    }
  }, [experience])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const method = experience ? "PUT" : "POST"
    const url = experience
      ? `${API_URL}${userId}/experiences/${experience._id}`
      : `${API_URL}${userId}/experiences`

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AbbronzatoKey}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      onUpdate()
    } catch (err) {
      console.error("Errore durante l'operazione:", err)
      alert("Si è verificato un errore. Riprova.")
    } finally {
      setIsSubmitting(false)
      onClose()
    }
  }

  return (
    <Modal show={true} onHide={onClose} style={{ zIndex: 2000 }}>
      <Modal.Header closeButton>
        <Modal.Title>
          {experience ? "Modifica Esperienza" : "Aggiungi Esperienza"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Ruolo</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Azienda</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Località</Form.Label>
            <Form.Control
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data di inizio</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data di fine (facoltativa)</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Annulla
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvataggio..." : "Salva"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
