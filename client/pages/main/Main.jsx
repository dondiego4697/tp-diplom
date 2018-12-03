import React from 'react';
import './main.scss';
import { Header } from '../../src/components/header/Header.jsx';
import 'react-block-ui/style.css';
import { Description } from '../../src/components/description/Description.jsx';
import { Try } from '../../src/components/try/Try.jsx';
import { ToastContainer, ToastStore } from 'react-toasts';
import BlockUi from 'react-block-ui';


export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blocking: false
        };

        this._changeBlocking = this._changeBlocking.bind(this);
    }

    render() {
        return (<div>
            <BlockUi style={{
                display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
                position: 'fixed', top: 0, left: 0
            }} tag="div" blocking={this.state.blocking}></BlockUi>
            <ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_RIGHT} lightBackground />
            <div id="main-section">
                <div className="container">
                    <Header />
                </div>
                <div className="bg-container"></div>
            </div>
            <div id="description-section">
                <Description />
            </div>
            <div id="try-section">
                <Try changeBlocking={this._changeBlocking} />
            </div>
        </div>);
    }

    _changeBlocking() {
        this.setState({
            blocking: !this.state.blocking
        });
    }
}
