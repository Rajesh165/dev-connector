import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import { getCurrentUserProfile } from "../../actions/profile";
const EditProfile = ({
  createProfile,
  profile: { profile, loading },
  getCurrentUserProfile,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedIn: "",
    youtube: "",
    instagram: "",
  });
  const [displaySocialInput, toggleSocialInput] = useState(false);
  useEffect(() => {
    getCurrentUserProfile();
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills,
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.twitter ? "" : profile.twitter,
      facebook: loading || !profile.facebook ? "" : profile.facebook,
      linkedIn: loading || !profile.linkedIn ? "" : profile.linkedIn,
      youtube: loading || !profile.youtube ? "" : profile.youtube,
      instagram: loading || !profile.instagram ? "" : profile.instagram,
    });
  }, [loading, getCurrentUserProfile]);

  const navigate = useNavigate();
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedIn,
    youtube,
    instagram,
  } = formData;

  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onsubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, true);
  };
  return (
    <Container>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <Form onSubmit={(e) => onsubmit(e)}>
        <FormGroup>
          <Input
            name="status"
            type="select"
            value={status}
            onChange={(e) => onchange(e)}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </Input>
          <FormText>
            Give us an idea of where you are at in your career
          </FormText>
        </FormGroup>
        <FormGroup>
          <Input
            value={company}
            onChange={(e) => onchange(e)}
            type="text"
            placeholder="Company"
            name="company"
          />
          <FormText>Could be your own company or one you work for</FormText>
        </FormGroup>
        <FormGroup>
          <Input
            value={website}
            onChange={(e) => onchange(e)}
            type="text"
            placeholder="Website"
            name="website"
          />
          <FormText>Could be your own or a company website</FormText>
        </FormGroup>
        <FormGroup>
          <Input
            value={location}
            onChange={(e) => onchange(e)}
            type="text"
            placeholder="Location"
            name="location"
          />
          <FormText>City & state suggested (eg. Boston, MA)</FormText>
        </FormGroup>
        <FormGroup>
          <Input
            value={skills}
            onChange={(e) => onchange(e)}
            type="text"
            placeholder="* Skills"
            name="skills"
          />
          <FormText>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </FormText>
        </FormGroup>
        <FormGroup>
          <Input
            value={githubusername}
            onChange={(e) => onchange(e)}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <FormText>
            If you want your latest repos and a Github link, include your
            username
          </FormText>
        </FormGroup>
        <FormGroup>
          <Input
            value={bio}
            onChange={(e) => onchange(e)}
            type="textarea"
            placeholder="A short bio of yourself"
            name="bio"
          />
          <FormText>Tell us a little about yourself</FormText>
        </FormGroup>

        <FormGroup>
          <Button
            onClick={() => toggleSocialInput(!displaySocialInput)}
            color="light"
          >
            Add Social Network Links
          </Button>
          <span>Optional</span>
        </FormGroup>
        {displaySocialInput && (
          <Fragment>
            <FormGroup>
              <i className="fab fa-twitter fa-2x"></i>
              <Input
                value={twitter}
                onChange={(e) => onchange(e)}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
              />
            </FormGroup>

            <FormGroup>
              <i className="fab fa-facebook fa-2x"></i>
              <Input
                value={facebook}
                onChange={(e) => onchange(e)}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
              />
            </FormGroup>

            <FormGroup>
              <i className="fab fa-youtube fa-2x"></i>
              <Input
                value={youtube}
                onChange={(e) => onchange(e)}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
              />
            </FormGroup>

            <FormGroup>
              <i className="fab fa-linkedin fa-2x"></i>
              <Input
                value={linkedIn}
                onChange={(e) => onchange(e)}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </FormGroup>

            <FormGroup>
              <i className="fab fa-instagram fa-2x"></i>
              <Input
                value={instagram}
                onChange={(e) => onchange(e)}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
              />
            </FormGroup>
          </Fragment>
        )}

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
EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentUserProfile,
})(EditProfile);
