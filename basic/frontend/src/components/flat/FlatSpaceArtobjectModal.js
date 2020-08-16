import React, { Component } from 'react'
import { connect } from 'react-redux'

class FlatSpaceArtobjectModal extends Component {
    render() {
        const { name, upload, description } = this.props.artObject;
        console.log(this.props)
        return (
            <div className="flat-space-modal-bg" style={{display: this.props.show ? 'flex' : 'none'}}>
                <div className="flat-space-modal-cont">
                    <div className="flat-space-modal-close" onClick={this.props.closePopup}></div>
                    <div className="flat-space-modal-content">
                        <div className="flat-space-modal-pic" style={{backgroundImage: `url('${upload}')`}}></div>
                        <div className="flat-space-modal-text-cont">
                            <div className="flat-space-modal-text-title-cont">
                                <div className="flat-space-modal-text-title">{name}</div>
                                <div className="flat-space-modal-text-icon-like"></div>
                                <div className="flat-space-modal-text-icon-bookmark"></div>
                            </div>
                            <div className="flat-space-modal-text-description">{description}</div>
                            <div className="flat-space-modal-text-button-cont">
                                <div className="flat-space-modal-text-button-ar">View AR</div>
                                <div className="flat-space-modal-text-button-buy">Purchase</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(null, null)(FlatSpaceArtobjectModal)