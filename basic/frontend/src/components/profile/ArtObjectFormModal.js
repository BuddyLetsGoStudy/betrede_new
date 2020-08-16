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
            proportionOne: '',
            proportionTwo: '',
            artObjectIsLoading: false
        };
    }

    imageChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
            const image = new Image();
            image.src = reader.result;

            image.onload = e => {
                const { height, width } = e.srcElement;
                console.log(height, width);

                const proportionOne = height / width;
                const proportionTwo = width / height;
                console.log(proportionOne, proportionTwo)
                this.setState({
                    file: file,
                    upload: reader.result,
                    proportionOne,
                    proportionTwo
                })
            }
        }
    
        reader.readAsDataURL(file);

    }

    onSubmit = e => {
        e.preventDefault()

        const { name, description, width, height, file } = this.state

        const formData = new FormData();

        formData.append("name", name)
        formData.append('category', 1)
        formData.append("description", description)
        formData.append("width", width / 100)
        formData.append("height", height / 100)
        file && formData.append("upload", file)

        const config = {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }
        console.log(formData)

        this.props.edit ? this.updateArtObject(formData, config) : this.createArtObject(formData, config) 
    }

    createArtObject = (formData, config) => {
        this.setState({artObjectIsLoading: true});
        axios.post("/api/artobjects/", formData, config)
        .then(res => {
            this.props.onCreated(res.data.upload, res.data.id);
            this.setState({artObjectIsLoading: false});
        })
        .catch(error => console.log(error));
    };

    updateArtObject = (formData, config) => {
        this.setState({artObjectIsLoading: true});
        const id = this.props.positions[this.props.positionID - 1];
        axios.patch(`/api/artobjects/${id}/`, formData, config)
        .then(res => {
            this.props.onCreated(res.data.upload, res.data.id);
            this.setState({artObjectIsLoading: false});

        })
        .catch(error => console.log(error));
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onHover = e => {
        e.target.firstChild.style.display = 'block';
        e.target.style.border = "1px dashed #00F";
    }

    changeSize = e => {
        const { proportionOne, proportionTwo } = this.state;
        const widthElem = document.getElementsByClassName('artobject-form-modal-width')[0];
        const heightElem = document.getElementsByClassName('artobject-form-modal-height')[0];

        if (e.target.name === 'height') {
            const height = e.target.value;
            console.log('changedSize', height * proportionTwo);
            // heightElem.value = height;
            // widthElem.value = height * proportionTwo
            this.setState({ 
                width: Math.round(height * proportionTwo * 10) / 10,
                height: Math.round(height * 10) / 10
            })
        } else {
            const width = e.target.value;
            console.log('changedSize', width * proportionOne);
            // widthElem.value = width;
            // heightElem.value = width * proportionOne
            this.setState({ 
                width: Math.round(width * 10) / 10,
                height: Math.round(width * proportionOne * 10) / 10
            })
        }
    }

    onUnHover = e => {
        e.currentTarget.firstChild.style.display = 'none';
        e.currentTarget.style.border = "1px solid #B6B6B6";
    }

    componentDidMount(){
        this.setState({...this.props.artObject, width: this.props.artObject.width * 100, height: this.props.artObject.height * 100});
    }    

    render() {
        const { name, description, width, height, upload, artObjectIsLoading } = this.state;
        const { edit, positionID, positions, onClose, onDelete } = this.props;
        return (
            <div className="artobject-form-modal-bg">
                <div className="artobject-form-modal-cont">
                    <div className="artobject-form-modal-close" onClick={onClose}></div>
                    <form className="artobject-form-modal-form" onSubmit={this.onSubmit}>
                        <input className="artobject-form-modal-name" type="text" placeholder="Name of artwork" name="name" value={name} onChange={this.onChange}></input>
                        <textarea className="artobject-form-modal-description" placeholder="Description" name="description" value={description} onChange={this.onChange}></textarea>
                        <div className="artobject-form-modal-buttons">
                            <button className="artobject-form-modal-button">
                                { artObjectIsLoading ? <div className={'button-loader'}/> : 'Save'}
                            </button>
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
                            <input type="file" onChange={this.imageChange} name="upload" accept="image/*"/>
                            { !upload && 'Upload from a computer'}
                        </label>
                        <input className="artobject-form-modal-width" type="number" placeholder="Width (cm)" name="width" value={width} onChange={this.changeSize}></input>
                        <input className="artobject-form-modal-height" type="number" placeholder="Height (cm)" name="height" value={height} onChange={this.changeSize}></input>
                        <input className="artobject-form-modal-date" type="text" placeholder="Date of creation"></input>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    artObjectIsLoading: state.artspace.artObjectIsLoading
})

export default connect(mapStateToProps, { getArtObject })(ArtObjectFormModal);
