import React from "react";

const LowerBoard = props => {
  return (
    <div id="lowerBoard">
      {props.letters.map((letter, i) => {
        return (
          <div
            className="lowerTile"
            onClick={props.handleClick}
            key={`Lower${i}`}
            id={i}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default LowerBoard;
