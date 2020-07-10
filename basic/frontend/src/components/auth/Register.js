import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/auth'
import { createMessage } from '../../actions/messages'


export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
        invatationCode: ''
    }

    static propTypes = {
      register: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault()
        const { username, email, password, password2 } = this.state
        if(password !== password2){
          this.props.createMessage({ passwordsNotMatch: 'Passwords do not match' })
        } else {
          const newUser = {
            username,
            password,
            email
          }
          this.props.register(newUser)
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        if(this.props.isAuthenticated){
          return <Redirect to="/myspaces" />
        }
        const { username, email, password, password2, invatationCode } = this.state
        return (
          <form className="register-form" onSubmit={this.onSubmit}>
            <div className="register-form-title">Create a free account</div>
            <div className="register-form-email">
              <input
                type="email"
                name="email"
                onChange={this.onChange}
                value={email}
                placeholder="Email Address" 
              />
            </div>
            <div className="register-form-username">
              <input
                type="text"
                name="username"
                onChange={this.onChange}
                value={username}
                placeholder="Login name" 
              />
            </div>
            <div className="register-form-password">
              <input
                type="password"
                name="password"
                onChange={this.onChange}
                value={password}
                placeholder="Password" 
              />
            </div>
            <div className="register-form-password">
              <input
                type="password"
                name="password2"
                onChange={this.onChange}
                value={password2}
                placeholder="Confirm password"
              />
            </div>
            <div className="register-form-key">
              <input
                type="password"
                name="invatationCode"
                onChange={this.onChange}
                value={invatationCode}
                placeholder="Invitation Key"
                minLength={7}
              />
            </div>
            <button className="register-form-button">Create account</button>
          </form>
          // <div className="col-md-8 col-md-offset-2 mx-auto">
          //   <div className="msform">
          //       <div className="fieldset">
          //           <form id="msform" onSubmit={this.onSubmit}>
          //             <fieldset>
          //               <h2 className="fs-title">Create your account</h2>
          //               <h3 className="fs-subtitle">It is free</h3>
          //               <div className="msform">
                          // <input
                          //   type="text"
                          //   className="form-control logreg_input"
                          //   name="username"
                          //   onChange={this.onChange}
                          //   value={username}
                          //   placeholder="Username" 
                          //   required
                          // />
          //               </div>
          //               <div class="msform ">
                          // <input
                          //   type="email"
                          //   className="form-control logreg_input"
                          //   name="email"
                          //   onChange={this.onChange}
                          //   value={email}
                          //   placeholder="Email" 
                          //   required
                          // />
          //                </div>
          //                <div class="fmsform">
                          // <input
                          //   type="password"
                          //   className="form-control logreg_input"
                          //   name="password"
                          //   onChange={this.onChange}
                          //   value={password}
                          //   placeholder="Password" 
                          //   required
                          // />
          //               </div>
          //               <div class="fmsform">
                          // <input
                          //   type="password"
                          //   className="form-control logreg_input"
                          //   name="password2"
                          //   onChange={this.onChange}
                          //   value={password2}
                          //   placeholder="Confirm password"
                          //   required
                          // />
          //               </div>
          //               <input type="submit" name="submit" className="submit" value="CONFIRM" />
          //             </fieldset>
          //           </form>
          //         </div>
          //       </div>
          //   </div>
       
        )
    }
}

const mapStateToProps =  state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, createMessage })(Register)

