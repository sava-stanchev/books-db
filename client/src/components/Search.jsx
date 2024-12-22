import { useEffect, useState } from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";

const Search = ({ search, onSearchChange }) => {
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearchChange(searchInput);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, onSearchChange]);

  return (
    <Row className="justify-content-center my-4">
      <Col md={4} xs={8}>
        <Form>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </InputGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default Search;
