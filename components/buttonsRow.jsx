import React, { Component } from "react";
import Button from "./button";
class ButtonsRow extends Component {
  state = {};
  render() {
    const labels = this.props.labels;
    return (
      <div className="row mx-auto">
        {labels.map((item) => (
          <Button
            label={item}
            key={item}
            onClick={() => this.props.onClick(item)}
          />
        ))}
      </div>
    );
  }
}

export default ButtonsRow;
