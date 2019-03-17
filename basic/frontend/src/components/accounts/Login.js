import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

export class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    static propTypes = {
      login: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.login(this.state.username, this.state.password)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        if(this.props.isAuthenticated){
          return <Redirect to ="/" />
        }
        const { username, password } = this.state
        return (
          <div className="col-md-8 col-md-offset-2 mx-auto">
            <div className="msform">
                <div className="fieldset">
                    <form id="msform" onSubmit={this.onSubmit}>
                      <fieldset>
                          <h2 className="fs-title">Login</h2>
                          <div className="form-group">
                              <input
                                type="text"
                                className="form-control logreg_input"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                                placeholder="Enter username"
                                autoFocus 
                                required
                              />
                           </div>
                           <div className="form-group">
                              <input
                                type="password"
                                className="form-control logreg_input" 
                                name="password"
                                onChange={this.onChange}
                                value={password}
                                placeholder="Password" 
                                required
                              />
                          </div>
                          <input type="submit" name="submit" className="submit" value="CONFIRM" />
                          <a href="#">Forgot password?</a>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
        )
    }
}

const mapStateToProps =  state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
