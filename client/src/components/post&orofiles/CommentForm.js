import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import { Button, Form, Input } from "reactstrap";
const CommentForm = ({ addComment, commentId }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <Form
        className="my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment({ text }, commentId);
          setText("");
        }}
      >
        <Input
          name="text"
          type="textarea"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <Button type="submit" className=" my-1">
          Submit
        </Button>
      </Form>
    </div>
  );
};
CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};
export default connect(null, { addComment })(CommentForm);
