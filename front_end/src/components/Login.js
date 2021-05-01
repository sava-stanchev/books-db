import {Jumbotron} from "react-bootstrap";
import LoginForm from './LoginForm';
import { useContext, useState } from 'react';
import {useHistory} from "react-router-dom";
import AuthContext from '../providers/authContext';
import decode from 'jwt-decode';
import { propTypes } from 'react-bootstrap/esm/Image';

const Login = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({
    user_name: '',
    password: '',
  });

  console.log(user);
  const updateUser = (prop, value) => {
    setUser({
      ...user,
      [prop]: value,
    });
  };

  
  const routeChange = () =>{ 
    const path = `/books`; 
    history.push(path);
  };
  console.log(history);

  const login = () => {
    fetch('http://localhost:5555/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(({ token }) => {
      try {
        const user = decode(token);
        localStorage.setItem('token', token);
        auth.setAuthState({user, isLoggedIn: true});
      } catch (error) {
        console.warn(error);
      }
    })
    .then(
      fetch('http://localhost:5555/addToken', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }))
    .then(() =>routeChange())
    .catch(console.warn);    
  }


  return(
    <div className="login-page-bg-info">
      <Jumbotron className="form-box">
        <LoginForm user={user} updateUser={updateUser} login={login}/>
      </Jumbotron>
    </div>
  )
};

export default Login;
