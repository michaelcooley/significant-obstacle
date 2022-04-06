export function npcInventory(response, npcData, items) {

    let info = `${npcData.name} is carrying `;
    let count = 0;
    let itemNames = [];
    items.forEach(item => {
        if (item.location === 'npc') {
            count++;
            itemNames.push(item.shortDescription);
        }
    });

    if (count === 0) {
        info += 'nothing';
    } else {
        let index = 0;
        itemNames.forEach(item => {
            info += `a ${item}`;
            if (index < itemNames.length - 1) info += ' and ';
            index++;
        });
    }

    response.push(info);
    return response;
}