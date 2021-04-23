import {Jumbotron} from "react-bootstrap";
import RegistrationForm from './RegistrationForm';

const Register = () => {

  return(
    <div className="registration-page-bg-info">
      <Jumbotron className="form-box">
        <RegistrationForm />
      </Jumbotron>
    </div>
  )
};

export default Register;
