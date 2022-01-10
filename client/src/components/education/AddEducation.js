import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const navigate = useNavigate();

  const [toDateDisbled, toggleDisabled] = useState(false);
  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;
  return (
    <Container>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, navigate);
        }}
      >
        <FormGroup>
          <Input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={(e) => onchange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={(e) => onchange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e) => onchange(e)}
          />
        </FormGroup>
        <FormGroup>
          <h4>From Date</h4>
          <Input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onchange(e)}
          />
        </FormGroup>
        <FormGroup>
          <p>
            <Input
              type="checkbox"
              name="current"
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisbled);
              }}
            />{" "}
            Current School or Bootcamp
          </p>
        </FormGroup>
        <FormGroup>
          <h4>To Date</h4>
          <Input
            type="date"
            name="to"
            disabled={toDateDisbled ? "disbled" : ""}
            value={to}
            onChange={(e) => onchange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="description"
            cols="30"
            rows="5"
            type="textarea"
            placeholder="Program Description"
            value={description}
            onChange={(e) => onchange(e)}
          />
        </FormGroup>
        <Button color="primary" type="submit" className=" my-1" value="submit">
          Submit
        </Button>
        <Button color="primary" className="my-1" href="/dashboard">
          Go Back
        </Button>
      </Form>
    </Container>
  );
};
addEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};
export default connect(null, { addEducation })(AddEducation);
