import Loader from "react-loader-spinner";
import React from "react";
const Loading = () => {
  return (
    <Loader
      className="Loader"
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
    />
  );
};

export default Loading;
