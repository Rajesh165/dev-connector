import axios from "axios";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
} from "../constants";
import { setAlert } from "./alert";

//-----------get all posts-------------------
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/post");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//-----------like a post-------------------
export const addLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/post/likes/${postId}`
    );
    dispatch({
      type: UPDATE_LIKE,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//-----------unlike a post-------------------
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/post/unlikes/${postId}`
    );
    dispatch({
      type: UPDATE_LIKE,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//-----------delete a post-------------------
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/post/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert("post deleted", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//-----------create a post-------------------
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/post/`,
      formData,
      config
    );
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("post created", "success"));
  } catch (err) {
    dispatch({
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//-----------get post byid-------------------
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/post/${id.id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//------------------add comment ----------
export const addComment = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/post/comment/${id}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("comment added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//------------------remove comment ----------
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.post(
      `http://localhost:5000/api/post/comment/${postId}/${commentId}`
    );
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("comment delete", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
