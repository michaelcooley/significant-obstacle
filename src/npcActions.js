
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

  if (randoPickup < npcData.percentPickup) console.log('time for npc to pick up something');
  if (randoDrop < npcData.percentDrop) console.log('time for npc to drop something');

  //or--if in same location as player--randomly say things
  return location;
}