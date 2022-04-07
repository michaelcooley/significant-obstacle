export function npcTalk(response, npcData) {

    let randoTalk = Math.floor(Math.random() * 100);

    if (randoTalk < npcData.percentTalk) {
        let whatToSay = Math.floor(Math.random() * npcData.sayings.length);
        response.push(`${npcData.name} says, '${npcData.sayings[whatToSay].words}'`);
    }

    return response;
}