import React from 'react';
import '../../styles/not-found.css';

export default function Custom404() {
    return (
        <div className="room">
            <div className="cuboid">
                <div className="side"></div>
                <div className="side"></div>
                <div className="side"></div>
            </div>
            <div className="oops">
                <h2>OOPS!</h2>
                <p>We can't find the page that you're looking for :(</p>
            </div>
            <div className="center-line">
                <div className="hole">
                    <div className="ladder-shadow"></div>
                    <div className="ladder"></div>
                </div>
                <div className="four">4</div>
                <div className="four">4</div>
                <div className="btn">
                    <a href="/">BACK TO HOME</a>
                </div>
            </div>
        </div>
    )
}