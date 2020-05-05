import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from 'prop-types'


class PrivateRoute extends Component {
  componentDidUpdate(prevProps){
    if(prevProps.component !== this.props.component){
      console.log('upd',this.props.component)
    }
  }
  render(){
    const { isAuthenticated, isLoading } = this.props.auth;
    console.log('render',this.props.component)

    if (isLoading) {
      return <div className={'loader'}></div>;
    } else if (isAuthenticated) {
      return this.props.component;
    } else {
      return <Redirect to="/login/" />;
    }
  }
}



// class PrivateRoute extends Component {
//   render(){
//     const { isAuthenticated, isLoading } = this.props.auth;
//     const { path } = this.props;
//     const ComponentRender = this.props.component

//     return(
//       <Route exact path={path} render={ () => (
//         isLoading ? <div className={'loader'}></div> : isAuthenticated ? <ComponentRender /> : <Redirect to="/login/" />
//       )
//       } />
//     )
//   }
// }


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
