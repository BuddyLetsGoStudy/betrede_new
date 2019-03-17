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
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <div className="dropdown show">
          <a className="dropdown-toggle navbar__user_li" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {user ? `${user.username}` : ""}
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="/my/spaces">Create a space</a>
            <a className="dropdown-item" href="/my/artobjects">Create an artobject</a>
            <a className="dropdown-item" onClick={this.props.logout}>Logout</a>
          </div>
         </div>
      </ul>
      
    )

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className='nav-item'>
          <Link to="/register" className="nav-link">Register</Link>
        </li>
        <li className='nav-item'>
          <Link to="/login" className="nav-link">Login</Link>
        </li>
      </ul>
    )

    return (
      <header className='mb-3'>
      <nav className="navbar navbar-expand-lg" style={{background: 'white'}}>
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src='/static/frontend/img/logo.png' height="77" alt=""/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          { isAuthenticated ? authLinks : guestLinks}
          </div>
          
        </div>
        </nav>
        </header>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header)
