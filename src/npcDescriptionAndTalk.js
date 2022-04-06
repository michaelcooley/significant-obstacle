export function npcDescriptionAndTalk(npcData) {

    let response = [];

    response.push(`${npcData.name} is here.`);

    let randoTalk = Math.floor(Math.random() * 100);

    console.log(`randotalk ${randoTalk}`);
    if (randoTalk < npcData.percentTalk) {

        let whatToSay = Math.floor(Math.random() * npcData.sayings.length);
        console.log(`what to say  ${whatToSay}`);
        response.push(`${npcData.name} says, '${npcData.sayings[whatToSay].words}'`);
    }

    return response;
}