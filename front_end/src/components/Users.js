import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {Col, Row, Button, Table} from 'react-bootstrap';


const Users = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(loading);
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5555/users', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },    
    })
    .then(res => res.json())
    .then(data => setUsers(data))
    .then(()=> setLoading(false))
    .catch((error) => setError(error.message))
  }, []);

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }
  return(
    loading?
    <>
    <p>Hi</p>
    </>
    :    
    <p>
      <div>
        {showError()}
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Age</th>
            <th>Delete</th>
            <th>Is Banned</th>
          </tr>
        </thead>
        <tbody>
          {
          users.map(u => {
            return (
              <>
                <tr>
                  <td>{u.users_id}</td>
                  <td>{u.user_name}</td>
                  <td>{u.first_name}</td>
                  <td>{u.last_name}</td>
                  <td>{u.e_mail}</td>
                  <td>{u.user_age}</td>
                  <td>{u.is_deleted}</td>
                  <td>{u.ban_date?u.ban_date:
                      <Button variant="primary" onClick={() => console.log('Hi')}>
                        Ban user!
                      </Button>}
                  </td>
                </tr>
            </>
            )
          })
          }
          
        </tbody>
      </Table>
      <div>
        <p> Users </p>
      </div>
    </p>

)

};


export default Users;
