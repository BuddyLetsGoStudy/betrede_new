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
        formData.append('category', 1)
        formData.append("description", e.target.elements.description.value)
        formData.append("width", e.target.elements.width.value)
        formData.append("height", e.target.elements.height.value)
        formData.append("upload", e.target.elements.upload.files[0])

        const config = {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }

        return axios.post("/api/artobjects/", formData, config)
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
          fukc tou
        </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { createMessage })(ArtObjectForm)
