import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
    return (
        <Container>
            <Row>
                <Col xs={9}>Content Principale</Col>
                <Col xs={3}>
                    <Sidebar />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
