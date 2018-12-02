import React from 'react';
import './main.scss';
import { Header } from '../../src/components/header/Header.jsx';
import { Button } from '../../src/components/button/Button.jsx';
import { EditText } from '../../src/components/edit-text/EditText.jsx';
import * as axios from 'axios';
import 'react-block-ui/style.css';
import { Description } from '../../src/components/description/Description.jsx';


export default class Main extends React.Component {
    constructor(props) {
        super(props);

        /* this._fileUploaderProps = {
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
        this._onStyleImageChange = this._onStyleImageChange.bind(this); */
    }

    render() {
        return (<div>
            <div id="main-section">
                <div className="container">
                    <Header />
                </div>
                <div className="bg-container"></div>
            </div>
            <div id="description-section">
                <Description/>
            </div>
            <div id="try-section">

            </div>
        </div>);
    }

    /* _toggleBlocking() {
        this.setState({
            blocking: !this.state.blocking
        });
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
    } */
}
