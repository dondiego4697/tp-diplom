import React from 'react';
import './try.scss';
import { Button } from '../button/Button.jsx';
import {FileUploader} from '../file-uploader/FileUploader.jsx';
import { EditText } from '../edit-text/EditText.jsx';
import * as axios from 'axios';
import { ToastStore } from 'react-toasts';


export class Try extends React.Component {
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
            email: null
        };

        this._onSubmit = this._onSubmit.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onBaseImageChange = this._onBaseImageChange.bind(this);
        this._onStyleImageChange = this._onStyleImageChange.bind(this);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='try'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <FileUploader title='BASE' id='imgBase' className='uploader-right'
                            props={this._fileUploaderProps} onChange={this._onBaseImageChange} />
                    </div>
                    <div className='col-sm-6'>
                        <FileUploader title='STYLE' id='imgStyle' className='uploader-left'
                            props={this._fileUploaderProps} onChange={this._onStyleImageChange} />
                    </div>
                    <div className='col-sm-6'>

                    </div>
                    <div className='col-sm-6' style={{display: 'flex'}}>
                        <div className='btn-container'>
                            <EditText ph='email'
                                onChange={this._onChange}
                                style={{width: 306}}/>
                            <Button text="Send" style={{margin: 0, width: 306}} onClick={this._onSubmit}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _toggleBlocking() {
        this.props.changeBlocking();
    }

    _onSubmit() {
        if (this.state.email && this.state.base && this.state.style) {
            this._toggleBlocking();
            this._sendImages().then((res) => {
                setTimeout(() => {
                    this._toggleBlocking();
                    if (!res.data) {
                        ToastStore.error('You have errors in data');
                    } else {
                        ToastStore.success('Result image will send you on email');
                    }
                }, 1500);
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
                return Promise.resolve({ data: null });
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
