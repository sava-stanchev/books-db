import { useState } from "react";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import {Jumbotron} from "react-bootstrap";
import RegistrationForm from './RegistrationForm';

const Register = () => {
    const {state, setState} = useState();

    return(
        <div className="registration-page-bg-info">
            <Jumbotron className="form-box">
                <RegistrationForm />
            </Jumbotron>
        </div>
    )
};

export default Register;
