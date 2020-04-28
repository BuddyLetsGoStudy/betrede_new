import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class ArtObjectFormModal extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        onCreated: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {file: '',imgUrl: ''};
    }

    imageChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imgUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }

    onSubmit = e => {
        e.preventDefault()

        const formData = new FormData();

        formData.append("name", e.target.elements.name.value)
        formData.append('category', 1)
        formData.append("description", e.target.elements.description.value)
        formData.append("width", e.target.elements.width.value)
        formData.append("height", e.target.elements.height.value)
        formData.append("upload", this.state.file)

        const config = {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }

        return axios.post("/api/artobjects/", formData, config)
        .then(res => {
            console.log(res, 'sup')
            this.props.onCreated(res.data.upload, res.data.id);
        })
        .catch(error => console.log(error));
    }

    render() {
        let { imgUrl } = this.state;

        return (
            <div className="artobject-form-modal-bg">
                <div className="artobject-form-modal-cont">
                    <div className="artobject-form-modal-close" onClick={this.props.onClose}></div>
                    <form className="artobject-form-modal-form" onSubmit={this.onSubmit}>
                        <input className="artobject-form-modal-name" type="text" placeholder="Name of artwork" name="name"></input>
                        <textarea className="artobject-form-modal-description" placeholder="Description" name="description"></textarea>
                        <button className="artobject-form-modal-button">Save</button>
                        <label className="artobject-form-modal-file" style={{backgroundImage: imgUrl ? `url('${imgUrl}')` : ''}}>
                            <input type="file" onChange={this.imageChange} name="upload"/>
                            { !imgUrl && 'Upload from a computer'}
                        </label>
                        <input className="artobject-form-modal-width" type="number" placeholder="Width" name="width"></input>
                        <input className="artobject-form-modal-height" type="number" placeholder="Height" name="height"></input>
                        <input className="artobject-form-modal-date" type="text" placeholder="Date of creation"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default ArtObjectFormModal;