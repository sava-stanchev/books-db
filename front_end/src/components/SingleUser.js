import {useEffect, useState} from 'react';
import {Jumbotron} from "react-bootstrap";
import {Col, Container, Row, Form} from "react-bootstrap";
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
    .then(()=>setLoading(false))
    .catch((error) => setError(error.message))
  }, [userId]);

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  return(
    loading ?
      <div className="Loader"></div>
    :
    <>
      {showError()}
      <Row>
        <Col>
          <div className="user-page-bg-info">
            <Jumbotron className="form-box-profile">
              <Container>
                <Row>
                  <Col>
                    <h1>{user.user_name}'s Info</h1>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label><b>Username:</b> <i>{user.user_name}</i></Form.Label>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label><b>First Name:</b> <i>{user.first_name}</i></Form.Label>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label><b>Last Name:</b> <i>{user.last_name}</i></Form.Label>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label><b>Email Address:</b> <i>{user.e_mail}</i></Form.Label>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label><b>Age:</b> <i>{user.user_age}</i></Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label><b>Gender:</b> <i>{user.gender}</i></Form.Label>
                        </Form.Group>
                      </Form.Row>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </div>
        </Col>
        <Col>
          <SingleUserReviews userId={userId} />
        </Col>
      </Row>
    </>
  )
};

export default SingleUser;
