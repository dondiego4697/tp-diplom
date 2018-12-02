import React from 'react';
import './description.scss';
import { Button } from '../button/Button.jsx';
import scrollToElement from 'scroll-to-element';

export class Description extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='description'>
                <p>
                    You can create your own image of any of your idol.
                    Just upload your photo and a photo of someone you want to be like,
                    then we will do everything for you.
                </p>
                <h1>Examples</h1>
                <div className='row'>
                    <div className='col-sm-4'>
                        <div className='item'>
                            <img src='/build/res/img/example1/base.jpeg'/>
                            <h6>Base</h6>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className='item'>
                            <img src='/build/res/img/example1/style.jpg'/>
                            <h6>Style</h6>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className='item'>
                            <img src='/build/res/img/example1/result.jpeg'/>
                            <h6>Result</h6>
                        </div>
                    </div>

                    <div className='col-sm-4'>
                        <div className='item'>
                            <img src='/build/res/img/example2/base.jpeg'/>
                            <h6>Base</h6>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className='item'>
                            <img src='/build/res/img/example2/style.jpeg'/>
                            <h6>Style</h6>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className='item'>
                            <img src='/build/res/img/example2/result.png'/>
                            <h6>Result</h6>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
