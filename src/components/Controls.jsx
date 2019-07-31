import React from "react";
import axios from "axios";

class Controls extends React.Component {
  state = {
    response: "",
    revealAnswer: false
  };

  checkAnswer = e => {
    let answer = this.props.upperArray.join("");
    if (answer.length < 5) {
      this.props.setResponse("Try Again!");
    } else {
      axios
        .get(`http://tom.mo2.dinksurveys.net/api/1.0/isword?word=${answer}`)
        .then(({ data }) => {
          if (!data.isWord) {
            this.props.setResponse("Try Again!");
          } else {
            this.props.setResponse("Well Done!");
          }
        });
    }
  };

  exposeAnswer = () => {
    this.props.showAnswer();
  };

  render() {
    return (
      <div id="controlsContainer">
        <div id="answer">{this.props.revealAnswer && this.props.word}</div>
        <div id="response">{this.props.response}</div>
        <button onClick={this.props.newWord}>New Word</button>
        <button onClick={this.checkAnswer}>Check Answer</button>
        <button onClick={this.props.showAnswer}>Reveal Word</button>
      </div>
    );
  }
}

export default Controls;
