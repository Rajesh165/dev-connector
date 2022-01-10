import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { Button, Form, Input } from "reactstrap";
const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText("");
        }}
        className="  my-1"
      >
        <Input
          name="text"
          type="textarea"
          cols="30"
          rows="5"
          placeholder="Create Link post"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button color="dark" type="submit" className="  my-1">
          Submit
        </Button>
      </Form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};
export default connect(null, { addPost })(PostForm);
