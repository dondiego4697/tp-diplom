import React from 'react';
import './file-uploader.scss';

export class FileUploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            imageSrc: `${window.globalData.path.img}/icon/upload.png`,
            loaded: false
        };

        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onDragEnter(e) {
        this.setState({ active: true });
    }

    onDragLeave(e) {
        this.setState({ active: false });
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e) {
        e.preventDefault();
        this.setState({ active: false });
        this.onFileChange(e, e.dataTransfer.files[0]);
    }

    onFileChange(e, file) {
        file = file || e.target.files[0];
        const pattern = /image-*/;
        const reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('Formato inválido');
            return;
        }

        this.setState({ loaded: false });

        reader.onload = (e) => {
            this.setState({
                imageSrc: reader.result,
                loaded: true
            });
        }

        reader.readAsDataURL(file);

        this.props.onChange.call(this, this);
    }

    getFileObject() {
        return this.refs.input.files[0];
    }

    getFileString() {
        return this.state.imageSrc;
    }

    render() {
        const state = this.state;
        const props = this.props;
        const labelClass = `uploader ${state.loaded && 'loaded'}`;
        const borderColor = state.active ? props.activeColor : props.baseColor;
        const iconColor = state.active ? props.activeColor : (state.loaded) ? props.overlayColor : props.baseColor;

        return (
            <label
                className={`${labelClass} ${this.props.className}`}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                style={{ outlineColor: borderColor }}>

                <p className='loader-title'>{this.props.title}</p>
                <img src={state.imageSrc} className={state.loaded ? 'loaded' : ''}/>
                <i className='icon icon-upload'
                    style={{ color: iconColor }}></i>
                <input type='file' accept='image/*"' onChange={this.onFileChange} ref='input'/>
            </label>
        );
    }
}
