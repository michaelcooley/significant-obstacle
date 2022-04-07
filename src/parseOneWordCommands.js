import { describeLocation } from "./describeLocation";
import { takeExit } from "./takeExit";
import { listInventory } from "./listInventory";
import { shared } from "./shared";

export function parseOneWordCommands(word, words, response, location, player, items, moveLocation, damagePlayer, currentNPCLocation, npcData, quitInProgress, quitInProgressState, endGame) {

    if (quitInProgressState) {
        if (words[0] === 'y' || words[0] === 'yes') {
            response.push(`Farewell, old friend...`);
            endGame();
        } else {
            quitInProgress(false);
            response.push(`Alrighty, then...`);
        }
        return response;
    }
    switch (words[0]) {
        case 'look':
        case 'l':
            response = describeLocation(location, currentNPCLocation, npcData, items);
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
        case 'swim':
            response.push(`Who do you think you are, Jacques Clouseau?`);
            break;
        case 'jump':
            response.push(`You get one foot off the ground, but the other one refuses for religious reasons.`);
            break;
        case 'fight':
            response.push(`You punch yourself in the face and then yell, 'are you threatening me?!'`);
            break;
        case 'q':
        case 'quit':
            response.push('Are you sure you want to give up so easily?');
            quitInProgress(true);
            break;
        default:
            response.push(shared.unrecognizedCommand);
    }
    return response;
}