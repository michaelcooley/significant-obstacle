import {npcInventory} from "./npcInventory";

export function describeNPC(npcData, items, response) {
    response.push(`${npcData.name} is ${npcData.description} and ${npcData.extraDetail}`);
    response = npcInventory(response, npcData, items);
    return response;
}