import React, { Component } from "react";
import Button from "./button";
class Keyboard extends Component {
  state = {
    labels: [
      "C",
      "7",
      "8",
      "9",
      ":",
      "<",
      "4",
      "5",
      "6",
      "*",
      "sqrt",
      "1",
      "2",
      "3",
      "-",
      "+/-",
      ".",
      "0",
      "=",
      "+",
    ],
  };

  render() {
    return (
      <React.Fragment>
        <div className="row mx-auto">
          <div className="w-5" style={{ width: 300 }}>
            {this.state.labels.map((item) => (
              <Button
                label={item}
                key={item}
                onPressedButton={this.props.onPressedButton}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Keyboard;
