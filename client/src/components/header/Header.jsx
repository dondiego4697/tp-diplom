import React from 'react';
import './header.scss';
import * as particlesJs from 'particles.js';
import { Button } from '../button/Button.jsx';
import scrollToElement from 'scroll-to-element';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        particlesJS.load('particles-js', '/build/res/configs/particles.json', function () {});
    }

    render() {
        return (
            <div className='header'>
                <div id="particles-js"></div>
                <div className='header-container'>
                    <h4>We Are Creative</h4>
                    <h1>Fac<span style={{ color: '#2AAFC0' }}>e</span> Transfer Service</h1>
                    <Button text="Let's start" style={{marginTop: 20}} onClick={() => {
                        scrollToElement('#description-section', {
                            offset: 0,
                            ease: 'out-bounce',
                            duration: 1500
                        });
                    }}/>
                </div>
            </div>
        );
    }
}
