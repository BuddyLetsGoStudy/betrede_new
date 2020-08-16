import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMessage } from "../../actions/messages";
import { getArtObjects, addSpace, getScene, updateSpace } from '../../actions/artspace'
import axios from 'axios';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import ArtObjectFormNew  from './ArtObjectFormNew';
import SpaceFormMetaInfo  from './SpaceFormMetaInfo';
import SpaceFormLocation  from './SpaceFormLocation';
import _ from 'lodash';
import { Redirect } from 'react-router-dom'


class SpaceFormNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            avatar: '',
            avatarFile: '',
            geo: [0, 0],
            artObjects: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            artObjectsRedux: []
        };
    }

    onChangeState = (name, value, deletedID = null) => {
        this.setState({[name]: value});
        if (this.props.match.params.spaceID && name === 'artObjects') {
            this.setState(prevState => ({artObjectsRedux: _.filter(prevState.artObjectsRedux, {id: !deletedID})}))
        }
        // this.props.match.params.spaceID && name === 'artObjects' && this.props.getScene(this.props.match.params.spaceID);
    };

    createOrUpdateSpace = e => {
        e.preventDefault()
        const { name, description, geo, artObjects, avatar, avatarFile } = this.state;
        const { spaceID } =  this.props.match.params;
        console.log(avatar, avatarFile)
        const space = {
            name,
            description,
            geo: `${geo[0]}, ${geo[1]}`,
            artObjects,
            avatar
        }

       
        spaceID ? this.props.updateSpace(space, spaceID) : this.props.addSpace(space)
        this.props.history.push("/myspaces");
    }

    componentDidMount(){
         this.props.match.params.spaceID ? this.props.getScene(this.props.match.params.spaceID) : this.setState({name: '', description: '', geo: [0, 0], artObjects: [], artObjectsRedux: []})
    }

    componentDidUpdate(prevProps){
        if (prevProps !== this.props && !this.props.sceneIsLoading) {
            const { space, artObjectsRedux, sceneIsLoading } = this.props;
            const { name, description, geo } = space;
            let tempPos = this.state.artObjects
            artObjectsRedux && artObjectsRedux.map(artObj => {
                tempPos[artObj.position - 1] = artObj.artobject.id;
            })
            this.setState({name, description, artObjects: tempPos, artObjectsRedux, geo: [parseFloat(geo.split(',')[0], 10), parseFloat(geo.split(',')[1], 10)]})
        } else if (this.props.space && !this.props.match.params.spaceID){
            // this.setState({name: '', description: '', geo: [0, 0], artObjects: [], artObjectsRedux: []})
        }
    }

    render() {
        const { name, description, geo, artObjects, artObjectsRedux, avatar } = this.state;
        const { sceneIsLoading  } = this.props;
        const { spaceID } = this.props.match.params;

        if (spaceID && sceneIsLoading) {
            return <div className={'loader'}/>
        } else {
            return (
                <main className="space-form-cont">
                    <div className="space-form-title">{`${spaceID ? 'Edit' : 'Create'} a space`}</div>
                    <ArtObjectFormNew onChangeState={this.onChangeState} artObjects={artObjects} artObjectsRedux={artObjectsRedux} editSpace={spaceID ? true : false} sceneIsLoading={sceneIsLoading}/>
                    <div className="space-form-meta-and-map">
                        <SpaceFormMetaInfo onChangeState={this.onChangeState} name={name} description={description} avatar={avatar}/>
                        <SpaceFormLocation onChangeState={this.onChangeState} geo={geo}/>
                    </div>
                    <div className="space-form-button" onClick={this.createOrUpdateSpace}>Save</div>
                </main>
            )
        }
    }
}

const mapStateToProps = state => ({
    artObjectsRedux: state.artspace.artObjects,
    space: state.artspace.space,
    sceneIsLoading: state.artspace.sceneIsLoading,
})

export default connect(mapStateToProps, { createMessage, getArtObjects, addSpace, getScene, updateSpace })(SpaceFormNew)
