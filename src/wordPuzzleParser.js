import { shared } from "./shared";

export function WordPuzzleParser(command, location, items, updateParser, guessesLeft, updateGuessesLeft) {
    let response = [];
    command = command.toLowerCase();
    let words = command.split(' ');

    let result = '';

    if (words.length === 1) {
        if (words[0].length === 6) {
            let index = 0;
            for (let aLetter of words[0]) {
                if (shared.puzzleWord.indexOf(aLetter) !== -1) {
                    //letter is present now see if in right spot
                    if (words[0][index] === shared.puzzleWord[index]) {
                        result += 'C';
                    } else {            //present but wrong spot
                        result += 'W';
                    }
                } else {                //letter is not present
                    result += 'X';
                }
                index++;
            }

           if (result !== 'CCCCCC') {
               response.push(`>> Incorrect: ${result}`);
               guessesLeft--;
               if (guessesLeft > 0) {
                   response.push(`You have ${guessesLeft} guesses left!`);
                   updateGuessesLeft();
               }
              else {
                  response.push('You ran out of guesses and lost your marble!');
                  response.push('');
                  //send marble back to starting location and change player location
                  items.forEach(item => {
                      if (item.name === "marble") {
                         item.location = item.initialLocation;
                      }
                  });
                  updateParser('', response, 0, 'waterfall');
                  return;
               }
           } else {
               response.push(`YOU HAVE GUESSED MY WORD IN ONLY ${shared.maxGuesses - guessesLeft + 1} guesses!`);
               updateParser('', response, shared.pointsForSolvingPuzzle, '');
               return;
           }
        }
        else {
            response.push("Your word is not 6 characters long.");
        }
    } else {
        response.push("That is not one word. And it's really not the word I am thinking of.");
    }
    return response;
}
