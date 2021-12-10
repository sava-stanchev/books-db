import {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import SingleUserReviews from './SingleUserReviews';
import { HOST } from '../common/constants.js';

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = jwtDecode(localStorage.getItem('token')).users_id;
  
  useEffect(() => {
    fetch(`${HOST}/users/${userId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },    
    })
    .then(res => res.json())
    .then(data => setUser(data))
    .then(() => setLoading(false))
    .catch((error) => setError(error.message))
  }, [userId]);

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  return(
    loading 
    ?
      <div className="Loader"></div>
    :
    <>
      {showError()}
      <div className="user-page-bg-info">
        <div className="form-box-profile">
            <div className="user-info-title">
              <h1>{user.username}'s Info</h1>
            </div>
            <div style={{marginBottom: '5px'}}>
              <b>Username:</b> {user.username}
            </div>
            <div style={{marginBottom: '5px'}}>
              <b>First Name:</b> {user.first_name}
            </div>
            <div style={{marginBottom: '5px'}}>
              <b>Last Name:</b> {user.last_name}
            </div>
            <div style={{marginBottom: '5px'}}>
              <b>Email Address:</b> {user.email}
            </div>
            <div style={{marginBottom: '5px'}}>
              <b>Age:</b> {user.user_age}
            </div>
            <div>
              <b>Gender:</b> {user.gender.toLowerCase()}
            </div>
        </div>
      </div>
      <SingleUserReviews userId={userId} />
    </>
  )
};

export default SingleUser;
