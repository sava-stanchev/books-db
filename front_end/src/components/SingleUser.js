import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {Col, Row, Button} from "react-bootstrap";

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect = (() => {
  //   fetch('http://localhost:5555/users', {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       'authorization': `bearer ${localStorage.getItem('token')}`
  //     },    
  //   })
  //   .then(res => res.json())
  //   .then(data => setUsers(data))
  //   .catch((error) => setError(error.message))
  // }, []);

  const Loader = () => <div className="Loader"></div>;

  const showLoader = () => {
    if (loading) {
      return <Loader />
    }
  }

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  return(
    <>
      <div>
        {showError()}
        {showLoader()}
      </div>
      <div>
        <p> User </p>
      </div>
    </>
  )

};


export default SingleUser;
