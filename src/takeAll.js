import { changeItemLocation } from "./changeItemLocation";
import { shared } from "./shared";

export function takeAll(player, location, items, damagePlayer) {
    let response = [];

    let foundCount  = 0;
    items.forEach(item => {
        if (item.location === location.name) {   //found it
            //check weight first
            if (player.weightCarried + item.weight < shared.maxCarryWeight) {
                if (item.damage) {
                    damagePlayer(item.damage);      //if it causes damage, it never gets truly picked up
                } else {
                    changeItemLocation(items, item.name, 'player');
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
            foundCount++;
        }
    });

    if (!foundCount) {
        response.push(`There are no items here`);
    }

    return response;
}