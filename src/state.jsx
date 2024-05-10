import React, { useState } from "react";
import "./App.css";

const COLORS = ["pink", "green", "blue", "yellow", "purple"];

function App() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
  const [counter, setCounter] = useState(0);

  const onButtonClick = (color) => () => {
    setCounter(counter + 1);
    setBackgroundColor(color);
  };

  return (
    <>
    <div className="Counter">
      <h1>Counter: {counter}</h1>
    </div>
    <div
      className="App"
      style={{
        backgroundColor,
      }}
    >
      {COLORS.map((color) => (
        <button
          type="button"
          key={color}
          onClick={onButtonClick(color)}
          className={backgroundColor === color ? "selected" : ""}
        >
          {color}
        </button>
      ))}
    </div>
    </>
  );
}

export default App;
