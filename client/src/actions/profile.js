import {
  CLEAR_PROFILE,
  DELETE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILES,
} from "../constants";
import axios from "axios";
import { setAlert } from "./alert";
import baseURL from "./baseUrl";

// get current user profile
export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(baseURL + "/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get all user profiles
export const UserProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get(baseURL + "/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get user profile by userId
export const UserProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(baseURL + `/profile/user/${userId.id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create or update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(baseURL + "/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "profile updated" : "profile created", "success")
      );
      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// add experinces

export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      baseURL + "/profile/experiences",
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("experiences added", "success"));

    navigate("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add Education

export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      baseURL + "/profile/education",
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("experiences added", "success"));

    navigate("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete experience

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(baseURL + `/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("experienced deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(baseURL + `/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("education deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete account

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(baseURL + `/profile`);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_PROFILE,
      });
      dispatch(setAlert("Account deleted", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
