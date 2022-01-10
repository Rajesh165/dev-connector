import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addLikes, removeLike, deletePost } from "../../actions/post";
import { Button } from "reactstrap";
const PostItem = ({
  addLikes,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to="/profile">
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <Button color="light" onClick={() => addLikes(_id)}>
              <i className="fas fa-thumbs-up"></i>
              <span>{likes.length}</span>
            </Button>
            <Button color="light" onClick={() => removeLike(_id)}>
              <i className="fas fa-thumbs-down"></i>
            </Button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.isLoading && user === auth.user._id && (
              <Button color="danger" onClick={() => deletePost(_id)}>
                <i className="fas fa-times"></i>
              </Button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTyoes = {
  auth: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateTopProp = (state) => ({
  auth: state.auth,
});
export default connect(mapStateTopProp, { addLikes, removeLike, deletePost })(
  PostItem
);
