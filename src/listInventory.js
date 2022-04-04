export function listInventory(player, items) {
    let response = [];

    let info = "You are carrying ";
    let count = 0;
    let itemNames = [];
    items.forEach(item => {
        if (item.location === 'player') {
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