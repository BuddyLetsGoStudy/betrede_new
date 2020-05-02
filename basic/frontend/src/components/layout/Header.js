import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from "../../actions/auth";
// import logo from '../../../static/frontend/img/logo.png'

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <>
        <Link to="/profile" className="header-text">My spaces</Link>
        <Link to="/space" className="header-text">Create</Link>
        <a className="header-text" onClick={this.props.logout}>Log out</a>
      </>
    )

    const guestLinks = (
      <>
        <Link to="/register" className="header-text">Sign up</Link>
        <Link to="/login" className="header-text">Log in</Link>
      </>
    )

    return (
      <header>
        <a href="/" className="header-logo" />
        <div className="header-globe"></div>
        <div className="header-search"></div>
        { isAuthenticated ? authLinks : guestLinks }
      </header>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header)
