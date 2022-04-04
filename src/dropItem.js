import {changeItemLocation} from "./changeItemLocation";
import { dropAll } from "./dropAll";

export function dropItem(player, location, items, itemName) {
    let response = [];

    if (itemName === 'all') {
        response = dropAll(player, location, items);
        return response;
    }

    let found = false;
    items.forEach(item => {
        if (item.name === itemName && item.location === 'player') {   //found it
            changeItemLocation(items, itemName, location.name);
            found = true;
            if (item.dropMessage && item.dropMessage.length > 0) {
                response.push(`${item.dropMessage}`);
            } else {
                response.push(`${item.shortDescription} dropped`);
            }
            player.weightCarried -= item.weight;
            console.log(`player carrying: ${player.weightCarried}`)
        }
    });

    if (!found) {
        response.push(`You are not carrying ${itemName}`);
    }

    return response;
}
