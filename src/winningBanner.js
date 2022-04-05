import React from 'react';

export function WinningBanner(props) {
    if (props.gameOver) {
        return <div className="winning-banner-container">
            WINNER!! WINNER!! CHICKEN DINNER!! WATCH FOR CARS!!
        </div>
    } else {
        return <div></div>
    }

}