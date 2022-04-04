export function takeExit(currentLoc, direction, moveLocation) {
    let response = [];

    if (direction === 'e') direction = 'east';
    if (direction === 'w') direction = 'west';
    if (direction === 'n') direction = 'north';
    if (direction === 's') direction = 'south';
    if (direction === 'u') direction = 'up';
    if (direction === 'd') direction = 'down';

    let found = false;
    for (const oneExit of currentLoc.exits) {
        if (oneExit.name === direction) {
            moveLocation(oneExit.linksTo);
            found = true;
        }
    }

    if (!found) response.push('There is no exit by that name');
    return response;
}