import { changeItemLocation } from "./changeItemLocation";
import { shared } from "./shared";
import { takeAll } from "./takeAll";

export function takeItem(player, location, items, itemName) {
    let response = [];

    if (itemName === 'all') {
        response = takeAll(player, location, items);
        return response;
    }

    let found = false;
    items.forEach(item => {
        if (item.name === itemName && item.location === location.name) {   //found it

            //check weight first
            console.log(`player carrying ${player.weightCarried}`);
            if (player.weightCarried + item.weight < shared.maxCarryWeight) {
                changeItemLocation(items, itemName, 'player');
                if (item.pickupMessage && item.pickupMessage.length > 0) {
                    response.push(`${item.pickupMessage}`);
                } else {
                    response.push(`${item.shortDescription} taken`);
                }
                player.weightCarried = player.weightCarried + item.weight;
                console.log(`player carrying: ${player.weightCarried}`);
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