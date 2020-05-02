import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from 'prop-types'

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route 
//       {...rest}
//       render={props =>{
//           if(props.auth.isLoading){
//             return <h2>Loading...</h2>
//           } else if(!props.auth.isAuthenticated) {
//             return <Redirect to="/login/" />
//           } else{
//             return <Component {...props} />
//           }
//       }}
//     />
// )


class PrivateRoute extends Component {
  render(){
    const { isAuthenticated, isLoading } = this.props.auth;
    console.log(isLoading, 'loading')
    if (isLoading) {
      return <div className={'loader'}></div>;
    } else if (isAuthenticated) {
      console.log('isauth')
      return this.props.component;
    } else {
      return <Redirect to="/login/" />;
    }
  }
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
