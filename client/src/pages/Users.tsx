import { useEffect, useState, useCallback } from "react";
import { HOST } from "src/common/constants";
import Loader from "src/components/Loader";
import { Container, Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Search from "src/components/Search";
import { ListedUser } from "src/types";

const Users: React.FC = () => {
  const [users, setUsers] = useState<ListedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

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
      const result: ListedUser[] = await response.json();
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

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`${HOST}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
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
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
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
    <Container className="my-5">
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
