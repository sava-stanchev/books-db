import {Jumbotron} from "react-bootstrap";
import RegistrationForm from './RegistrationForm';
import {useEffect, useState} from 'react';
import { HOST } from '../common/constants.js';

const Register = () => {
  const [genders, setGenders] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`${HOST}/genders`, {
      method: 'GET',
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
        <RegistrationForm genders = {genders} />
      </Jumbotron>
    </div>
  )
};

export default Register;
