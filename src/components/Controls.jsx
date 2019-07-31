import React from "react";
import axios from "axios";

const Controls = props => {
  const checkAnswer = e => {
    let answer = props.upperArray.join("");
    if (answer.length < 5) {
      props.setResponse("Try Again!");
    } else {
      axios
        .get(`http://tom.mo2.dinksurveys.net/api/1.0/isword?word=${answer}`)
        .then(({ data }) => {
          if (!data.isWord) {
            props.setResponse("Try Again!");
          } else {
            props.setResponse("Well Done!");
          }
        });
    }
  };

  return (
    <div id="controlsContainer">
      <div id="answer">{props.revealAnswer && props.word}</div>
      <div id="response">{props.response}</div>
      <button onClick={props.newWord}>New Word</button>
      <button onClick={checkAnswer}>Check Answer</button>
      <button onClick={props.showAnswer}>Reveal Word</button>
    </div>
  );
};

export default Controls;
