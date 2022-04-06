
export function fightItem(player, location, items, itemName, damagePlayer, npcData) {
    let response = [];
    let found = false;

    items.forEach(item => {
        if (item.name === itemName && (item.location === location.name || item.location === 'player')) {   //found it
            response.push(`The ${item.shortDescription} is a pacifist and refuses to fight back.`);
            found = true;
        }
    });

    if (!found) {   //check for npc
        if (itemName.toLowerCase() === npcData.name.toLowerCase()) {
            response.push(`${npcData.name} laughs so hard he starts to choke.`);
            found = true;
        }
    }

    if (!found) {
        response.push(`You can't fight something that isn't here.`);
    }

    return response;
}