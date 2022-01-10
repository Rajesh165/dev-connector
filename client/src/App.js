import "./App.css";
import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import setAuthToken from "./utills/setAuthToken";
import { loadUser } from "./actions/auth";
import DeshBoard from "./components/education/DeshBoard";
import AddEducation from "./components/education/AddEducation";
import AddExperince from "./components/education/AddExperince";
import CreateProfile from "./components/post&orofiles/CreateProfile";
import Post from "./components/post&orofiles/Post";
import Posts from "./components/post&orofiles/Posts";
import Profile from "./components/post&orofiles/Profile";
import Profiles from "./components/post&orofiles/Profiles";
import PrivateRoute from "./components/routing/PrivateRoute";
import EditProfile from "./components/post&orofiles/EditProfile";

if (localStorage.token) setAuthToken(localStorage.token);
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DeshBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-education"
              element={
                <PrivateRoute>
                  <AddEducation />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-experince"
              element={
                <PrivateRoute>
                  <AddExperince />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-profile"
              element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <PrivateRoute>
                  <Post />
                </PrivateRoute>
              }
            />
            <Route
              path="/posts"
              element={
                <PrivateRoute>
                  <Posts />
                </PrivateRoute>
              }
            />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
