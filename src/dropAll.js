import {changeItemLocation} from "./changeItemLocation";

export function dropAll(player, location, items) {
    let response = [];

    let foundCount = 0;
    items.forEach(item => {
        if (item.location === 'player') {   //found it
            changeItemLocation(items, item.name, location.name);
            foundCount++;
            if (item.dropMessage && item.dropMessage.length > 0) {
                response.push(`${item.dropMessage}`);
            } else {
                response.push(`${item.shortDescription} dropped`);
            }
            player.weightCarried -= item.weight;
        }
    });

    if (!foundCount) {
        response.push(`You are not carrying anything`);
    }

    return response;
}