import React, { useEffect } from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import Spiner from "../layout/Spiner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spiner />
  ) : (
    <Container>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Container>
  );
};
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateTopProp = (state) => ({
  post: state.post,
});
export default connect(mapStateTopProp, { getPosts })(Posts);
