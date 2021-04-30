import {Jumbotron} from "react-bootstrap";
import RegistrationForm from './RegistrationForm';
import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const routeChange = () =>{ 
    const path = `/login`; 
    history.push(path);
  };

  const [genders, setGenders] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`http://localhost:5555/genders`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => setGenders(data));
   // .catch((error) => setError(error.message))
   // .finally(() => setLoading(false));
  }, []);

  const [user, setUser] = useState({
    user_name: '',
    password: '',
    first_name: '',
    last_name: '',
    user_age: '',
    e_mail: '',
    gender: '',
  });
  
  console.log(user);
  const updateUser = (prop, value) => {
    setUser({
      ...user,
      [prop]: value,
    });
  };
  
  const register = () => {
    fetch('http://localhost:5555/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then((res) => {
      try {
        console.log({res});
      } catch (error) {
        console.warn(error);
      }
    })
    .then(()=>routeChange());
  };

  if(genders === null) return <div>Loading...</div>

  return(
    <div className="registration-page-bg-info">
      <Jumbotron className="form-box">
        <RegistrationForm genders = {genders} updateUser={updateUser} user={user} register={register}/>
      </Jumbotron>
    </div>
  )
};

export default Register;
