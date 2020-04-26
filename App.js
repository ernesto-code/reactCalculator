import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import Display from "./components/display";
import Keyboard from "./components/keyboard";

//import { render } from "react-dom";

class App extends Component {
  state = {
    output: 0,
    operation: "",
    number1: 0,
    number2: "",
  };
  constructor() {
    super();
    this.handlePressedButton = this.handlePressedButton.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }
  render() {
    return (
      <React.Fragment>
        <br />
        <div
          className="container mx-auto border mt-5 mb-5 bg-light"
          style={{ width: 350 }}
        >
          <div className="row mb-3">
            <Display output={this.state.output} />
            <Keyboard onPressedButton={this.handlePressedButton} />
          </div>
        </div>
      </React.Fragment>
    );
  }

  handlePressedButton = (label) => {
    if (label === "C") {
      this.resetState();
    } else if (/[0-9]/.test(label)) {
      this.numberPressed(label);
    } else if (!/[0-9C=<.]/.test(label) && label !== "+/-") {
      this.operationPressed(label);
    } else if (label === "=") {
      this.getResult(label);
    } else if (label === "<") {
      this.deletePressed();
    } else if (label === "+/-") {
      this.signPressed();
    } else if (label === ".") {
      this.dotPressed();
    }
  };

  componentDidMount() {
    let documentDisplay = document;
    documentDisplay.addEventListener("keydown", this.handleKeyPressed);
  }

  handleKeyPressed = (event) => {
    if (this.state.output.toString().length < 20) {
      if (/[0-9]/.test(event.key)) {
        this.handlePressedButton(event.key);
      } else if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "."
      ) {
        this.handlePressedButton(event.key);
      } else if (event.key === "/") {
        this.handlePressedButton(":");
      } else if (event.key === "Backspace") {
        this.handlePressedButton("<");
      } else if (event.key === "Enter") {
        this.handlePressedButton("=");
      } else if (event.key === "Delete") {
        this.handlePressedButton("C");
      }
    } else {
      this.setState({ output: "ERROR (Max digits = 20)" });
    }
  };

  numberPressed(label) {
    const { output, operation, number2 } = this.state;
    if (output !== 0 && output !== "0") {
      if (operation === "") {
        this.setState({
          output: output + label,
          number1: output + label,
        });
      } else {
        if (number2 === "") {
          if (operation === "=") {
            this.resetState();
            this.setState({ output: label, number1: label });
          } else {
            this.setState({
              output: label,
              number2: label,
            });
          }
        } else {
          this.setState({
            output: this.state.output.toString() + label,
            number2: this.state.output.toString() + label,
          });
        }
      }
    } else {
      this.setState({ output: label, number1: label });
    }
  }

  operationPressed(label) {
    let currentOutput = this.state.output.toString();

    if (currentOutput.charAt(currentOutput.length - 1) === ".") {
      currentOutput = currentOutput.replace(".", "");
      this.setState({ output: currentOutput });
    }
    if (currentOutput.charAt(0) === "-" && currentOutput.length === 2) {
      currentOutput = currentOutput.replace("-", "");
      this.setState({ output: currentOutput });
    }
    if (
      this.state.number1 !== "" &&
      this.state.number2 !== "" &&
      label !== "sqrt"
    ) {
      if (this.state.operation !== label) {
        this.setState({ operation: label, number2: "" }); //}
      } else this.getResult(label);
    } else if (label === "sqrt") {
      this.getRoot();
    } else {
      this.setState({ operation: label });
    }
  }

  deletePressed() {
    const { output } = this.state;
    if (
      output !== 0 &&
      output.toString().length > 1 &&
      output.toString().charAt(output.toString().length - 1)
    ) {
      let newOutput = output.toString();
      this.setState({
        output: newOutput.slice(0, newOutput.length - 1),
        number1: newOutput.slice(0, newOutput.length - 1),
      });
    } else {
      this.resetState();
      this.setState({ output: 0, number1: 0 });
    }
  }

  signPressed() {
    const { output } = this.state;
    let str = "-";
    let strOutput = output.toString();
    if (output > 0 && output !== 0 && strOutput.charAt(0) !== "-") {
      str += output;
      this.setState({ output: str, number1: str });
    } else {
      str = output.toString();
      str = str.replace("-", "");
      this.setState({ output: str, number1: str });
    }
  }
  dotPressed() {
    if (this.state.output === 0) {
      this.setState({ output: "0." });
    } else {
      if (this.state.output.toString().indexOf(".") < 0) {
        this.setState({ output: this.state.output.toString() + "." });
      }
    }
  }

  getResult(label) {
    const { operation, number1, number2 } = this.state;
    if (number1 !== "" && number2 !== "") {
      switch (operation) {
        case "+": {
          this.getSum();
          if (label !== "=") {
            this.setState({
              operation: label,
              number2: "",
            });
          }
          break;
        }
        case "-": {
          this.getSus();
          if (label !== "=") {
            this.setState({
              operation: label,
              number2: "",
            });
          }
          break;
        }
        case "*": {
          this.getMult();
          if (label !== "=") {
            this.setState({
              operation: label,
              number2: "",
            });
          }
          break;
        }
        default: {
          this.getDiv();
          if (label !== "=") {
            this.setState({
              operation: label,
              number2: "",
            });
          }
          break;
        }
      }
    } else if (number1 !== "" && number2 === "" && operation !== "") {
      this.setState({
        output: parseFloat(number1) + parseFloat(number1),
        number1: parseFloat(number1) + parseFloat(number1),
        number2: number1,
      });
    } else {
      this.setState({ number1: "", number2: "" });
    }
  }

  getSum() {
    this.setState({
      output: parseFloat(this.state.number1) + parseFloat(this.state.number2),
      number1: parseFloat(this.state.number1) + parseFloat(this.state.number2),
    });
  }
  getSus() {
    this.setState({
      output: parseFloat(this.state.number1) - parseFloat(this.state.number2),
      number1: parseFloat(this.state.number1) - parseFloat(this.state.number2),
    });
  }
  getMult() {
    this.setState({
      output: parseFloat(this.state.number1) * parseFloat(this.state.number2),
      number1: parseFloat(this.state.number1) * parseFloat(this.state.number2),
    });
  }
  getDiv() {
    if (this.state.number2 === "0") {
      this.resetState();
      this.setState({ output: "Error!" });
    } else {
      this.setState({
        output: parseFloat(this.state.number1) / parseFloat(this.state.number2),
        number1:
          parseFloat(this.state.number1) / parseFloat(this.state.number2),
      });
    }
  }
  getRoot() {
    let number = parseFloat(this.state.number1);
    if (number > 0) {
      let root = Math.sqrt(number);
      this.resetState();
      this.setState({ output: root, number1: root });
    } else {
      this.resetState();
      this.setState({ output: "Invalid Input" });
    }
  }
  resetState() {
    this.setState({ output: 0, operation: "", number1: 0, number2: "" });
  }
  clearDot() {
    this.setState({ output: this.state.output.toString().replace(".", "") });
  }
}

export default App;
