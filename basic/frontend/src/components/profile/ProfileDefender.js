import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import SpaceList from '../list/SpaceList'

class ProfileDefender extends Component {
  render(){
    const { isAuthenticated } = this.props.auth
    return (
      <Fragment>
          { isAuthenticated ? <SpaceList /> : <div>non authenticated</div>}
      </Fragment>
   )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps)(ProfileDefender)

