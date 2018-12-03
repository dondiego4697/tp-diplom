import React from 'react';
import './button.scss';
import XButton from 'react-button-component';


export class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='button-container'>
                <XButton style={this.props.style} className='butn butn-bg' onClick={() => {
                    this.props.onClick();
                }}>
                    <span>{this.props.text}</span>
                </XButton>
            </div>
        );
    }
}
