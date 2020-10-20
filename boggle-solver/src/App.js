import React, { useState, useEffect } from 'react';
import { GAME_STATE } from './componenets/GameState.js';
import { RandomGrid } from './componenets/randomGen.js';
import findAllSolutions from './componenets/solver.js';
import Board from './componenets/Board.js';
import GuessInput from './componenets/GuessInput.js';
import FoundSolutions from './componenets/FoundSolutions.js';
import SummaryResults from './componenets/SummaryResults.js';
import ToggleState from './componenets/ToggleState.js';
import logo from './images/boggle.png';
import './App.css';


function App() {

  const [allSolutions, setAllSolutions] = useState([]);  // solutions from solver
  const [foundSolutions, setFoundSolutions] = useState([]);  // found by user
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE); // Just an enuerator or the three states see below
  const [grid, setGrid] = useState([]);   // the grid
  const [totalTime, setTotalTime] = useState(0);  // total time elapsed
  const [size, setSize] = useState(3);  // selected grid size


  // useEffect will trigger when the array items in the second argument are
// updated so whenever grid is updated, we will recompute the solutions
useEffect(() => {
  const wordList = require('./full-wordlist.json');
  let tmpAllSolutions = findAllSolutions(grid, wordList.words);
  setAllSolutions(tmpAllSolutions);
  console.log("I'm in use effect 1");
}, [grid]);

// This will run when gameState changes.
// When a new game is started, generate a new random grid and reset solutions
useEffect(() => {
  if (gameState === GAME_STATE.IN_PROGRESS) {
    setGrid(RandomGrid(size));
    setFoundSolutions([]);
    console.log("I'm in use effect 2");
  }
}, [gameState, size]);


function correctAnswerFound(answer) {
  console.log("New correct answer:" + answer);
  setFoundSolutions([...foundSolutions, answer]);
}
  return (
    <div className="App">

      <img src={logo} width="25%" height="25%" class="logo" alt="Bison Boggle Logo" />

      <ToggleState gameState={gameState}
        setGameState={(state) => setGameState(state)}
        setSize={(state) => setSize(state)}
        setTotalTime={(state) => setTotalTime(state)} />

      { gameState === GAME_STATE.IN_PROGRESS &&
        <div>
          <Board board={grid} />

          <GuessInput allSolutions={allSolutions}
            foundSolutions={foundSolutions}
            correctAnswerCallback={(answer) => correctAnswerFound(answer)} />
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
        </div>
      }
      { gameState === GAME_STATE.ENDED &&
        <div>
          <Board board={grid} />
          <SummaryResults words={foundSolutions} totalTime={totalTime} />
          <FoundSolutions headerText="Missed Words [wordsize > 3]: " words={allSolutions} />

        </div>
      }
    </div>
  );
}

export default App;
