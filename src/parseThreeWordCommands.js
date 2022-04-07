import { describePlayer } from "./describePlayer";
import { describeLocation } from "./describeLocation";
import { shared } from "./shared";

export function parseThreeWordCommands(command, response, location, player, items, currentNPCLocation, npcData) {
    switch (command) {
        case 'who am i':
        case 'who am i?':
            response = describePlayer(player);
            break;
        case 'where am i':
        case 'where am i?':
            response = describeLocation(location, currentNPCLocation, npcData, items);
            break;
        default:
            response.push(shared.unrecognizedCommand);
    }
    return response;
}