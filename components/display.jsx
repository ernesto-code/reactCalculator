import React, { Component } from "react";
class Display extends Component {
  state = {};
  render() {
    return (
      <input
        id="display"
        className="form-control mx-auto mt-3 mb-3"
        style={{ width: 200, textAlign: "right" }}
        value={this.props.output}
        readOnly
      />
    );
  }
}

export default Display;
