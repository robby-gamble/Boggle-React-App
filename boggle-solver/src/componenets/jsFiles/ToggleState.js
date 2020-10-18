import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {GAME_STATE} from './GameState.js';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import './ToggleGameState.css';

function ToggleGameState() {

    return (
      <div className="Toggle-game-state">
        <Button variant="outlined">
          {buttonText}
        </Button>
  
          <div className="Input-select-size">
          <FormControl >
         
          <Select
            labelId="sizelabel"
            id="sizemenu"
          
         
            onChange={handleChange}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
           <FormHelperText>Set Grid Size</FormHelperText>
          </FormControl>
         </div>
      </div>
    );
  }
  
  export default ToggleGameState;