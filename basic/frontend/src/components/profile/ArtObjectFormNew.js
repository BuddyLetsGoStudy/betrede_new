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
        console.log(url)
        const elem = document.getElementById(this.state.positionID);
        console.log(elem)
        elem.style.cssText = `background-image: url('${url}'); `;
        elem.classList.add('artobject-form-background-img');
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
        // this.props.editSpace && this.props.deleteArtObject(this.state.positions[this.state.positionID - 1]);

        const elem = document.getElementById(this.state.positionID);
        elem.style.cssText = `background-image: fuck you`;
        elem.classList.remove('artobject-form-background-img');
        const deletedID = this.state.positions[this.state.positionID - 1]
        this.setState(prevState => {
            let temp = prevState.positions;
            temp[prevState.positionID - 1] = 0;
            return ({positions: temp, artObject: {}})
        }, this.props.onChangeState('artObjects', this.state.positions, deletedID))
        
        this.closeModal();
    };


    loadArtObjects = () => {
        const { artObjectsRedux } = this.props;
        console.log('props', this.props)
        this.setState(prevState => {
            let temp = prevState.positions;
            artObjectsRedux.map(artObj => {
                console.log('cycle', artObj.artobject.upload)
                temp[artObj.position - 1] = artObj.artobject.id;
                const elem = document.getElementById(artObj.position);
                // if (!elem.style.backgroundImage) {
                //     elem.style.backgroundImage = `url('${artObj.artobject.upload}')`;
                // }
                elem.style.cssText = `background-image: url('${artObj.artobject.upload}');`;
                elem.classList.add('artobject-form-background-img')
            })
            return ({positions: temp, artObjects: artObjectsRedux})
        });
    }

    dragStarted = e => {
        if (e.target.id) {
            e.dataTransfer.setData("ID", e.target.id);
            console.log(e.target.id, 'IS FUCKING DRAGGED RIGHT IN FRONT OF YOUR EBALO IDIOT NAHUI');
        } else {
            e.preventDefault();
            if (window.getSelection) {
                if (window.getSelection().empty) {  // Chrome
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges) {  // Firefox
                    window.getSelection().removeAllRanges();
                } else if (document.selection) {  // IE?
                    document.selection.empty();
                }
            }
        }
    }

    dropped = e => {
        e.preventDefault();
        const elem = e.target;
        const elemID = elem.id;
        const elemImage = elem.style.backgroundImage;


        const draggedElemID = e.dataTransfer.getData("ID");
        const draggedElem = document.getElementById(draggedElemID);
        const draggedElemImage = draggedElem.style.backgroundImage;
        // draggedElem.firstChild.style.display = 'none';
        // draggedElem.firstChild.style.display = 'none';

        elem.style.backgroundImage = draggedElemImage;
        if (this.state.positions[elem.id - 1]) {
            draggedElem.style.backgroundImage = elemImage;
        } else {
            draggedElem.classList.remove('artobject-form-background-img');
            draggedElem.style.cssText = `background-image: fuck you`;
            elem.classList.add('artobject-form-background-img');
        }

        this.setState(prevState => {
            let temp = prevState.positions;
            const artObjID = prevState.positions[elemID - 1]
            const draggedArtObjID = prevState.positions[draggedElemID - 1]
            temp[elemID - 1] = draggedArtObjID;
            temp[draggedElemID - 1] = artObjID;
            return ({positions: temp, artObject: {}})
        }, this.props.onChangeState('artObjects', this.state.positions));
    }

    componentDidUpdate(prevProps){
        if (this.props.editSpace && prevProps !== this.props && this.props.artObjectsRedux && !this.props.sceneIsLoading) {
            this.loadArtObjects();
        }
    }

    componentDidMount(){
        document.addEventListener("dragover", e => e.preventDefault());
    }

    render() {
        const { showModal, positions } = this.state;
        return (
            <div className="artobject-form-cont">
                <div className="artobject-form-row">
                    <div className="artobject-form-add-pic-cont">
                        <div 
                            className="artobject-form-add-pic" 
                            id="1"
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[0] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[0] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div 
                            className="artobject-form-add-pic" 
                            id="2" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[1] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[1] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div 
                            className="artobject-form-add-pic" 
                            id="3" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[2] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[2] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                    </div>

                    <div className="artobject-form-add-model"></div>

                    <div className="artobject-form-add-pic-cont">
                        <div 
                            className="artobject-form-add-pic" 
                            id="4" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[3] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
                            <div className="artobject-form-add-pic-pencil"/>    
                            { !positions[3] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div 
                            className="artobject-form-add-pic" 
                            id="5" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[4] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[4] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div 
                            className="artobject-form-add-pic" 
                            id="6" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[5] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
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
                        <div 
                            className="artobject-form-add-pic" 
                            id="7" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[6] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[6] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div 
                            className="artobject-form-add-pic" 
                            id="8" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[7] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[7] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div 
                            className="artobject-form-add-pic" 
                            id="9" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[8] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[8] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                    </div>

                    <div className="artobject-form-add-model"></div>

                    <div className="artobject-form-add-pic-cont">
                        <div 
                            className="artobject-form-add-pic" 
                            id="10" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[9] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[9] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div 
                            className="artobject-form-add-pic" 
                            id="11" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[10] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
                            <div className="artobject-form-add-pic-pencil"/>
                            { !positions[10] ? <div className="artobject-form-add-pic-alt">add artwork</div> : ''}
                        </div>
                        <div 
                            className="artobject-form-add-pic" 
                            id="12" 
                            onClick={this.addArtwork} 
                            onMouseEnter={this.onHover} 
                            onMouseLeave={this.onUnHover} 
                            draggable={positions[11] ? true : false} 
                            onDragStart={this.dragStarted} 
                            onDrop={this.dropped}
                        >
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
