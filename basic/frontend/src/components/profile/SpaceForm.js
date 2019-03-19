import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMessage } from "../../actions/messages";
import { getArtObjects, addSpace } from '../../actions/artspace'
import axios from 'axios'


class SpaceForm extends Component {
    constructor(props){
      super(props) 

      this.artobjects_arr = []
    }

    static propTypes = {
        artObjects: PropTypes.array.isRequired,
        getArtObjects: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
    }

    componentDidMount(){
       this.props.getArtObjects()
    }

    pushArray(a, e){
      a.push(e)
      return a
    }
  
    sliceArray(a, e){
      return a.filter(i => i !== e)
    }

    imgClick = (e) => {
      let id = e.target.alt
      if (!this.artobjects_arr.includes(id)){
        this.pushArray(this.artobjects_arr, id)
        e.target.className = 'spaceCreation__img_selected'
      } else {
        this.artobjects_arr = this.sliceArray(this.artobjects_arr, id)
        e.target.className = 'spaceCreation__img'
      }
      console.log(this.artobjects_arr)
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e => {
        e.preventDefault()
        const space = {
          name: e.target.elements.name.value,
          description: e.target.elements.description.value,
          artobjects: this.artobjects_arr
        }
        this.props.addSpace(space)
    }

    render() {
      console.log(this.props.artObjects)
      const { artObjects } = this.props
      console.log(artObjects)
        return (
          <Fragment>
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type='text' name='name' className="form-control" placeholder="Name of your space"/>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type='text' name='description' className="form-control" placeholder="Description"/>
              </div>
              <div className="spaceCreation__img_cont">
                {
                  artObjects && artObjects.map(artobject =>
                    <div className="spaceCreation__div">
                      <img class="spaceCreation__img" src={artobject.upload} alt={artobject.id} onClick={this.imgClick} />
                    </div>
                  )
                }
                </div>
              <button type="submit" className="btn btn-primary">Create</button>
            </form>
          </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    artObjects: state.artspace.artObjects
})

export default connect(mapStateToProps, { createMessage, getArtObjects, addSpace })(SpaceForm)
