import { Card, Row, Col } from "react-bootstrap"
import {
  Eye,
  BarChart,
  Search,
  People,
  ArrowRight,
} from "react-bootstrap-icons"

function AnalisiSection() {
  return (
    <Card className="mb-4 border rounded">
      <Card.Header className="bg-white text-start">
        <div className="fw-bold">Analisi</div>
        <div className="d-flex align-items-center">
          <Eye className="me-1 text-secondary" size={14} />
          <small className="text-muted">Solo per te</small>
        </div>
      </Card.Header>
      <Card.Body className="py-2">
        <Row className="g-3">
          <Col xs={12} md={4} className="text-start">
            <div className="d-flex align-items-center">
              <People className="me-2 text-secondary" />
              <div>
                <div>
                  <strong>0</strong> visualizzazioni del profilo
                </div>
                <small className="text-muted">
                  Scopri chi ha visitato il tuo profilo.
                </small>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} className="text-start">
            <div className="d-flex align-items-center">
              <BarChart className="me-2 text-secondary" />
              <div>
                <div>
                  <strong>0</strong> impressioni del post
                </div>
                <small className="text-muted">
                  Scopri chi sta interagendo con i tuoi post.
                </small>{" "}
                <br />
                <small className="text-muted">Ultimi 7 giorni</small>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} className="text-start">
            <div className="d-flex align-items-center">
              <Search className="me-2 text-secondary" />
              <div>
                <div>
                  <strong>0</strong> comparse nei motori di ricerca
                </div>
                <small className="text-muted">
                  Vedi quante volte compari nei risultati di ricerca.
                </small>
              </div>
            </div>
          </Col>
        </Row>
        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">
            Mostra tutte le analisi <ArrowRight></ArrowRight>
          </a>
        </div>
      </Card.Body>
    </Card>
  )
}

export default AnalisiSection
