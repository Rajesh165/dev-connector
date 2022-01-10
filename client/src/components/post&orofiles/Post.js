import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import { useParams } from "react-router";
import Spiner from "../layout/Spiner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const Post = ({ getPost, post: { post, loading } }) => {
  const param = useParams();

  useEffect(() => {
    getPost(param);
  }, [getPost, param]);
  return loading || post === null ? (
    <Spiner />
  ) : (
    <Container>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to="/profile">
            <img className="round-img" src={post && post.avatar} alt="" />
            <h4>{post && post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post && post.text}</p>
        </div>
      </div>

      <div className="post-form">
        <CommentForm commentId={post && post._id} />
      </div>
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Container>
  );
};
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateTopProp = (state) => ({
  post: state.post,
});
export default connect(mapStateTopProp, { getPost })(Post);
