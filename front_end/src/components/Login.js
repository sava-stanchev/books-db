import {Jumbotron} from "react-bootstrap";
import LoginForm from './LoginForm';

const Login = () => {

  return(
    <div className="login-page-bg-info">
      <Jumbotron className="form-box">
        <LoginForm />
      </Jumbotron>
    </div>
  )
};

export default Login;
