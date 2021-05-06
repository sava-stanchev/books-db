import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {Col, Container, Row, Form, Button} from "react-bootstrap";
import jwtDecode from 'jwt-decode';

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = jwtDecode(localStorage.getItem('token')).users_id;
  console.log('userId');
  console.log(userId);
  
  useEffect(() => {
    setLoading(true);
    console.log('Hi');
    fetch(`http://localhost:5555/users/${userId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },    
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(()=>setLoading(false))
    .catch((error) => setError(error.message))
  }, [userId]);

  console.log(user);
  
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
      <p>Hi {user.user_name}</p>
      {/* <Container>
      <Row>
        <Col>
          <h1>{user.user_name}`s info</h1>
        </Col>
      </Row>
      <br/>

      <Row>
        <Col>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Username: {user.user_name}</Form.Label>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>First Name: {user.first_name}</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name: {user.last_name}</Form.Label>
              </Form.Group>
            </Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email address: {user.e_mail}</Form.Label>
              </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Age: {user.user_age}</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Gender: {user.gender}</Form.Label>
              </Form.Group>
            </Form.Row>
            
          </Form>
        </Col>
      </Row>
    </Container> */}

    </>
  )

};


export default SingleUser;
