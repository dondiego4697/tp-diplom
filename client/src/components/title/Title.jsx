import React from 'react';
import './title.scss';

export class Title extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='title-block'>
                <svg viewBox="0 0 960 300">
                    <symbol id="s-text">
                        <text textAnchor="middle" x="50%" y="80%">FACE TRANSFER</text>
                    </symbol>

                    <g className="g-ants">
                        <use href="#s-text" className="text-copy"/>
                        <use href="#s-text" className="text-copy"/>
                        <use href="#s-text" className="text-copy"/>
                        <use href="#s-text" className="text-copy"/>
                        <use href="#s-text" className="text-copy"/>
                    </g>
                </svg >
            </div >
        );
    }
}