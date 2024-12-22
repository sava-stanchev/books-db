import { useEffect, useState, useCallback } from "react";
import { HOST } from "src/common/constants";
import Loader from "src/components/Loader";
import { Container, Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import renderTooltip from "src/components/Tooltip";
import Search from "src/components/Search";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const fetchUsers = useCallback(async () => {
    const usersRequest = new Request(`${HOST}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });

    try {
      const response = await fetch(usersRequest);
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${HOST}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`);
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const renderUsers = () =>
    filteredUsers.map((user) => (
      <tr key={user.id}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          <OverlayTrigger placement="top" overlay={renderTooltip("Delete")}>
            <button
              type="button"
              className="icon delete-icon"
              onClick={() => handleDeleteUser(user.id)}
              aria-label="Delete user"
            >
              <FaTrashAlt />
            </button>
          </OverlayTrigger>
        </td>
      </tr>
    ));

  return (
    <Container>
      <Search search={search} onSearchChange={handleSearchChange} />
      {loading ? (
        <Loader />
      ) : (
        <Table striped responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </Table>
      )}
    </Container>
  );
};

export default Users;
