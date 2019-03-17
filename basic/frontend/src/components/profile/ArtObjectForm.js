import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMessage } from "../../actions/messages";
import axios from 'axios'


class ArtObjectForm extends Component {
    state = {
        name: '',
        description: '',
        width: '',
        height: ''
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        createMessage: PropTypes.func.isRequired
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e => {
        e.preventDefault()

        const formData = new FormData();

        formData.append("name", e.target.elements.name.value)
        // formData.append("author", this.props.auth.user.id)
        formData.append('category', 1)
        formData.append("description", e.target.elements.description.value)
        formData.append("width", e.target.elements.width.value)
        formData.append("height", e.target.elements.height.value)
        formData.append("upload", e.target.elements.upload.files[0])

        return axios.post("/api/artobjects/", formData, {})
        .then(res => {
            console.log(res)
            this.props.createMessage({ addArtObject: 'Art Object Added' })
            this.setState({
                name: '',
                description: '',
                width: '',
                height: ''
            })
        })
        .catch(error => console.log(error.response.data));
    }
    render() {
        const { name, description, width, height } = this.state
        return (
        <div>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type='text' name='name' className="form-control" placeholder="Name of your artwork" onChange={this.onChange} value={name} required/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type='text' name='description' className="form-control" placeholder="Description" onChange={this.onChange} value={description} required/>
                </div>

                <div className="form-group">
                    <label>Width</label>
                    <input type='number' name='width' className="form-control" placeholder="In metres" onChange={this.onChange} value={width} required/>
                </div>
                <div className="form-group">
                    <label>Height</label>
                    <input type='number' name='height' className="form-control" placeholder="In metres" onChange={this.onChange} value={height} required/>
                </div>
                <div className="form-group">
                    <label>Upload your artwork</label>
                    <input type="file" className="form-control-file" name='upload' required />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { createMessage })(ArtObjectForm)
