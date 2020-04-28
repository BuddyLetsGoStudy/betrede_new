import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMessage } from "../../actions/messages";
import { getArtObjects, addSpace } from '../../actions/artspace'
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
            artObjects: []
        };
    }

    onChangeState = (name, value) => this.setState({[name]: value});

    createSpace = e => {
        e.preventDefault()
        console.log('kek')
        const { name, description, geo, artObjects } = this.state;
        
        const space = {
            name,
            description,
            geo,
            artObjects
        }
        this.props.addSpace(space);
    }

    render() {
        return (
            <main className="space-form-cont">
                <div className="space-form-title">Create a space</div>
                <ArtObjectFormNew onChangeState={this.onChangeState} />
                <div className="space-form-meta-and-map">
                    <SpaceFormMetaInfo onChangeState={this.onChangeState} />
                    <SpaceFormLocation onChangeState={this.onChangeState} />
                </div>
                <div className="space-form-button" onClick={this.createSpace}>Save</div>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    artObjects: state.artspace.artObjects,
})

export default connect(mapStateToProps, { createMessage, getArtObjects, addSpace })(SpaceFormNew)
