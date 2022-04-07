import {npcInventory} from "./npcInventory";
import {npcTalk} from "./npcTalk";

export function examineNPC(verbose, npcData, items, response) {
    if (verbose) {
        response.push(`${npcData.name} is ${npcData.description} and ${npcData.extraDetail}`);
    } else {
        response.push(`${npcData.name} is here.`);
    }
    response = npcInventory(response, npcData, items);
    response = npcTalk(response, npcData);
    return response;
}