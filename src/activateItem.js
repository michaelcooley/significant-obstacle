export function activateItem(player, location, items, itemName, moveLocation) {
    let response = [];
    let activated = false;
    let found = false;
    let newLocation = '';
    let newParser = '';
    items.forEach(item => {
        if (item.name === itemName && item.location === 'player') {   //found it
            found = true;
            if (item.use) {
                if (item.use.where === location.name) {
                    response.push(`${item.use.useMessage}`);
                    response.push(``);
                    if (item.use.newLocation)  {
                        newLocation = item.use.newLocation;
                    }
                    if (item.use.newItem) {
                        items.forEach(oneItem => {
                            if (oneItem.name === item.use.newItem) {
                                oneItem.location = location.name;
                            }
                        });
                    }
                    if (item.use.parser) {
                        newParser = item.use.parser;
                    }
                    activated = true;
                    return;
                } else {
                    response.push(`You can't use the ${item.shortDescription} here`);
                }
            } else {
                response.push(`${item.shortDescription} is not useable`);
            }
        }
    });

    if (!found) {
        response.push(`You are not carrying ${itemName}`);
    }
    if (activated) {
        moveLocation(newLocation, response, 10, newParser);
        return;
    }

    return response;
}