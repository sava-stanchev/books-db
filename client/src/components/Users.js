import { useEffect, useState } from "react";
import { HOST } from "../common/constants.js";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import {
  Col,
  Row,
  Button,
  InputGroup,
  Form,
  Container,
  Table,
} from "react-bootstrap";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${HOST}/users`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .then(() => setLoading(false))
      .catch(() => navigate("/500"));
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => {
        return user.username.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, users]);

  let foundUsers = filteredUsers;

  const deleteUser = (id) => {
    fetch(`${HOST}/users/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(() => setUsers(users.filter((u) => u.id !== id)))
      .catch(() => navigate("/500"));
  };

  const displayUsers = foundUsers.map((user, idx) => {
    return (
      <tr key={idx}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          <Button variant="danger" onClick={() => deleteUser(user.id)}>
            Delete
          </Button>
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
          <tbody>{displayUsers}</tbody>
        </Table>
      )}
    </Container>
  );
};

export default Users;
