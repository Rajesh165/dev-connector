import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Container, Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, auth }) => {
  const naviget = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  if (auth) naviget("/dashboard");
  return (
    <Container>
      {/* <div className="alert alert-danger">Invalid credentials</div> */}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <Form onSubmit={(e) => onsubmit(e)}>
        <FormGroup row className="justify-content-md-center">
          <Input
            onChange={(e) => onchange(e)}
            value={email}
            type="email"
            placeholder="Email Address"
            name="email"
          />
        </FormGroup>
        <FormGroup row className="justify-content-md-center">
          <Input
            onChange={(e) => onchange(e)}
            value={password}
            type="password"
            placeholder="Password"
            name="password"
          />
        </FormGroup>
        <FormGroup row className="justify-content-md-center">
          <Button type="submit" color="primary">
            Login
          </Button>
        </FormGroup>
      </Form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Container>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
