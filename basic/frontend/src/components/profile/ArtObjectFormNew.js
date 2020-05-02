import React, { Component } from 'react';
import ArtObjectFormModal from "./ArtObjectFormModal";
import axios from 'axios'
import { connect } from 'react-redux'
import { deleteArtObject } from '../../actions/artspace'

class ArtObjectFormNew extends Component {
    constructor(props){
        super(props) 
        this.state = {
            showModal: false,
            positionID: '',
            positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            edit: false,
            artObject: {}
        };
    }

    closeModal = () => {
        this.setState({showModal: false, artObject: {}});
        document.body.style.height = 'auto';
        document.body.style.overflowY = 'auto';
    };

    onCreated = (url, id) => {
        const elem = document.getElementById(this.state.positionID);
        elem.style.cssText = `background-image: url('${url}'); background-size: cover; max-height: 100%; max-width: 100%;`;
        this.setState(prevState => {
            let temp = prevState.positions;
            temp[prevState.positionID - 1] = id;
            return ({positions: temp, artObject: {}})
        }, this.props.onChangeState('artObjects', this.state.positions));
        this.closeModal();
    };

    addArtwork = e => {
        const { id } = e.currentTarget;
        const { positions } = this.state;
        if (!positions[id - 1]) {
            this.setState({showModal: true, positionID: e.currentTarget.id, edit: false});
        } else {
            const artId = positions[id - 1];
            axios.get(`/api/artobjects/${artId}/`)
                .then(res => this.setState({artObject: {...res.data}, showModal: true, positionID: id, edit: true}))
        }
      
        document.body.style.height = '100vh';
        document.body.style.overflowY = 'hidden';
    };

    onHover = e => {
        const { id } = e.currentTarget;
        const { positions } = this.state;
        if (positions[id - 1]) {
            e.target.firstChild.style.display = 'block';
        }
    };

    onUnHover = e => e.currentTarget.firstChild.style.display = 'none';

    onDelete = () => {
        this.props.editSpace && this.props.deleteArtObject(this.state.positions[this.state.positionID - 1]);

        const elem = document.getElementById(this.state.positionID);
        elem.style.cssText = `background-image: fuck you`;
        
        this.setState(prevState => {
            let temp = prevState.positions;
            temp[prevState.positionID - 1] = 0;
            return ({positions: temp, artObject: {}})
        }, this.props.onChangeState('artObjects', this.state.positions))
        
        this.closeModal();
    };


    loadArtObjects = () => {
        const { artObjectsRedux } = this.props;
        console.log('props', this.props)
        this.setState(prevState => {
            let temp = prevState.positions;
            artObjectsRedux.map(artObj => {
                console.log('cycle', artObj)
                temp[artObj.position - 1] = artObj.artobject.id;
                const elem = document.getElementById(artObj.position);
                elem.style.cssText = `background-image: url('${artObj.artobject.upload}'); background-size: cover; max-height: 100%; max-width: 100%;`;
            })
            return ({positions: temp, artObjects: artObjectsRedux})
        });
    }

    componentDidUpdate(prevProps){
        if (this.props.editSpace && prevProps !== this.props) {
            this.loadArtObjects();
        }
    }

    render() {
        const { showModal, positions } = this.state;
        return (
            <div className="artobject-form-cont">
                <div className="artobject-form-row">
                    <div className="artobject-form-add-pic-cont">
                        <div className="artobject-form-add-pic" id="1" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[0] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div className="artobject-form-add-pic" id="2" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[1] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div className="artobject-form-add-pic" id="3" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[2] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                    </div>

                    <div className="artobject-form-add-model"></div>

                    <div className="artobject-form-add-pic-cont">
                        <div className="artobject-form-add-pic" id="4" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>    
                            { !positions[3] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div className="artobject-form-add-pic" id="5" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[4] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div className="artobject-form-add-pic" id="6" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[5] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
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
                        <div className="artobject-form-add-pic" id="7" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[6] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div className="artobject-form-add-pic" id="8" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[7] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div className="artobject-form-add-pic" id="9" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[8] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                    </div>

                    <div className="artobject-form-add-model"></div>

                    <div className="artobject-form-add-pic-cont">
                        <div className="artobject-form-add-pic" id="10" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[9] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div className="artobject-form-add-pic" id="11" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[10] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div className="artobject-form-add-pic" id="12" onClick={this.addArtwork} onMouseEnter={this.onHover} onMouseLeave={this.onUnHover}>
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[11] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                    </div>
                </div>
                <div className="artobject-form-plushover"></div>
                { showModal && <ArtObjectFormModal onClose={this.closeModal} onCreated={this.onCreated} onDelete={this.onDelete}  {...this.state}/> }
            </div>
        )
    }
}


export default connect(null, { deleteArtObject })(ArtObjectFormNew);
