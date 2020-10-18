import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import './GuessInput.css';

function GuessInput() {

    return (
      <div className="Guess-input">
        <div>
          {labelText}
        </div>
        <TextField onKeyPress= ""/>
      </div>
    );
  }
  
  export default GuessInput;