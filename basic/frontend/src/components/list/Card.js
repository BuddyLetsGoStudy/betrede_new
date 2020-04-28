import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteSpace } from '../../actions/artspace'
import { createMessage } from "../../actions/messages";

class Card extends Component {
    static propTypes = {
        deleteSpace: PropTypes.func,
        space: PropTypes.object
    }

    deleteSpace = e => {
        this.props.deleteSpace(this.props.space.id)
        console.log(e.target.parentElement)
        e.target.parentElement.style.display = 'none'
    }    

    render() {
        const { id, name } = this.props.space
        return (
            <div className="space-card">
                <div className="space-card-title">{name}</div>
                <div className="space-card-btn">Edit space</div> 
                <div className="space-card-btn">Publish</div> 
                <div className="space-card-btn space-card-btn-delete" onClick={this.deleteSpace}>Delete</div>                
            </div>
        )
    }
}


export default connect(null, { deleteSpace, createMessage })(Card)

