import React from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
        <div className="sound-enable-container">
            <FormControlLabel
                control={<Checkbox
                    label={props.label}
                    checked={props.checked}
                    onChange={props.onChange}
                />
                }
                label="Sound" />
        </div>
    </div>
}