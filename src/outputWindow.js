import React from 'react';

export function OutputWindow(props) {

    let outputList = props.outputList;

    let index = 0;
    const listItems = outputList.map((line) =>
        <li key={index++} >{line}</li>
    );

    return <div className="output-window-container">
        <ol className="list-no-bullets">
            {listItems}
        </ol>
    </div>
}
