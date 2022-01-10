import React, { Fragment, useEffect } from "react";
import { Badge, Button, Container } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { UserProfileById } from "../../actions/profile";
import Spiner from "../layout/Spiner";
import Moment from "react-moment";
import { useParams } from "react-router";
const Profile = ({ UserProfileById, profile: { profile, loading }, auth }) => {
  let params = useParams();
  useEffect(() => {
    UserProfileById(params);
  }, [params, UserProfileById]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spiner />
      ) : (
        <Container>
          <Button href="/profiles" color="light">
            Back To Profiles
          </Button>
          {auth.isAuthenticated &&
            auth.isLoading === false &&
            auth.user._id === profile.user._id && (
              <Button href="/edit-profile" color="gray">
                Edit Profile
              </Button>
            )}
          <div className="profile-grid my-1">
            {/* <!-- Top --> */}
            <div className="profile-top bg-primary p-2">
              <img className="round-img my-1" src="/prfile.jpg" alt="" />
              <h1 className="large">{profile && profile.user.name}</h1>
              <p className="lead">{profile.bio}</p>
              <p>{profile.location}</p>
              <div className="icons my-1">
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-globe fa-2x"></i>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
                <a href="youtube.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube fa-2x"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              </div>
            </div>

            {/* <!-- About --> */}
            <div className="profile-about bg-light p-2">
              <h2 className="text-primary">{profile.user.name}</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                doloremque nesciunt, repellendus nostrum deleniti recusandae
                nobis neque modi perspiciatis similique?
              </p>
              <div className="line"></div>
              <h2 className="text-primary">Skill Set</h2>
              <div className="skills">
                {profile.skills.map((skill, index) => (
                  <div className="p-1" key={skill}>
                    <i className="fa fa-check"></i> {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* <!-- Experience --> */}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.map((exp) => (
                <div key={exp._id}>
                  <h3 className="text-dark">{exp.company}</h3>
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment>-{" "}
                  {exp.to === null ? (
                    "Now"
                  ) : (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                  )}
                  <p>
                    <strong>Position: </strong>
                    {exp.title}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            {/* <!-- Education --> */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                profile.education.map((ed, index) => (
                  <div key={index}>
                    <h3>{ed.school}</h3>
                    <p>
                      <Moment format="YYYY/MM/DD">{ed.from}</Moment>-{" "}
                      {ed.to === null ? (
                        "Now"
                      ) : (
                        <Moment format="YYYY/MM/DD">{ed.to}</Moment>
                      )}
                    </p>
                    <p>
                      <strong>Degree: </strong>
                      {ed.degree}
                    </p>
                    <p>
                      <strong>Field Of Study: </strong>
                      {ed.fieldofstudy}
                    </p>
                    <p>
                      <strong>Description: </strong>
                      {ed.description}
                    </p>
                  </div>
                ))
              ) : (
                <div>No educaion find please add some education</div>
              )}
            </div>

            {/* <!-- Github --> */}
            <div className="profile-github">
              <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
              </h2>
              <div className="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Repo One
                    </a>
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                  </p>
                </div>
                <div>
                  <ul>
                    <Badge color="primary">Stars: 44</Badge>
                    <Badge color="dark">Watchers: 21</Badge>
                    <Badge color="light">Forks: 25</Badge>
                  </ul>
                </div>
              </div>
              <div className="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a
                      href="http://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Repo Two
                    </a>
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                  </p>
                </div>
                <div>
                  <Badge color="primary">Stars: 44</Badge>
                  <Badge color="dark">Watchers: 21</Badge>
                  <Badge color="light">Forks: 25</Badge>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  UserProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { UserProfileById })(Profile);
