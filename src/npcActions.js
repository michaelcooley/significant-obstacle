
export function npcActions(currentNPCLocation, npcData, locations, items) {

  let location = currentNPCLocation;

  let randoMove = Math.floor(Math.random() * 100);
  let randoPickup = Math.floor(Math.random() * 100);
  let randoDrop = Math.floor(Math.random() * 100);

  if (randoMove < npcData.percentMovement) {
    let where = Math.floor(Math.random() * locations.length);
    console.log(`npc moving to ${locations[where].name}`);
    location = locations[where];
  }

  if (randoPickup < npcData.percentPickup) {
    let pickedUp = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].location === currentNPCLocation.name) { //found item here, pick it up -- always pick up first item found
        items[i].location = 'npc';
        pickedUp = true;
        console.log(`npc picked up ${items[i].name}`);
        break;
      }
    }
    if (!pickedUp) console.log('npc found nothing to pick up');
  }

  if (randoDrop < npcData.percentDrop) {
    let dropped = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].location === 'npc' && items[i].name !== npcData.retainItem) { //found item npc is carrying
        items[i].location = currentNPCLocation.name;
        dropped = true;
        console.log(`npc dropped ${items[i].name} at ${currentNPCLocation.name}`);
        break;
      }
    }
    if (!dropped) console.log('npc found nothing to drop');
  }
  return location;
}