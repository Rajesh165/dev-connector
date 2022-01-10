import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profile";
const AddExperince = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const navigate = useNavigate();

  const [toDateDisbled, toggleDisabled] = useState(false);
  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { company, title, location, from, to, current, description } = formData;
  return (
    <Container>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, navigate);
        }}
      >
        <FormGroup>
          <Input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={(e) => onchange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => onchange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
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
            Current Job
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
            type="textarea"
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) => onchange(e)}
          />
        </FormGroup>
        <Button type="submit" className="my-1">
          Submit
        </Button>
        <Button color="primary" className="my-1" href="/dashboard">
          Go Back
        </Button>
      </Form>
    </Container>
  );
};
AddExperince.propTypes = {
  addExperience: PropTypes.func.isRequired,
};
export default connect(null, { addExperience })(AddExperince);
