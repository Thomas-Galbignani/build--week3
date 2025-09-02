import { Container, Row } from "react-bootstrap";
import PeopleYouMayKnow from "./PeopleYouMayKnow";
import OtherProfiles from "./OtherProfiles";
import YouCouldLike from "./YouCouldLike";

const Sidebar = () => {
    return (
        <Container>
            <Row className="gy-2">
                <OtherProfiles />
                <PeopleYouMayKnow />
                <YouCouldLike />
            </Row>
        </Container>
    );
};

export default Sidebar;
