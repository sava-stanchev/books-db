import {Jumbotron} from "react-bootstrap";
import LoginForm from './LoginForm';
import { useContext, useState } from 'react';
import {useHistory} from "react-router-dom";
import AuthContext from '../providers/authContext';
import decode from 'jwt-decode';
import { HOST } from '../common/constants.js';

const Login = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({
    user_name: '',
    password: '',
  });

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

  const login = () => {
    fetch(`${HOST}/login`, {
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
        window.alert('Invalid username or password!')
      }
    })
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
