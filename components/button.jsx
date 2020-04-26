import React, { Component } from "react";
class Button extends Component {
  state = {
    label: this.props.label,
  };
  /*onPressButton(label) {
    console.log("Pressed : ", label);
  }*/
  render() {
    return (
      <button
        style={{ width: 50, padding: 6 }}
        className={this.assingClasses()}
        onClick={() => this.props.onPressedButton(this.state.label)}
      >
        {this.state.label}
      </button>
    );
  }
  assingClasses() {
    let regExp = /[0-9.]/;
    let classes = "btn btn-lg m-1 ";

    if (regExp.test(this.props.label) || this.props.label === "+/-") {
      classes += "";
    } else if (this.props.label === "C" || this.props.label === "<") {
      classes += "btn-danger ";
    } else {
      classes += "bg-secondary text-white";
    }
    return classes;
  }
}

export default Button;
