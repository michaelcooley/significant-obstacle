import { changeItemLocation } from "./changeItemLocation";
import { shared } from "./shared";
import { takeAll } from "./takeAll";

export function takeItem(player, location, items, itemName, damagePlayer) {
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
                } else {
                    changeItemLocation(items, itemName, 'player');
                }
                if (item.pickupMessage && item.pickupMessage.length > 0) {
                    response.push(`${item.pickupMessage}`);
                } else {
                    response.push(`${item.shortDescription} taken`);
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

    if (!found) {
        response.push(`${itemName} is not here`);
    }

    return response;
}