import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { getArtObject } from '../../actions/artspace'

class ArtObjectFormModal extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        onCreated: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            id: '',
            name: '',
            description: '',
            upload: '',
            height: '',
            width: '',
        };
    }

    imageChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            upload: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }

    onSubmit = e => {
        e.preventDefault()

        const { name, description, width, height, file } = this.state

        const formData = new FormData();

        formData.append("name", name)
        formData.append('category', 1)
        formData.append("description", description)
        formData.append("width", width)
        formData.append("height", height)
        file && formData.append("upload", file)

        const config = {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }

        this.props.edit ? this.updateArtObject(formData, config) : this.createArtObject(formData, config) 
    }

    createArtObject = (formData, config) => {
        axios.post("/api/artobjects/", formData, config)
        .then(res => {
            this.props.onCreated(res.data.upload, res.data.id);
        })
        .catch(error => console.log(error));
    };

    updateArtObject = (formData, config) => {
        const id = this.props.positions[this.props.positionID - 1];
        axios.patch(`/api/artobjects/${id}/`, formData, config)
        .then(res => {
            this.props.onCreated(res.data.upload, res.data.id);
        })
        .catch(error => console.log(error));
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onHover = e => {
        e.target.firstChild.style.display = 'block';
        e.target.style.border = "1px dashed #00F";
    }

    onUnHover = e => {
        e.currentTarget.firstChild.style.display = 'none';
        e.currentTarget.style.border = "1px solid #B6B6B6";
    }

    componentDidMount(){
        this.setState({...this.props.artObject});
    }    

    render() {
        const { name, description, width, height, upload } = this.state;
        const { edit, positionID, positions, onClose, onDelete } = this.props;
        return (
            <div className="artobject-form-modal-bg">
                <div className="artobject-form-modal-cont">
                    <div className="artobject-form-modal-close" onClick={onClose}></div>
                    <form className="artobject-form-modal-form" onSubmit={this.onSubmit}>
                        <input className="artobject-form-modal-name" type="text" placeholder="Name of artwork" name="name" value={name} onChange={this.onChange}></input>
                        <textarea className="artobject-form-modal-description" placeholder="Description" name="description" value={description} onChange={this.onChange}></textarea>
                        <div className="artobject-form-modal-buttons">
                            <button className="artobject-form-modal-button">Save</button>
                            { 
                                edit && 
                                    <div className="artobject-form-modal-delete" onClick={onDelete}>
                                        <div className="artobject-form-modal-delete-cross" />
                                        Delete artwork
                                    </div>
                            }
                        </div>
                        <label className="artobject-form-modal-file" style={{backgroundImage: upload ? `url('${upload}')` : ''}} onMouseEnter={upload ? this.onHover : null} onMouseLeave={upload ? this.onUnHover : null}>
                            <div className="artobject-form-modal-file-plus"/>
                            <input type="file" onChange={this.imageChange} name="upload"/>
                            { !upload && 'Upload from a computer'}
                        </label>
                        <input className="artobject-form-modal-width" type="number" placeholder="Width" name="width" value={width} onChange={this.onChange}></input>
                        <input className="artobject-form-modal-height" type="number" placeholder="Height" name="height" value={height} onChange={this.onChange}></input>
                        <input className="artobject-form-modal-date" type="text" placeholder="Date of creation"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, { getArtObject })(ArtObjectFormModal);
