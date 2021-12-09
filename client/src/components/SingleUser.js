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
              <b>Username:</b> <i>{user.username}</i>
            </div>
            <div style={{marginBottom: '5px'}}>
              <b>First Name:</b> <i>{user.first_name}</i>
            </div>
            <div style={{marginBottom: '5px'}}>
              <b>Last Name:</b> <i>{user.last_name}</i>
            </div>
            <div style={{marginBottom: '5px'}}>
              <b>Email Address:</b> <i>{user.email}</i>
            </div>
            <div style={{marginBottom: '5px'}}>
              <b>Age:</b> <i>{user.user_age}</i>
            </div>
            <div>
              <b>Gender:</b> <i>{user.gender}</i>
            </div>
        </div>
      </div>
      <SingleUserReviews userId={userId} />
    </>
  )
};

export default SingleUser;
