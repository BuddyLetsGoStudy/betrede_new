import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMessage } from "../../actions/messages";
import { getArtObjects, addSpace, getScene } from '../../actions/artspace'
import axios from 'axios';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import ArtObjectFormNew  from './ArtObjectFormNew';
import SpaceFormMetaInfo  from './SpaceFormMetaInfo';
import SpaceFormLocation  from './SpaceFormLocation';


class SpaceFormNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            geo: [0, 0],
            artObjects: [],
            artObjectsRedux: []
        };
    }

    onChangeState = (name, value) => {
        this.setState({[name]: value});
        this.props.match.params.spaceID && name === 'artObjects' && this.props.getScene(this.props.match.params.spaceID);
    };

    createSpace = e => {
        e.preventDefault()
        const { name, description, geo, artObjects } = this.state;
        
        const space = {
            name,
            description,
            geo: `${geo[0]}, ${geo[1]}`,
            artObjects
        }
        this.props.addSpace(space);
    }

    componentDidMount(){
        this.props.match.params.spaceID && this.props.getScene(this.props.match.params.spaceID);
    }

    componentDidUpdate(prevProps){
        if (prevProps !== this.props && this.props.space) {
            const { space, artObjectsRedux, sceneIsLoading } = this.props;
            const { name, description, geo } = space;
            this.setState({name, description, artObjectsRedux, geo: [parseFloat(geo.split(',')[0], 10), parseFloat(geo.split(',')[1], 10)]})
        }
        // console.log(this.props.space);
        // console.log(this.props.artObjects);
        // console.log(this.props.sceneIsLoading);
    }

    render() {
        const { name, description, geo, artObjects, artObjectsRedux } = this.state;
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
                        <SpaceFormMetaInfo onChangeState={this.onChangeState} name={name} description={description}/>
                        <SpaceFormLocation onChangeState={this.onChangeState} geo={geo}/>
                    </div>
                    <div className="space-form-button" onClick={this.createSpace}>Save</div>
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

export default connect(mapStateToProps, { createMessage, getArtObjects, addSpace, getScene })(SpaceFormNew)
