import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login, resetPassword } from '../../actions/auth'

export class ResetPassword extends Component {
    state = {
        email: '',
        emailSent: false
    }

    onSubmit = e => {
        e.preventDefault()
        this.setState({emailSent: true})
        this.props.resetPassword(this.state.email)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        if(this.props.isAuthenticated){
          return <Redirect to ="/create" />
        }
        const { email, emailSent } = this.state;
        return (
          <form className="login-form" onSubmit={this.onSubmit}>
            <div className="login-form-title">Reset Password</div>
            {
                emailSent ? 
                <div className="reset-form-text">✅ Recovery email sent to {email}</div>
                :
                <>
                <div className="login-form-email">
                    <input
                    type="email"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                    placeholder="Enter your email"
                    autoFocus 
                    />
                </div>
                <button className="login-form-button">Send Email</button>
                </>
            }

          </form>
        )
    }
}

const mapStateToProps =  state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login, resetPassword })(ResetPassword)
