import './App.css';
import React from 'react';
import { TitleBar } from './titleBar';
import { Description } from './description';
import { StartGameAndScore } from './startGameAndScore';
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
        console.log(`got to move location ${location}`);

        //find location, set current location to it and update output
        if (location !== this.state.currentLocation.name) {    //don't move to the same location you are in
            this.state.locations.forEach(loc => {
                if (loc.name === location) {
                    console.log(`found new location: ${loc.name}`);
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
              console.log('command: ' + command);
              this.pushOutputText("");
              this.pushOutputText(`\n> ${command}`);    //add user input to output window
              this.pushOutputText("");
              let response = GameEngine(command, location, this.state.items, this.moveLocation, player);
              for (const line of response) {
                  this.pushOutputText(line);
              }
          }
      }
  }

  pushOutputText = (text) => {

      console.log(`pushing: ${text}`);
        let newOutputList = this.state.outputList;

        let lineOfText = text;
        let done = false;
        //separate input text into multiple lines if needed
        while (!done) {
            if (lineOfText.length < shared.outputLineCharacters) {
                newOutputList.shift();
                newOutputList.push(lineOfText);
                done = true;
                console.log('done');
            } else {
                //find first space character less than outputLineCharacters
                let cutIndex = shared.outputLineCharacters - 1;
                while ((lineOfText[cutIndex] !== ' ')&&(cutIndex > 0)) { cutIndex--; }
                console.log(`cutting string at ${cutIndex}`);
                newOutputList.shift();
                newOutputList.push(lineOfText.slice(0, cutIndex));
                lineOfText = lineOfText.slice(cutIndex);
                console.log(`cut remains: ${lineOfText}`);
            }
        }
        this.setState({outputText: newOutputList});
  }

  startGame = () => {

      //copy default player information in
      this.setState({playerData: playerData});
      let loadedLocations = [];
      Object.keys(locationData).forEach(function(key) {
          loadedLocations.push(locationData[key]);
          console.log(`pushing location: ${locationData[key].name}`);
      });
      console.log(`found ${loadedLocations.length} locations`);

      let loadedItems = [];
      Object.keys(itemData).forEach(function(key) {
          loadedItems.push(itemData[key]);
          console.log(`pushing item: ${itemData[key].name}`);
      });
      console.log(`found ${loadedItems.length} items`);

      //find initial location, set current location to it and update output
      loadedLocations.forEach(loc => {
          if (loc.name === this.state.initialLocationName) {
              console.log(`found initial location: ${loc.name}`);
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
          <StartGameAndScore onClick={this.startGame} score={this.state.score} maxScore={this.state.maxScore} />
          <OutputWindow outputList={this.state.outputList}/>
          <CommandWindow onKeyPress={this.commandEntered} />
        </div>
    );
  }
};

export default App;
