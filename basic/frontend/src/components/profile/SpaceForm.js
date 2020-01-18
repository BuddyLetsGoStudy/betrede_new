import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMessage } from "../../actions/messages";
import { getArtObjects, addSpace } from '../../actions/artspace'
import axios from 'axios'
import { YMaps, Map, Placemark } from 'react-yandex-maps';

class SpaceForm extends Component {
    constructor(props){
      super(props) 

      this.cords = [55.74380314679218, 37.7897265625];
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
        e.target.className = 'spaceCreation__img_selected artobjects_list'
      } else {
        this.artobjects_arr = this.sliceArray(this.artobjects_arr, id)
        e.target.className = 'artobjects_list'
      }
      console.log(this.artobjects_arr)
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e => {
        e.preventDefault()
        const space = {
          name: e.target.elements.name.value,
          description: e.target.elements.description.value,
          artObjects: this.artobjects_arr
        }
        console.log(space)
        this.props.addSpace(space)
    }

    mapClick = e => {
      this.cords = e.get('coords');
      console.log(this.cords);
      this.forceUpdate();
    };



    render() {
      const { artObjects } = this.props
        return (
          <>
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type='text' name='name' className="form-control" placeholder="Name of your space"/>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type='text' name='description' className="form-control" placeholder="Description"/>
              </div>
              <ul className="artobjects_list">
                {
                  artObjects && artObjects.map(artobject =>
                    <li className="artobjects_list">
                      <img className="artobjects_list" src={artobject.upload} alt={artobject.id} onClick={this.imgClick} />
                    </li>
                  )
                }
                </ul>
              <button type="submit" className="btn btn-primary">Create</button>
            </form>
            <YMaps
              enterprise
              query={{
                apikey: '2e5ff6ae-71b4-4e26-baec-fbe0a49a07fd',
              }}
            >
                <Map onClick={this.mapClick} defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
                  <Placemark geometry={this.cords} />
                </Map>
            </YMaps>
          </>
        )
    }
}

const mapStateToProps = state => ({
    artObjects: state.artspace.artObjects
})

export default connect(mapStateToProps, { createMessage, getArtObjects, addSpace })(SpaceForm)
