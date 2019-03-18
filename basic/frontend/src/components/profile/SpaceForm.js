import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMessage } from "../../actions/messages";
import { getArtObjects } from '../../actions/artspace'

import axios from 'axios'


class SpaceForm extends Component {


    static propTypes = {
        artObjects: PropTypes.array.isRequired,
        getArtObjects: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
    }

    fetchArtObj(user_id){
        return axios
                .get(`/api/artobjects/?author=${user_id}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        artobjects: res.data,
                    })
                    console.log(this.state.artobjects)
                })
                .catch(err => console.log(err))

      }

    componentDidMount(){
       this.props.getArtObjects()
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e => {
        e.preventDefault()

        axios.post('https://betredeapi.logachev.top/api/space/', {
           name: e.target.elements.name.value,
           description: e.target.elements.description.value,
           artobjects: this.artobjects_arr,
       })
       .then(res => {
         console.log(res)
         window.location.assign(`/spaces/${res.data.id}/`)
        })
       .catch(error => console.log(error.response.data))
  
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

export default connect(mapStateToProps, { createMessage, getArtObjects })(SpaceForm)
