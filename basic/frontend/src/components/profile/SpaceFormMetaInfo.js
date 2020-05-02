import React, { Component } from 'react'

class SpaceFormMetaInfo extends Component {
    onChangeName = e => this.props.onChangeState('name', e.target.value);
    onChangeDescription = e => this.props.onChangeState('description', e.target.value);

    render() {
        const { name, description } = this.props;
        return (
            <div className="space-form-meta-info-cont">
                <input className="space-form-meta-info-form-name" type="text" placeholder="Gallery name" onChange={this.onChangeName} value={name}></input>
                <div className="space-form-meta-info-form">
                    <textarea className="space-form-meta-info-form-description" placeholder="Description" onChange={this.onChangeDescription} value={description}></textarea>
                    <div className="space-form-meta-info-avatar"></div>
                </div>
            </div>
        )
    }
}

export default SpaceFormMetaInfo;
