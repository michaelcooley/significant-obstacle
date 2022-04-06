import { parseOneWordCommands } from "./parseOneWordCommands";
import { parseTwoWordCommands } from "./parseTwoWordCommands";
import { parseThreeWordCommands } from "./parseThreeWordCommands";

export function GameEngine(command, location, items, moveLocation, player, damagePlayer, npcData) {
    let response = [];
    command = command.toLowerCase();
    let words = command.split(' ');

    if (words.length === 1) {
        response = parseOneWordCommands(words[0], words, response, location, player, items, moveLocation, damagePlayer);
    } else if (words.length === 2) {
        response = parseTwoWordCommands(words, response, location, player, items, moveLocation, damagePlayer, npcData);
    } else if (words.length === 3) {
        response = parseThreeWordCommands(command, response, location, player, items, damagePlayer);
    }

    return response;
}

















