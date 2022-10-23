import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [guessOptions, setGuessOptions] = useState(generateGuessOptions());
  const [score, setScore] = useState(0);

  useEffect(() => {
    setGuessOptions(generateGuessOptions());
    return () => {};
  }, [score]);

  const onGuess = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore(0);
    }
  };

  return (
    <div className="container">
      {/* Color display */}
      <div className="gameWindow">
        <div
          className="color"
          style={{
            backgroundColor: guessOptions.find((option) => option.isCorrect)
              .color,
          }}
        >
          <p className="score">{score}</p>
        </div>
        <div className="guessContainer">
          {guessOptions.map((guessOption, index) => {
            return (
              <button
                key={index}
                className="guess"
                onClick={() => {
                  onGuess(guessOption.isCorrect);
                }}
              >
                {guessOption.color.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function generateGuessOptions() {
  let guessOptions = [
    { color: randomHexColor(), isCorrect: false },
    { color: randomHexColor(), isCorrect: false },
    { color: randomHexColor(), isCorrect: true },
  ];

  guessOptions.sort(() => Math.random() - 0.5);

  return guessOptions;
}

function randomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export default App;
