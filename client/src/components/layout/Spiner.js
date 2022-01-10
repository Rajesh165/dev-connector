import React, { Fragment } from "react";
import loading from "./loading.gif";
const Spiner = () => {
  return (
    <Fragment>
      <img
        src={loading}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="loading"
      />
    </Fragment>
  );
};

export default Spiner;
