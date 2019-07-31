import React from "react";

import LowerBoard from "./LowerBoard";
import Controls from "./Controls";
import axios from "axios";

class Board extends React.Component {
  state = {
    word: "",
    lowerBoard: ["", "", "", "", "", "", ""],
    upperBoard: ["", "", "", "", "", "", ""],
    revealWord: false,
    response: ""
  };

  newWord = () => {
    this.setState({
      upperBoard: ["", "", "", "", "", "", ""],
      revealAnswer: false,
      response: ""
    });

    axios
      .get("http://tom.mo2.dinksurveys.net/api/1.0/getWord?letters=5")
      .then(({ data }) => {
        this.setState({ word: data.word });
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < 2; ++i) {
          data.word += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }

        let wordArray = data.word.split("");

        for (let i = wordArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }

        this.setState({ lowerBoard: wordArray });
      });
  };

  componentDidMount() {
    this.newWord();
  }

  handleUpperClick = e => {
    e.persist();
    for (let i = 0; i < 7; ++i) {
      if (this.state.lowerBoard[i] == "") {
        this.setState(prevState => {
          prevState.lowerBoard[i] = e.target.innerText;
          prevState.upperBoard[e.target.id] = "";
          return {
            lowerBoard: prevState.lowerBoard,
            upperBoard: prevState.upperBoard
          };
        });

        break;
      }
    }
  };

  handleLowerClick = e => {
    e.persist();
    for (let i = 0; i < 7; ++i) {
      if (this.state.upperBoard[i] == "") {
        this.setState(prevState => {
          prevState.upperBoard[i] = e.target.innerText;
          prevState.lowerBoard[e.target.id] = "";
          return {
            upperBoard: prevState.upperBoard,
            lowerBoard: prevState.lowerBoard
          };
        });

        break;
      }
    }
  };

  showAnswer = () => {
    this.setState({ revealAnswer: true });
  };

  setResponse = response => {
    this.setState({ response });
  };

  render() {
    return (
      <div id="board">
        <div id="upperBoard">
          {this.state.upperBoard.map((tile, i) => {
            return (
              <div id={i} key={`upperTile${i}`} onClick={this.handleUpperClick}>
                {tile}
              </div>
            );
          })}
        </div>
        <LowerBoard
          letters={this.state.lowerBoard}
          handleClick={this.handleLowerClick}
        />
        <Controls
          setResponse={this.setResponse}
          showAnswer={this.showAnswer}
          revealAnswer={this.state.revealAnswer}
          response={this.state.response}
          word={this.state.word}
          upperArray={this.state.upperBoard}
          newWord={this.newWord}
        />
      </div>
    );
  }
}

export default Board;
