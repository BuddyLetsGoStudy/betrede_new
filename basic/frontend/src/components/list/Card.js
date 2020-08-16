import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { publishSpace, unpublishSpace, deleteSpace } from '../../actions/artspace'
import { createMessage } from "../../actions/messages";
import { Link } from 'react-router-dom'

class Card extends Component {
    static propTypes = {
        deleteSpace: PropTypes.func,
        space: PropTypes.object
    }

    publishSpace = e => {
        this.props.publishSpace(this.props.space.id);
        window.location.href = `/#${this.props.space.geo}`;
        e.target.classList.add('space-card-published');
        e.target.classList.remove('space-card-publish');
        e.target.innerText = 'Published';
    }

    unpublishSpace = e => this.props.unpublishSpace(this.props.space.id);

    deleteSpace = e => {
        this.props.deleteSpace(this.props.space.id);
        this.props.deleted(this.props.space.id);
        console.log(e.target.parentElement)
        e.target.parentElement.style.display = 'none'
    }    

    render() {
        const { id, name, published } = this.props.space
        return (
            <div className="space-card">
                <div className="space-card-avatar"/>
                <div className="space-card-title">{name}</div>
                <Link className="space-card-button" to={`/edit/${id}`}>Edit</Link> 
                <Link className="space-card-button" to={`/flat/${id}`}>View 2D</Link> 
                <a className="space-card-button" href={`/space/${id}/`}>View 3D</a> 
                {
                    published ?
                        <div className="space-card-published" onClick={this.unpublishSpace} id={id}>Unpublish</div> 
                    :
                        <div className="space-card-publish" onClick={this.publishSpace} id={id}>Publish</div> 
                }
                <div className="space-card-button-delete" onClick={this.deleteSpace}/>             
            </div>
        )
    }
}


export default connect(null, { publishSpace, deleteSpace, createMessage, unpublishSpace })(Card)

