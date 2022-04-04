import React from 'react';
import Button from '@material-ui/core/Button';

export function StartGameAndScore(props) {
    return <div class="start-game-row-container">
        <div className="score-container">
            Score: {props.score}/{props.maxScore}
        </div>
        <div class="start-game-button-container">
            <Button id="start-game-button" label="Start Game" color="#EEEEEE" variant="contained" onClick={props.onClick} >Start</Button>
        </div>
    </div>
}