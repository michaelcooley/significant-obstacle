import { changeItemLocation } from "./changeItemLocation";
import { shared } from "./shared";
import { takeAll } from "./takeAll";

export function takeItem(player, location, items, itemName, damagePlayer, npcData) {
    let response = [];

    if (itemName === 'all') {
        response = takeAll(player, location, items, damagePlayer);
        return response;
    }

    let found = false;
    items.forEach(item => {
        if (item.name === itemName && item.location === location.name) {   //found it

            //check weight first
            if (player.weightCarried + item.weight < shared.maxCarryWeight) {
                if (item.damage) {
                    damagePlayer(item.damage);      //if it causes damage, it never gets truly picked up
                    if (item.damage < 0) {          //if it restores help, make it vanish after one use
                        item.location = '';
                    }
                } else {
                    changeItemLocation(items, itemName, 'player');
                }
                if (item.pickupMessage && item.pickupMessage.length > 0) {
                    response.push(`${item.pickupMessage}`);
                } else {
                    response.push(`You now haz the ${item.shortDescription}`);
                }
                player.weightCarried = player.weightCarried + item.weight;
            } else {
                if (item.weight > shared.maxCarryWeight) {
                    response.push(`The ${item.shortDescription} is too heavy to lift`);
                } else {
                    response.push(`You can't carry that much`);
                }
            }
            found = true;
        }
    });

    if (!found) {   //check for npc
        if (itemName.toLowerCase() === npcData.name.toLowerCase()) {
            response.push(`${npcData.name} barks and waves a finger in your direction. I'll let you guess which finger.`);
            found = true;
        }
    }

    if (!found) {
        response.push(`The ${itemName} is not here`);
    }

    return response;
}