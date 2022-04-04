import { describePlayer } from "./describePlayer";
import { describeLocation } from "./describeLocation";
import { shared } from "./shared";

export function parseThreeWordCommands(command, response, location, player, items) {
    switch (command) {
        case 'who am i':
        case 'who am i?':
            console.log('command is recognized');
            response = describePlayer(player);
            break;
        case 'where am i':
        case 'where am i?':
            console.log('command is recognized');
            response = describeLocation(location, items);
            break;
        default:
            console.log(shared.unrecognizedCommand);
            response.push(shared.unrecognizedCommand);
    }
    return response;
}