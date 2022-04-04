export function inspectItem(player, location, items, itemName) {
    let response = [];

    let found = false;
    items.forEach(item => {
        if ((item.name === itemName && item.location === location.name)||
            (item.name === itemName && item.location === 'player'))
        {   //found it
            response.push(`${item.longDescription}`);
            found = true;
        }
    });

    if (!found) {
        response.push(`There is no ${itemName} here`);
    }

    return response;
}