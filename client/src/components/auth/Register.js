import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Register = ({ setAlert, register, auth }) => {
  const naviget = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    if (password !== password2) setAlert("password does not match", "danger");
    else register({ name, email, password });
  };
  if (auth) naviget("/dashboard");
  return (
    <Container className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <Form className="form" onSubmit={(e) => onsubmit(e)}>
        <FormGroup row className="justify-content-md-center">
          <Col md={8}>
            <Input
              onChange={(e) => onchange(e)}
              value={name}
              type="text"
              placeholder="Name"
              name="name"
            />
          </Col>
        </FormGroup>
        <FormGroup row className="justify-content-md-center">
          <Col md={8}>
            <Input
              onChange={(e) => onchange(e)}
              value={email}
              type="email"
              placeholder="Email Address"
              name="email"
            />
            <FormText>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row className="justify-content-md-center">
          <Col md={8}>
            <Input
              onChange={(e) => onchange(e)}
              value={password}
              type="password"
              placeholder="Password"
              name="password"
            />
          </Col>
        </FormGroup>
        <FormGroup row className="justify-content-md-center">
          <Col md={8}>
            <Input
              onChange={(e) => onchange(e)}
              value={password2}
              type="password"
              placeholder="Confirm Password"
              name="password2"
            />
          </Col>
        </FormGroup>
        <FormGroup row className="justify-content-md-center">
          <Col md={8}>
            <Button type="submit" color="primary">
              Register
            </Button>
          </Col>
        </FormGroup>
      </Form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Container>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
