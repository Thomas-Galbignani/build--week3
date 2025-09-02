import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Hero from "./assets/components/hero";
import "./App.css";
import LinkedInNavbar from "./assets/components/LinkedInNavbar"
import LinkedInFooter from "./assets/components/LinkedInFooter"
import Activity from './assets/components/Activity.jsx';
import Experience from './assets/components/Experience.jsx';
import Education from './assets/components/Education.jsx';
import Certifications from './assets/components/Certifications.jsx';
import Skills from './assets/components/Skills.jsx';
import Languages from './assets/components/Languages.jsx';
import Interests from './assets/components/Interests.jsx';
import AnalisiSection from './assets/components/AnalisiSection.jsx'
import InformazioniSection from "./assets/components/InformazioniSection.jsx"

function App() {
  return (
    <Container>
      <LinkedInNavbar  />
      <Row>
        <Col sm={12} md={8} >
          <Hero />
          <div><AnalisiSection/></div>
          <div><InformazioniSection/></div>
          <div className="mb-5"><Activity /></div>
          <div className="mb-5"><Experience /></div>
          <div className="mb-5"><Education /></div>
          <div className="mb-5"><Certifications /></div>
          <div className="mb-5"><Skills /></div>
          <div className="mb-5"><Languages /></div>
          <div className="mb-5"><Interests /></div>
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
