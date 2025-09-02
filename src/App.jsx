import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Hero from "./assets/components/hero";
import "./App.css";

function App() {
    return (
        <Container>
            <Row>
                <Col xs={9}>
                    <Hero />
                </Col>
                <Col xs={3}>
                    <Sidebar />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
