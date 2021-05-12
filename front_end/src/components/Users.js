import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {Col, Row, Button, Table} from 'react-bootstrap';
import { BAN_DAYS, HOST } from '../common/constants.js';


// трябва да се виждат всички потребители
const Users = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${HOST}/users`, {
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

  const updateUser = (i, userId, prop, value)=> {
    let user = {...users[i], [prop]: value}

    fetch(`${HOST}/users/${userId}/update`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => users[i] = data)
    .then(()=> setLoading(false))
    .catch((error) => setError(error.message));
    users[i]=user;
    const updatedUsers = [...users];
    setUsers(updatedUsers);

  };

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
            {/* <th>Edit</th> */}
          </tr>
        </thead>
        <tbody>
          {
          users.map((u, i) => {
            
              return (
                <>
                    <tr>
                      <td>{u.users_id}</td>
                      <td>{u.user_name}</td>
                      <td>{u.first_name}</td>
                      <td>{u.last_name}</td>
                      <td>{u.e_mail}</td>
                      <td>{u.user_age ? u.user_age : <p>-</p>}
                      </td>
                      <td>{u.is_deleted
                            ?<Button variant="warning" onClick={() =>updateUser(i, u.users_id, 'is_deleted', 0)}>
                                Return user!
                            </Button>
                            :<Button variant="danger" onClick={() => updateUser(i, u.users_id, 'is_deleted', 1)}>
                                Delete!
                            </Button>}
                      </td>
                      <td>{u.ban_date
                          ? 
                          <>
                            <>{new Date(u.ban_date).toLocaleDateString()}</><br/>
                            <Button variant="primary" onClick={() => updateUser(i, u.users_id, 'ban_date', null)}>
                              Unban user!
                            </Button>
                          </>
                          :
                          <Button variant="primary" onClick={() => updateUser(i, u.users_id, 'ban_date', new Date(new Date().getTime() + BAN_DAYS))}>
                            Ban user!
                          </Button>}
                      </td>
                      {/* <td>
                          <Button variant="primary" onClick={() => console.log('Edit')}>
                            Edit!
                          </Button>
                      </td> */}
                    </tr>
              </>
            )
            
          })
          }
          
        </tbody>
      </Table>
    </p>

)

};


export default Users;
