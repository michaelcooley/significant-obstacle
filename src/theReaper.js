import React from 'react';

export function TheReaper(props) {
    if (props.death) {
        return <div className="the-reaper-banner-container">
            YOU ARE DEAD!! AS A DOORKNOB!! YOU HAVE FAILED!!
        </div>
    } else {
        return <div></div>
    }

}