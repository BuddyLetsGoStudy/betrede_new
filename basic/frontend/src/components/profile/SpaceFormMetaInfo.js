import React, { Component } from 'react'
import Compressor from 'compressorjs';
class SpaceFormMetaInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            upload: ''
        };
    }

    onChangeName = e => this.props.onChangeState('name', e.target.value);

    onChangeDescription = e => this.props.onChangeState('description', e.target.value);

    imageChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        new Compressor(file, {
            quality: 0.5,
            success(result) {
   
            reader.onloadend = () => {
                const image = new Image();
                image.src = reader.result;

                image.onload = e => {
                    console.log(reader.result)
                    this.props.onChangeState('avatar', reader.result);
                }
            }
            reader.readAsDataURL(result);
            },
            error(err) {
              console.log(err.message);
            },
          })
    }

    render() {
        const { avatar, avatarFile, name, description } = this.props;
        return (
            <div className="space-form-meta-info-cont">
                <input className="space-form-meta-info-form-name" type="text" placeholder="Gallery name" onChange={this.onChangeName} value={name}></input>
                <div className="space-form-meta-info-form">
                    <textarea className="space-form-meta-info-form-description" placeholder="Description" onChange={this.onChangeDescription} value={description}></textarea>
                    <label className="space-form-meta-info-avatar" style={{backgroundImage: avatar ? `url('${avatar}')` : ''}} >
                        <div className="space-form-meta-info-avatar-hover"><div className="space-form-meta-info-avatar-hover-arrow"></div> Update<br></br> Avatar</div>
                        <input type="file" name="upload" onChange={this.imageChange} accept="image/*"/>
                    </label>
                </div>
            </div>
        )
    }
}

export default SpaceFormMetaInfo;
