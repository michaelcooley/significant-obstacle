import {dropItem} from "./dropItem";
import {takeItem} from "./takeItem";
import {takeExit} from "./takeExit";
import {inspectItem} from "./inspectItem";
import {activateItem} from "./activateItem";
import {eatItem} from "./eatItem";
import { shared } from "./shared";

export function parseTwoWordCommands(words, response, location, player, items, moveLocation, damagePlayer, npcData) {
    switch (words[0]) {
        case 'drop':
        case 'throw':
            response = dropItem(player, location, items, words[1]);
            break;
        case 'get':
        case 'take':
            response = takeItem(player, location, items, words[1], damagePlayer, npcData);
            break;
        case 'go':
        case 'walk':
        case 'run':
            response = takeExit(location, words[1], moveLocation);
            break;
        case 'examine':
        case 'inspect':
            response = inspectItem(player, location, items, words[1], npcData);
            break;
        case 'use':
            response = activateItem(player, location, items, words[1], moveLocation);
            break;
        case 'eat':
            response = eatItem(player, location, items, words[1], damagePlayer);
            break;
        default:
            response.push(shared.unrecognizedCommand);
    }
    return response;
}