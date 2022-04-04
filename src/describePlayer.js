export function describePlayer(player) {
    let response = [];
    response.push(`Your name is ${player.name}`);
    response.push(`You are a ${player.description}`);
    response.push(`You are ${player.height} tall and weigh ${player.weight}`);
    response.push(player.extraDetail);
    return response;
}