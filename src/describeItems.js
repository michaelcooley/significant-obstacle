export function describeItems(items, currentLoc, response) {
    items.forEach(item => {
        if (item.location === currentLoc.name) {
            response.push(`There is a ${item.shortDescription} here`);
        }
    });
}