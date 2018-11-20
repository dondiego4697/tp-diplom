import React from 'react';
import './main.scss';
import { FileUploader } from '../../src/components/file-uploader/FileUploader.jsx';
import { Button } from '../../src/components/button/Button.jsx';
import { EditText } from '../../src/components/edit-text/EditText.jsx';
import { ToastContainer, ToastStore } from 'react-toasts';
import * as axios from 'axios';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';


export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this._fileUploaderProps = {
            baseColor: 'gray',
            activeColor: 'green',
            overlayColor: 'rgba(255,255,255,0.3)'
        };

        this.state = {
            base: null,
            style: null,
            email: null,
            blocking: false
        };

        this._onSubmit = this._onSubmit.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onBaseImageChange = this._onBaseImageChange.bind(this);
        this._onStyleImageChange = this._onStyleImageChange.bind(this);
    }

    render() {
        return (<div style={{ width: '100%', height: '100%' }}>
            <BlockUi style={{ display: 'flex', height: '100%' }} tag="div" blocking={this.state.blocking}>
                <div className="main-panel">
                    <div className='main-panel_img-container'>
                        <FileUploader title="Base image" id="imgBase"
                            props={this._fileUploaderProps} onChange={this._onBaseImageChange} />
                        <FileUploader title="Image with style" id="imgStyle"
                            props={this._fileUploaderProps} onChange={this._onStyleImageChange} />
                    </div>
                    <Button value='Send' style={{ margin: '0 15px 5px 15px', float: 'right' }}
                        onClick={this._onSubmit} />
                    <EditText ph='email' onChange={this._onChange} style={{ margin: '0 0 15px 5px', float: 'right' }} />
                    <ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_RIGHT} lightBackground />
                </div>
            </BlockUi>
        </div>);
    }

    _toggleBlocking() {
        this.setState({
            blocking: !this.state.blocking
        });
    }

    _onSubmit() {
        if (this.state.email && this.state.base && this.state.style) {
            this._toggleBlocking();
            this._sendImages().then((res) => {
                this._toggleBlocking();
                if (!res.data) {
                    ToastStore.error('You have errors in data');
                } else {
                    ToastStore.success('Result image will send you on email');
                }
            });
        } else {
            ToastStore.error('Fill all fields');
        }
    }

    _sendImages() {
        const processUrl = 'http://gpu-external01.i.smailru.net:5000/process';
        const data = new FormData();

        data.append('input', this.state.base);
        data.append('style', this.state.style);

        return axios.request({
            method: 'post',
            url: processUrl,
            data: data,
            withCredentials: true
        }).then((res) => {
            if (res.status === 201) {
                return axios.request({
                    method: 'get',
                    url: `/add-request?id=${res.data}&mail=${this.state.email}`
                })
            } else {
                return Promise.resolve({data: null});
            }
        });
    }

    _onChange(el) {
        this.setState({
            email: el.target.value
        })
    }

    _onBaseImageChange(el) {
        this.setState({
            base: el.getFileObject()
        });
    }

    _onStyleImageChange(el) {
        this.setState({
            style: el.getFileObject()
        });
    }
}
