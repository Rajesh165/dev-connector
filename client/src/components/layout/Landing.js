import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Landing = ({ auth: { isAuthenticated, isLoading } }) => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          {!isLoading && isAuthenticated ? (
            <div></div>
          ) : (
            <div className="buttons">
              <a href="/register" className="btn btn-primary">
                Sign Up
              </a>
              <a href="/login" className="btn btn-light">
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Landing);
