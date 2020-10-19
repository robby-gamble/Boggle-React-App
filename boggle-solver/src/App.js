import React, { useState, useEffect } from 'react';
import { GAME_STATE } from './boggle-solver/src/componenets/jsFiles/GameState.js';
import { RandomGrid } from './boggle-solver/src/componenets/jsFiles/randomGen.js';
import findAllSolutions from './boggle-solver/src/componenets/jsFiles/solver.js';
import Board from './boggle-solver/src/componenets/jsFiles/Board.js';
import GuessInput from './boggle-solver/src/componenets/jsFiles/GuessInput.js';
import FoundSolutions from './boggle-solver/src/componenets/jsFiles/FoundSolutions.js'
import SummaryResults from './boggle-solver/src/componenets/jsFiles/SummaryResults.js';
import ToggleState from './boggle-solver/src/componenets/jsFiles/ToggleState.js';
import logo from './boggle-solver/src/images/boggle.png';
import './App.css';


// useEffect will trigger when the array items in the second argument are
// updated so whenever grid is updated, we will recompute the solutions
useEffect(() => {
  const wordList = require('./boggle-solver/src/full-wordlist.json');
  let tmpAllSolutions = findAllSolutions(grid, wordList.words);
  setAllSolutions(tmpAllSolutions);
  console.log("I'm in use effect 1.");
}, [grid]);

// This will run when gameState changes.
// When a new game is started, generate a new random grid and reset solutions
useEffect(() => {
  if (gameState === GAME_STATE.IN_PROGRESS) {
    setGrid(RandomGrid(size));
    setFoundSolutions([]);
    console.log("I'm in use effect 1.");
  }
}, [gameState, size]);

function correctAnswerFound(answer) {
  console.log("New correct answer:" + answer);
  setFoundSolutions([...foundSolutions, answer]);
}


function App() {

  const [allSolutions, setAllSolutions] = useState([]);  // solutions from solver
  const [foundSolutions, setFoundSolutions] = useState([]);  // found by user
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE); // Just an enuerator or the three states see below
  const [grid, setGrid] = useState([]);   // the grid
  const [totalTime, setTotalTime] = useState(0);  // total time elapsed
  const [size, setSize] = useState(3);  // selected grid size

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
