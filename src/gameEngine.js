import { parseOneWordCommands } from "./parseOneWordCommands";
import { parseTwoWordCommands } from "./parseTwoWordCommands";
import { parseThreeWordCommands } from "./parseThreeWordCommands";

export function GameEngine(command, location, items, moveLocation, player) {
    let response = [];
    command = command.toLowerCase();
    let words = command.split(' ');

    console.log(`found ${words.length} words in command`);

    if (words.length === 1) {
        response = parseOneWordCommands(words[0], words, response, location, player, items, moveLocation);
    } else if (words.length === 2) {
        response = parseTwoWordCommands(words, response, location, player, items, moveLocation);
    } else if (words.length === 3) {
        response = parseThreeWordCommands(command, response, location, player, items);
    }

    return response;
}

















