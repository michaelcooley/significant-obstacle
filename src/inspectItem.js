import {examineNPC} from "./examineNPC";

export function inspectItem(player, location, items, itemName, npcData) {
    let response = [];

    let found = false;
    items.forEach(item => {
        if ((item.name === itemName && item.location === location.name)||
            (item.name === itemName && item.location === 'player'))
        {   //found it
            response.push(`${item.longDescription}`);
            found = true;
        }
    });

    if (!found) {   //see if it's the NPC
        if (itemName.toLowerCase() === npcData.name.toLowerCase()) {
            response = examineNPC(true, npcData, items, response);
            found = true;
        }
    }

    if (!found) {
        response.push(`There is no ${itemName} here`);
    }

    return response;
}