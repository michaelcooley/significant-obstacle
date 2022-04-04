export function changeItemLocation(items, itemName, locationName) {
    items.forEach(item => {
        if (item.name === itemName) {   //found it
            item.location = locationName;
        }
    });
}