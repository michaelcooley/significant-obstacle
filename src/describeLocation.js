import { describeExits } from "./describeExits";
import { describeItems } from "./describeItems";

export function describeLocation(currentLoc, items) {
    let response = [];

    response.push(currentLoc.longDescription);

    let exits = describeExits(currentLoc);
    response.push('');  //add blank line
    response.push(exits);
    response.push('');  //add blank line
    describeItems(items, currentLoc, response);

    return response;
}