import { connect } from "react-redux";
import Moment from "react-moment";
import React, { Fragment, useEffect } from "react";
import { Button, Container, Table } from "reactstrap";
import {
  getCurrentUserProfile,
  deleteEducation,
  deleteAccount,
  deleteExperience,
} from "../../actions/profile";
import PropTypes from "prop-types";
import Spiner from "../layout/Spiner";
const DeshBoard = ({
  getCurrentUserProfile,
  auth,
  profile,
  deleteExperience,
  deleteEducation,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  const expericences =
    profile.profile &&
    profile.profile.experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>-{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <Button color="danger" onClick={() => deleteExperience(exp._id)}>
            Delete
          </Button>
        </td>
      </tr>
    ));

  const education =
    profile.profile &&
    profile.profile.education.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.school}</td>
        <td>{exp.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>-{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <Button color="danger" onClick={() => deleteEducation(exp._id)}>
            Delete
          </Button>
        </td>
      </tr>
    ));
  return profile.loading && profile.profile === null ? (
    <Spiner />
  ) : (
    <Container>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {auth.user && auth.user.name}
      </p>
      {profile.profile != null ? (
        <Fragment>
          <div className="dash-Buttons">
            <Button href="/edit-profile" color="light">
              <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Button>
            <Button href="/add-experince" color="light">
              <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Button>
            <Button href="/add-education" color="light">
              <i className="fas fa-graduation-cap text-primary"></i> Add
              Education
            </Button>
          </div>

          <h2 className="my-2">Experience Credentials</h2>
          {profile.profile && profile.profile.experience.length > 0 ? (
            <Table hover>
              <thead>
                <tr>
                  <th>Company</th>
                  <th className="hide-sm">Title</th>
                  <th className="hide-sm">Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{expericences}</tbody>
            </Table>
          ) : (
            <div className="m-3">
              No expericence fond please add some expericences using add
              experience button above
            </div>
          )}

          <h2 className="my-2">Education Credentials</h2>
          {profile.profile && profile.profile.education.length > 0 ? (
            <Table hover>
              <thead>
                <tr>
                  <th>School</th>
                  <th className="hide-sm">Degree</th>
                  <th className="hide-sm">Years</th>
                  <th />
                </tr>
              </thead>
              <tbody>{education}</tbody>
            </Table>
          ) : (
            <div className="m-3">
              No education fond please add some educaion using add experience
              button above
            </div>
          )}

          <div className="my-2">
            <Button color="danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </Button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Button href="/create-profile" color="light">
            Create your profile
          </Button>
        </Fragment>
      )}
    </Container>
  );
};

DeshBoard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getCurrentUserProfile,
  deleteExperience,
  deleteEducation,
  deleteAccount,
})(DeshBoard);
