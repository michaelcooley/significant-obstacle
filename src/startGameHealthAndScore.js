import React from 'react';
import Button from '@material-ui/core/Button';

export function StartGameHealthAndScore(props) {
    return <div className="start-game-row-container">
        <div className="score-container">
            Score: {props.score}/{props.maxScore}
        </div>
        <div className="health-container">
            Health: {props.health}
        </div>
        <div className="start-game-button-container">
            <Button id="start-game-button" label="Start Game" variant="contained" onClick={props.onClick} >Start</Button>
        </div>
    </div>
}