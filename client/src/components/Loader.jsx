import { Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <Row className="d-flex justify-content-center m-4">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Row>
  );
}

export default Loader;
