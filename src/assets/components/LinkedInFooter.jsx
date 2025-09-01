import { Container, Row, Col, Form } from "react-bootstrap";
import {
  BsQuestionCircleFill,
  BsGearFill,
  BsShieldShaded,
} from "react-icons/bs";

export default function LinkedInFooter() {
  return (
    <footer className="linkedin-footer py-4 mt-5 border-top">
      <Container>
        <Row className="gy-4">
          {/* Colonna sinistra */}
          <Col xs={12} lg={8}>
            <Row>
              <Col xs={12} md={4}>
                <ul className="list-unstyled small">
                  <li>
                    <a href="#">Informazioni</a>
                  </li>
                  <li>
                    <a href="#">Informativa sulla community professionale</a>
                  </li>
                  <li>
                    <a href="#">Privacy e condizioni</a>
                  </li>
                  <li>
                    <a href="#">Sales Solutions</a>
                  </li>
                  <li>
                    <a href="#">Centro sicurezza</a>
                  </li>
                </ul>
              </Col>
              <Col xs={12} md={4}>
                <ul className="list-unstyled small">
                  <li>
                    <a href="#">Accessibilità</a>
                  </li>
                  <li>
                    <a href="#">Carriera</a>
                  </li>
                  <li>
                    <a href="#">Opzioni per gli annunci pubblicitari</a>
                  </li>
                  <li>
                    <a href="#">Mobile</a>
                  </li>
                </ul>
              </Col>
              <Col xs={12} md={4}>
                <ul className="list-unstyled small">
                  <li>
                    <a href="#">Talent Solutions</a>
                  </li>
                  <li>
                    <a href="#">Soluzioni di marketing</a>
                  </li>
                  <li>
                    <a href="#">Pubblicità</a>
                  </li>
                  <li>
                    <a href="#">Piccole imprese</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Colonna destra */}
          <Col xs={12} lg={4} className="small">
            <div className="d-flex align-items-start gap-2 mb-3">
              <BsQuestionCircleFill className="text-secondary fs-5" />
              <div>
                <strong>Domande?</strong>
                <br />
                <a href="#">Visita il nostro Centro assistenza</a>
              </div>
            </div>
            <div className="d-flex align-items-start gap-2 mb-3">
              <BsGearFill className="text-secondary fs-5" />
              <div>
                <strong>Gestisci il tuo account e la tua privacy</strong>
                <br />
                <a href="#">Vai alle impostazioni</a>
              </div>
            </div>
            <div className="d-flex align-items-start gap-2 mb-3">
              <BsShieldShaded className="text-secondary fs-5" />
              <div>
                <strong>Trasparenza sui contenuti consigliati</strong>
                <br />
                Scopri di più sui contenuti consigliati.
              </div>
            </div>

            <Form.Select size="sm" className="mt-2">
              <option>Italiano (Italiano)</option>
              <option>English</option>
              <option>Deutsch</option>
              <option>Español</option>
            </Form.Select>
          </Col>
        </Row>

        <div className="mt-4 small text-muted">LinkedIn Corporation © 2025</div>
      </Container>

      <style>{`
        .linkedin-footer a {
          text-decoration: none;
          color: #6c757d;
        }
        .linkedin-footer a:hover {
          text-decoration: underline;
          color: #0a66c2;
        }
      `}</style>
    </footer>
  );
}
