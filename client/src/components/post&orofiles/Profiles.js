import React, { Fragment, useEffect } from "react";
import { Button, Container } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spiner from "../layout/Spiner";
import { UserProfiles } from "../../actions/profile";
const Profiles = ({ UserProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    UserProfiles();
  }, [UserProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spiner />
      ) : (
        <Container>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          {profiles &&
            profiles.map((prf) => (
              <Fragment key={prf._id}>
                <div className="profile bg-light">
                  <img className="round-img" src="/prfile.jpg" alt="" />

                  <div>
                    <h2>{prf.user && prf.user.name}</h2>
                    <p>{prf.bio}</p>
                    <p>{prf.location}</p>
                    <Button
                      href={`/profile/${prf.user && prf.user._id}`}
                      color="primary"
                    >
                      View Profile
                    </Button>
                  </div>

                  <ul>
                    {prf.skills.map((skill) => (
                      <li key={skill} className="text-primary">
                        <i className="fas fa-check"></i> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Fragment>
            ))}
        </Container>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  UserProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { UserProfiles })(Profiles);
