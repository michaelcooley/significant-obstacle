import { changeItemLocation } from "./changeItemLocation";
import { shared } from "./shared";
import { takeAll } from "./takeAll";

export function eatItem(player, location, items, itemName, damagePlayer) {
    let response = [];

    if (itemName === 'all') {
        response.push(`You're not that hungry.`);
        return response;
    }

    let found = false;
    items.forEach(item => {
        if (item.name === itemName && (item.location === location.name || item.location === 'player')) {   //found it
           response.push(`The ${item.shortDescription} disagrees with you, so you stop chewing on it.`);
           found = true;
        }
    });

    if (!found) {
        response.push(`You can't eat something that isn't here.`);
    }

    return response;
}