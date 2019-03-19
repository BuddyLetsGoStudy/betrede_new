import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class GenerateScene extends Component {
    constructor(props){
        super(props)
    }

    static propTypes = {
        space: PropTypes.object.isRequired,
        artObjects: PropTypes.array.isRequired
    }
    

    render() {
        const { artObjects, space } = this.props
        console.log(artObjects)
        artObjects.forEach(element => {
            console.log(element.name)
        });
        return (
            <div>
                <h1>{space.name}</h1>
                {
                    artObjects.map(artObject => 
                        <p>{artObject.name}</p>
                    )
                }
            </div>
        )
  }
}
