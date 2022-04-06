import {npcInventory} from "./npcInventory";
import {npcDescriptionAndTalk} from "./npcDescriptionAndTalk";

export function examineNPC(npcData, items, response) {
    response.push(`${npcData.name} is ${npcData.description} and ${npcData.extraDetail}`);
    response = npcInventory(response, npcData, items);
    response = npcDescriptionAndTalk(response, npcData);
    return response;
}