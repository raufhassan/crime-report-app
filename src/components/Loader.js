import Loader from "react-loader-spinner";
import React from "react";
export default class Loading extends React.Component {
  render() {
    return (
      <Loader
        style={style.LoadBlock}
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />
    );
  }
}
const style = {
  LoadBlock: {
    textAlign: "center",
    marginTop: "20%",
  },
};
