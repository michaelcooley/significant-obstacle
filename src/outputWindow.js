import React from 'react';

export function OutputWindow(props) {

    let outputList = props.outputList;

    let index = 0;
    const listItems = outputList.map((line) =>
        <li value={index++} >{line}</li>
    );

    return <div class="output-window-container">
        <ol class="list-no-bullets">
            {listItems}
        </ol>
    </div>
}
