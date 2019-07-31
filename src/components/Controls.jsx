import React from "react";
import axios from "axios";

class Controls extends React.Component {
  state = {
    response: ""
  };

  checkAnswer = e => {
    let answer = this.props.upperArray.join("");
    if (answer.length < 5) {
      this.setState({ response: "Try Again" });
    } else {
      axios
        .get(`http://tom.mo2.dinksurveys.net/api/1.0/isword?word=${answer}`)
        .then(function(data) {
          if (!data.isWord) {
            this.setState({ response: "Try Again" });
          } else {
            this.setState({ response: "Well Done!" });
          }
        });
    }
  };
  render() {
    return (
      <div id="controlsContainer">
        <button onClick={this.props.newWord}>New Word</button>
        <button onClick={this.checkAnswer()}>Check Answer</button>
      </div>
    );
  }
}

export default Controls;
