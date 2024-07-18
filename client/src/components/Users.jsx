import { useEffect, useState } from "react";
import { HOST } from "src/common/constants";
import Loader from "src/components/Loader";
import { Col, Row, InputGroup, Form, Container, Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import renderTooltip from "src/components/Tooltip";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    get(usersRequest);
  }, []);

  async function get(request) {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        const result = await response.json();
        setUsers(result);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const usersRequest = new Request(`${HOST}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => {
        return user.username.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, users]);

  let foundUsers = filteredUsers;

  async function deleteUserRequest(userId) {
    try {
      const response = await fetch(`${HOST}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        setUsers(foundUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const usersRender = foundUsers.map((user, idx) => {
    return (
      <tr key={idx}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          <OverlayTrigger placement="top" overlay={renderTooltip}>
            <button
              className="delete-icon"
              type="button"
              onClick={() => deleteUserRequest(user.id)}
            >
              <FaTrashAlt />
            </button>
          </OverlayTrigger>
        </td>
      </tr>
    );
  });

  return (
    <Container>
      <Row className="d-flex justify-content-center m-4">
        <Col className="col-md-4 col-8">
          <Form>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Form>
        </Col>
      </Row>
      {loading && <Loader />}
      {!loading && (
        <Table striped responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{usersRender}</tbody>
        </Table>
      )}
    </Container>
  );
};

export default Users;
