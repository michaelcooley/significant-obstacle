import {dropItem} from "./dropItem";
import {takeItem} from "./takeItem";
import {takeExit} from "./takeExit";
import {inspectItem} from "./inspectItem";
import {activateItem} from "./activateItem";
import { shared } from "./shared";

export function parseTwoWordCommands(words, response, location, player, items, moveLocation) {
    switch (words[0]) {
        case 'drop':
        case 'throw':
            response = dropItem(player, location, items, words[1]);
            break;
        case 'get':
        case 'take':
            response = takeItem(player, location, items, words[1]);
            break;
        case 'go':
        case 'walk':
        case 'run':
            response = takeExit(location, words[1], moveLocation);
            break;
        case 'examine':
        case 'inspect':
            response = inspectItem(player, location, items, words[1]);
            break;
        case 'use':
            response = activateItem(player, location, items, words[1], moveLocation);
            break;
        default:
            console.log(shared.unrecognizedCommand);
            response.push(shared.unrecognizedCommand);
    }
    return response;
}