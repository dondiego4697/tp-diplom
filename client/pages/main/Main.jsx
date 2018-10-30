import React from 'react';
import './main.scss';
import { FileUploader } from '../../src/components/file-uploader/FileUploader.jsx';
import { Button } from '../../src/components/button/Button.jsx';
import { EditText } from '../../src/components/edit-text/EditText.jsx';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this._fileUploaderProps = {
            baseColor: 'gray',
            activeColor: 'green',
            overlayColor: 'rgba(255,255,255,0.3)'
        };

        this._onSubmit = this._onSubmit.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    render() {
        return (<div className="main-panel">
            <div className='main-panel_img-container'>
                <FileUploader id="img1" props={this._fileUploaderProps} />
                <FileUploader id="img2" props={this._fileUploaderProps} />
            </div>
            <Button value='Отправить' style={{margin: '0 15px 5px 5px', float: 'right'}}
                onClick={this._onSubmit}/>
            <EditText ph='email' onChange={this._onChange} style={{margin: '0 0 5px 5px', float: 'right'}}/>
        </div>);
    }

    _onSubmit() {
        console.log(123);
    }

    _onChange(el) {
        console.log(el.target.value);
    }
}
