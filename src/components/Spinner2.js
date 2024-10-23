import React, { Component } from "react";
import loader from "./loading.gif";
export default class spinner extends Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <img src={loader} alt="loader" />
      </div>
    );
  }
}
