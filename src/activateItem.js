export function activateItem(player, location, items, itemName, moveLocation) {
    let response = [];
    let activated = false;
    let found = false;
    let newLocation = '';
    items.forEach(item => {
        if (item.name === itemName && item.location === 'player') {   //found it
            found = true;
            console.log(`found ${itemName} on player`);
            if (item.use) {
                console.log(`item has use`);
                if (item.use.where === location.name) {
                    console.log(`using item at right place`);
                    response.push(`${item.use.useMessage}`);
                    response.push(``);
                    if (item.use.newLocation)  {
                        newLocation = item.use.newLocation;
                        console.log(`changing to new location ${item.use.newLocation}`);
                    }
                    if (item.use.newItem) {
                        console.log(`using new Item`);
                        items.forEach(oneItem => {
                            if (oneItem.name === item.use.newItem) {
                                oneItem.location = location.name;
                                console.log(`moving ${oneItem.name} to current location ${item.location}`);
                            }
                        });
                    }
                    activated = true;
                    return;
                } else {
                    console.log(`using item at wrong place`);
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
        moveLocation(newLocation, response, 10);
        return;
    }

    return response;
}