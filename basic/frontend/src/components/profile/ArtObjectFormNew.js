import React, { Component } from 'react';
import ArtObjectFormModal from "./ArtObjectFormModal";

class ArtObjectFormNew extends Component {
    constructor(props){
        super(props) 
        this.state = {
            showModal: false,
            positionID: '',
            positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
      }

    closeModal = () => {
        this.setState({showModal: false});
        document.body.style.height = 'auto';
        document.body.style.overflowY = 'auto';
    }

    onCreated = (url, id) => {
        const elem = document.getElementById(this.state.positionID);
        elem.style.cssText = `background-image: url('${url}'); background-size: cover; max-height: 100%; max-width: 100%;`;
        this.setState(prevState => {
            let temp = prevState.positions;
            temp[prevState.positionID - 1] = id;
            return ({positions: temp})
        }, this.props.onChangeState('artObjects', this.state.positions))
        this.closeModal();
        
    };

    addArtwork = e => {
        this.setState({showModal: true, positionID: e.target.id})
        document.body.style.height = '100vh';
        document.body.style.overflowY = 'hidden';
    }

    render() {
        const { showModal } = this.state;
        return (
            <div className="artobject-form-cont">
                <div className="artobject-form-row">
                    <div className="artobject-form-add-pic-cont">
                        <div className="artobject-form-add-pic" id="1" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                        <div className="artobject-form-add-pic" id="2" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                        <div className="artobject-form-add-pic" id="3" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                    </div>

                    <div className="artobject-form-add-model"></div>

                    <div className="artobject-form-add-pic-cont">
                        <div className="artobject-form-add-pic" id="4" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                        <div className="artobject-form-add-pic" id="5" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                        <div className="artobject-form-add-pic" id="6" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                    </div>
                </div>
                <div className="artobject-form-row">
                    <div className="artobject-form-add-model"></div>
                    <div className="artobject-form-add-model"></div>
                    <div className="artobject-form-add-model"></div>
                </div>
                <div className="artobject-form-row">
                    <div className="artobject-form-add-pic-cont">
                        <div className="artobject-form-add-pic" id="7" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                        <div className="artobject-form-add-pic" id="8" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                        <div className="artobject-form-add-pic" id="9" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                    </div>

                    <div className="artobject-form-add-model"></div>

                    <div className="artobject-form-add-pic-cont">
                        <div className="artobject-form-add-pic" id="10" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                        <div className="artobject-form-add-pic" id="11" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                        <div className="artobject-form-add-pic" id="12" onClick={this.addArtwork}>
                            <div className="artobject-form-add-pic-alt">add artwork</div>
                        </div>
                    </div>
                </div>
                <div className="artobject-form-plushover"></div>
                { showModal && <ArtObjectFormModal onClose={this.closeModal} onCreated={this.onCreated} /> }
            </div>
        )
    }
}

export default ArtObjectFormNew;
