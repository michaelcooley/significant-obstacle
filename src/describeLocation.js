import { describeExits } from "./describeExits";
import { describeItems } from "./describeItems";
import {examineNPC} from "./examineNPC";

export function describeLocation(currentLoc, currentNPCLocation, npcData, items) {

    let response = [];

    response.push(currentLoc.longDescription);

    let exits = describeExits(currentLoc);
    response.push('');  //add blank line
    response.push(exits);
    response.push('');  //add blank line
    describeItems(items, currentLoc, response);

    if (currentNPCLocation.name === currentLoc.name) { //if NPC is here, say so
        response = examineNPC(false, npcData, items, response)
    }

    return response;
}