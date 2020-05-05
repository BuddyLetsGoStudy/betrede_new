import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteSpace } from '../../actions/artspace'
import { createMessage } from "../../actions/messages";
import { Link } from 'react-router-dom'

class Card extends Component {
    static propTypes = {
        deleteSpace: PropTypes.func,
        space: PropTypes.object
    }

    deleteSpace = e => {
        this.props.deleteSpace(this.props.space.id);
        this.props.deleted();
        console.log(e.target.parentElement)
        e.target.parentElement.style.display = 'none'
    }    

    render() {
        const { id, name } = this.props.space
        return (
            <div className="space-card">
                <div className="space-card-avatar"/>
                <div className="space-card-title">{name}</div>
                <div className="space-card-button">Edit</div> 
                <div className="space-card-button">View 2D</div> 
                <a className="space-card-button" href={`/scene/${id}/`}>View 3D</a> 
                <div className="space-card-publish">Publish</div> 
                <div className="space-card-button-delete" onClick={this.deleteSpace}/>             
            </div>
        )
    }
}


export default connect(null, { deleteSpace, createMessage })(Card)

