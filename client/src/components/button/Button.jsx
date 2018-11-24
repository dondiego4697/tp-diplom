import React from 'react';
import './button.scss';

export class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='button-container'>
                <div className='button-container__align'>
                    <button onClick={this.props.onClick}
                        style={this.props.style}
                        className='button-container_button'>
                        {this.props.value}
                    </button>
                </div>
            </div>
        );
    }
}
