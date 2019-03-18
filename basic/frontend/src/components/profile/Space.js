import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import SpaceForm from './SpaceForm'

class Space extends Component {
  render(){
    const { isAuthenticated } = this.props.auth
    return (
      <Fragment>
          { isAuthenticated ? <SpaceForm /> : <h1>Loading...</h1>}
      </Fragment>
   )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps)(Space)

