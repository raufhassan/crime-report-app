import Loader from "react-loader-spinner";
import React from "react";
const Loading = () => {
  return (
    <Loader
      style={style.LoadBlock}
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
    />
  );
};
const style = {
  LoadBlock: {
    textAlign: "center",
    marginTop: "20%",
  },
};
export default Loading;
