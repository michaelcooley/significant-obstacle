export function describeExits(currentLoc) {
   let exits = '';
   if (currentLoc.exits.length > 0) {
        let count = 0;
        if (currentLoc.exits.length === 1) {
            exits = 'There is an exit leading ';
        } else {
            exits = 'There are exits to the ';
        }
        for (const oneExit of currentLoc.exits) {
            exits += oneExit.name;
            count++;
            if (count < currentLoc.exits.length) exits += ' and ';
        }
        exits += '.';
    } else {
        exits = 'There are no exits';
    }
  return exits;
}