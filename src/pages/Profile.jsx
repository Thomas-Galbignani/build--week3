import { Container, Row, Col } from "react-bootstrap"
import Sidebar from "../components/Sidebar"
import Hero from "../assets/components/hero"
import Activity from "../assets/components/Activity.jsx"
import Experience from "../assets/components/Experience.jsx"
import Education from "../assets/components/Education.jsx"
import Certifications from "../assets/components/Certifications.jsx"
import Skills from "../assets/components/Skills.jsx"
import Languages from "../assets/components/Languages.jsx"
import Interests from "../assets/components/Interests.jsx"
import AnalisiSection from "../assets/components/AnalisiSection.jsx"
import InformazioniSection from "../assets/components/InformazioniSection.jsx"

export default function Profile({ token, selectedProfile }) {
  return (
    <Container>
      <Row>
        <Col sm={12} md={8}>
          <Hero token={token} profile={selectedProfile} />
          <div>
            <AnalisiSection />
          </div>
          <div>
            <InformazioniSection token={token} profile={selectedProfile} />
          </div>
          <div className="mb-5">
            <Activity />
          </div>
          <div className="mb-5">
            <Experience profileId={selectedProfile?._id || null} />
          </div>
          <div className="mb-5">
            <Education />
          </div>
          <div className="mb-5">
            <Certifications />
          </div>
          <div className="mb-5">
            <Skills />
          </div>
          <div className="mb-5">
            <Languages />
          </div>
          <div className="mb-5">
            <Interests />
          </div>
        </Col>
        <Col sm={{ ClassName: "d-none" }} md={4}>
          <Sidebar />
        </Col>
      </Row>
    </Container>
  )
}
