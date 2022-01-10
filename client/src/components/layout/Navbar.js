import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  NavbarToggler,
} from "reactstrap";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
const Header = ({ auth, logout }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const AuthLinks = (
    <Fragment>
      <NavItem>
        <NavLink href="/profiles">Developers</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/posts">Posts</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/dashboard">
          {" "}
          <span>
            <i className="fas fa-user"></i>
          </span>{" "}
          Dashboard{" "}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={() => logout()}>
          {" "}
          <span>
            <i className="fas fa-sign-out-alt"></i>
          </span>{" "}
          Logout{" "}
        </NavLink>
      </NavItem>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <NavItem>
        <NavLink href="/profiles">Developers </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/register">Register</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/login">Login</NavLink>
      </NavItem>
    </Fragment>
  );
  return (
    <Navbar color="dark" expand="md" dark>
      <NavbarBrand href="/">
        <i className="fas fa-code"></i> DevConnector
      </NavbarBrand>
      <NavbarToggler onClick={() => setIsNavOpen(!isNavOpen)} />
      <Collapse isOpen={isNavOpen} navbar>
        <Nav className="me-auto" navbar>
          {!auth.isLoading && (
            <Fragment>{auth.isAuthenticated ? AuthLinks : guestLinks}</Fragment>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Header);
