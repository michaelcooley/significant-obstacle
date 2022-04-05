import './App.css';
import React from 'react';
import { TitleBar } from './titleBar';
import { Description } from './description';
import { StartGameHealthAndScore } from './startGameHealthAndScore';
import { GameEngine } from "./gameEngine";
import { CommandWindow } from "./commandWindow";
import { OutputWindow } from "./outputWindow";
import locationData from './world/locations.json';
import itemData from './world/items.json';
import playerData from './world/player.json';
import { describeLocation } from "./describeLocation";
import {WinningBanner} from "./winningBanner";
import { shared } from "./shared";
import {WordPuzzleParser} from "./wordPuzzleParser";
import {TheReaper} from "./theReaper";
import { SoundEnable } from './soundEnable';
import dingSound from './sounds/ding.wav';
import ouchSound from './sounds/ouch.wav';
import gulpSound from './sounds/gulp.wav';
import victorySound from './sounds/victory.wav';
import failureSound from './sounds/failure.wav';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameRunning: false,
            gameOver: false,
            score: 0,
            health: shared.maxHealth,
            maxScore: shared.maxScore,
            initialLocationName: 'van',
            currentLocation: undefined,
            currentDescription: 'nowhere',
            playerData: undefined,
            locations: undefined,
            items: undefined,
            outputList: Array(shared.outputRows).fill(""),
            parser: undefined,
            guessesLeft: 0,
            prompt: shared.defaultPrompt,
            playerDied: false,
            soundEnabled: false
        }
    };

    moveLocation = (location, preText, points, parser) => {

        if (parser && parser.length > 0) {              //if we switch to the word puzzle parser set guesses too
            this.setState({parser: parser});
            this.setState({prompt: 'Guess Word:'});
            this.setState({guessesLeft: shared.maxGuesses});
        }

        if (points && points > 0) {
            this.setState({score: this.state.score + points});
            if (this.state.score + points >= shared.maxScore) {
                this.pushOutputText('');
                this.pushOutputText('');
                this.pushOutputText('');
                this.pushOutputText('');
                this.pushOutputText('Game Over!');
                this.pushOutputText('You won!');
                this.pushOutputText('');
                this.setState({gameOver: true});
                this.setState({gameRunning: false});
                this.playVictorySound();
                //return;
            } else {
                this.playDingSound();
            }
        }

        if (preText && preText.length > 0) {
            for (const line of preText) {
                this.pushOutputText(line);
            }
        }

        //find location, set current location to it and update output
        if (location !== this.state.currentLocation.name) {    //don't move to the same location you are in
            this.state.locations.forEach(loc => {
                if (loc.name === location) {
                    this.setState({currentLocation: loc});
                    let response = [];
                    response = describeLocation(loc, this.state.items);
                    if (response && response.length > 0) {
                        for (const line of response) {
                            this.pushOutputText(line);
                        }
                    }
                }
            });
        }
    }

    updateParser = (newParser, preText, points, newLocation) => {
        if (preText && preText.length > 0) {
            for (const line of preText) {
                this.pushOutputText(line);
            }
        }
        this.setState({score: this.state.score + points});
        this.setState({parser: newParser});
        if (newParser === '') {
            this.setState({prompt: shared.defaultPrompt});
        }
        if (this.state.score + points >= shared.maxScore) {
            this.pushOutputText('');
            this.pushOutputText('');
            this.pushOutputText('');
            this.pushOutputText('');
            this.pushOutputText('Game Over!');
            this.pushOutputText('You won!');
            this.pushOutputText('');
            this.setState({gameOver: true});
            this.setState({gameRunning: false});
            this.playVictorySound();
        } else {
            if (newLocation !== '') {
                this.state.locations.forEach(loc => {
                    if (loc.name === newLocation) {
                        this.setState({currentLocation: loc});
                        let response = [];
                        response = describeLocation(loc, this.state.items);
                        if (response && response.length > 0) {
                            for (const line of response) {
                                this.pushOutputText(line);
                            }
                        }
                    }
                });
            }
        }
    }

  commandEntered = (event) => {
      if (event.key === "Enter") {
          if (!this.state.gameRunning) {
              this.pushOutputText(">> Starting game...");
              event.target.value = '';
              this.startGame();
          } else {
              let command = event.target.value;
              let location = this.state.currentLocation;
              let player = this.state.playerData;
              event.target.value = '';
              this.pushOutputText("");
              this.pushOutputText(`\n> ${command}`);    //add user input to output window
              this.pushOutputText("");
              let response = [];
              if (this.state.parser && this.state.parser === 'wordPuzzle') {
                  response = WordPuzzleParser(command, location, this.state.items, this.updateParser, this.state.guessesLeft, this.updateGuessesLeft, player);
              } else {
                  response = GameEngine(command, location, this.state.items, this.moveLocation, player, this.damagePlayer);
              }
              if (response && response.length > 0) {
                  for (const line of response) {
                      this.pushOutputText(line);
                  }
              }
          }
      }
  }

  pushOutputText = (text) => {
        let newOutputList = this.state.outputList;
        let lineOfText = text;
        let done = false;
        //separate input text into multiple lines if needed
        while (!done) {
            if (lineOfText.length < shared.outputLineCharacters) {
                newOutputList.shift();
                newOutputList.push(lineOfText);
                done = true;
            } else {
                //find first space character less than outputLineCharacters
                let cutIndex = shared.outputLineCharacters - 1;
                while ((lineOfText[cutIndex] !== ' ')&&(cutIndex > 0)) { cutIndex--; }
                newOutputList.shift();
                newOutputList.push(lineOfText.slice(0, cutIndex));
                lineOfText = lineOfText.slice(cutIndex);
            }
        }
        this.setState({outputText: newOutputList});
  }

  damagePlayer = (points) => {
        this.setState({health: ((this.state.health - points) >= 0) ? (this.state.health - points) : 0});
        if (this.state.health - points <= 0) {
            this.setState({playerDied: true});
            this.setState({gameRunning: false});
            this.playFailureSound();
        } else {
            if (points > 0) {
                this.playOuchSound();
            } else {
                this.playGulpSound();
            }
        }
  }

  updateGuessesLeft = () => {
        this.setState({guessesLeft: this.state.guessesLeft - 1});
  }

  startGame = () => {

      //copy default player information in
      this.setState({playerData: playerData});
      this.setState({gameOver: false});
      let loadedLocations = [];
      Object.keys(locationData).forEach(function(key) {
          loadedLocations.push(locationData[key]);
      });
      let loadedItems = [];
      Object.keys(itemData).forEach(function(key) {
          loadedItems.push(itemData[key]);
      });
      //find initial location, set current location to it and update output
      loadedLocations.forEach(loc => {
          if (loc.name === this.state.initialLocationName) {
              this.setState({currentLocation: loc});
              let response = [];
              response = describeLocation(loc, loadedItems);
              if (response && response.length > 0) {
                  for (const line of response) {
                      this.pushOutputText(line);
                  }
              }
          }
      });

      this.setState({locations: loadedLocations});
      this.setState({items: loadedItems});
      this.setState({score: 0});
      this.setState({gameRunning: true});
  }

  onSoundEnableChanged = (event) => {
        let enabled = event.target.checked;
        console.log('sound enable change: ' + enabled);

        this.setState({soundEnabled: enabled});
  }

  playDingSound = () => {
        if (this.state.soundEnabled) {
            let audio = new Audio(dingSound);
            audio.play();
        }
  }

  playGulpSound = () => {
        if (this.state.soundEnabled) {
            let audio = new Audio(gulpSound);
            audio.play();
        }
  }

  playOuchSound = () => {
        if (this.state.soundEnabled) {
            let audio = new Audio(ouchSound);
            audio.play();
        }
  }

  playVictorySound = () => {
        if (this.state.soundEnabled) {
            let audio = new Audio(victorySound);
            audio.play();
        }
  }

  playFailureSound = () => {
        if (this.state.soundEnabled) {
            let audio = new Audio(failureSound);
            audio.play();
        }
  }

  render()
  {
    return (
        <div className="App">
          <TitleBar version="0.1"/>
          <Description/>
          <WinningBanner gameOver={this.state.gameOver}/>
          <TheReaper death={this.state.playerDied}/>
          <StartGameHealthAndScore onClick={this.startGame} score={this.state.score} maxScore={this.state.maxScore} health={this.state.health} checked={this.state.soundEnabled} onChange={this.onSoundEnableChanged} />
          <OutputWindow outputList={this.state.outputList}/>
          <CommandWindow onKeyPress={this.commandEntered} prompt={this.state.prompt} />
        </div>
    );
  }
};

export default App;
