import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Hero from "./assets/components/hero";
import "./App.css";
import LinkedInNavbar from "./assets/components/LinkedInNavbar";
import LinkedInFooter from "./assets/components/LinkedInFooter";
import Activity from "./assets/components/Activity.jsx";
import Experience from "./assets/components/Experience.jsx";
import Education from "./assets/components/Education.jsx";
import Certifications from "./assets/components/Certifications.jsx";
import Skills from "./assets/components/Skills.jsx";
import Languages from "./assets/components/Languages.jsx";
import Interests from "./assets/components/Interests.jsx";
import AnalisiSection from "./assets/components/AnalisiSection.jsx";
import InformazioniSection from "./assets/components/InformazioniSection.jsx";
import { useState } from "react";

function App() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1YTY3YTE2MjdjNjAwMTVmOGM1NmQiLCJpYXQiOjE3NTY3MzUxMDksImV4cCI6MTc1Nzk0NDcwOX0.gG2pebnNJtBCq0sb9BDZTkubFARrTjYyvZOoaZigMLg";
  const [selectedProfile, setSelectedProfile] = useState(null);
  // Uso questo stato per memorizzare il profilo scelto
  return (
    <Container>
      <LinkedInNavbar
        token={token}
        onSelectProfile={(p) => setSelectedProfile(p)}
      />
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
            <Experience />
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
      <LinkedInFooter />
    </Container>
  );
}

export default App;
