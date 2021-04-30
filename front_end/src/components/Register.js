import {Jumbotron} from "react-bootstrap";
import RegistrationForm from './RegistrationForm';
import {useEffect, useState} from 'react';

const Register = () => {

  const [genders, setGenders] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [user, setUser] = useState({
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    userAge: '',
    e_mail: '',
    gender: '',
  });

  console.log(user);
  const updateUser = (prop, value) => {
    setUser({
      ...user,
      [prop]: value,
    });
  }
  

  useEffect(() => {
      fetch(`http://localhost:5555/genders`,
      { method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => setGenders(data));
     // .catch((error) => setError(error.message))
     // .finally(() => setLoading(false));
  }, []);

  if(genders === null) return <div>Loading...</div>

  return(
    <div className="registration-page-bg-info">
      <Jumbotron className="form-box">
        <RegistrationForm genders = {genders} updateUser={updateUser} user={user}/>
      </Jumbotron>
    </div>
  )
};

export default Register;
