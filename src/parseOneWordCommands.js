import { describeLocation } from "./describeLocation";
import { takeExit } from "./takeExit";
import { listInventory } from "./listInventory";
import { shared } from "./shared";

export function parseOneWordCommands(word, words, response, location, player, items, moveLocation) {
    switch (words[0]) {
        case 'look':
        case 'l':
            console.log('command is recognized');
            response = describeLocation(location, items);
            break;
        case 'e':
        case 'east':
        case 'w':
        case 'west':
        case 'n':
        case 'north':
        case 's':
        case 'south':
        case 'u':
        case 'up':
        case 'd':
        case 'down':
            response = takeExit(location, words[0], moveLocation);
            break;
        case 'i':
        case 'inventory':
            response = listInventory(player, items);
            break;
        default:
            console.log(shared.unrecognizedCommand);
            response.push(shared.unrecognizedCommand);
    }
    return response;
}