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
import { shared } from "./shared";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameRunning: false,
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
        }
    };

    moveLocation = (location, preText, points) => {

        if (points && points > 0) {
            this.setState({score: this.state.score + points});
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
              let response = GameEngine(command, location, this.state.items, this.moveLocation, player, this.damagePlayer);
              for (const line of response) {
                  this.pushOutputText(line);
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
        this.setState({health: this.state.health - points});
    }

    startGame = () => {

      //copy default player information in
      this.setState({playerData: playerData});
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

  render()
  {
    return (
        <div className="App">
          <TitleBar version="0.1"/>
          <Description/>
          <StartGameHealthAndScore onClick={this.startGame} score={this.state.score} maxScore={this.state.maxScore} health={this.state.health}/>
          <OutputWindow outputList={this.state.outputList}/>
          <CommandWindow onKeyPress={this.commandEntered} />
        </div>
    );
  }
};

export default App;
