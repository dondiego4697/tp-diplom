import React from 'react';
import './edit-text.scss';

export class EditText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='edit-text-container'>
                <div className='edit-text-container__align'>
                    <input style={this.props.style}
                        placeholder={this.props.ph}
                        className='edit-text-container_edit-text'
                        onChange={this.props.onChange} />
                </div>
            </div>
        );
    }
}
