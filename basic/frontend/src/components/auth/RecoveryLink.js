import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, resetPassword, updatePassword } from '../../actions/auth'
import { createMessage } from '../../actions/messages'
import { Link, Redirect } from 'react-router-dom'


class RecoveryLink extends Component {
    state = {
        password: '',
        password2: '',
        updated: false,
        redirect: false
    }

    onSubmit = e => {
        const { password, password2 } = this.state;
        e.preventDefault();
        if(password !== password2){
            this.props.createMessage({ passwordsNotMatch: 'Passwords do not match' });
        } else {
            this.props.updatePassword(this.props.match.params.token, this.state.password);
            this.setState({updated: true});
            setTimeout(() => this.setState({redirect: true}), 2000);
        }

    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { password, password2, updated, redirect } = this.state;

        if(this.props.isAuthenticated){
            return <Redirect to ="/create" />
        } 

        if(redirect) {
            return <Redirect to ="/login" />
        }
        
        
        return (
            <form className="login-form" onSubmit={this.onSubmit}>
                <div className="login-form-title">Enter new password</div>
                {
                    updated ?
                    <div className="reset-form-text">✅ Password updated</div>
                    :
                    <>
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
                    <button className="login-form-button">Save Password</button>
                    </>
                }
            </form>
        )
    }
}


const mapStateToProps =  state => ({
    isAuthenticated: state.auth.isAuthenticated
  })


export default connect(mapStateToProps, {resetPassword, updatePassword, createMessage})(RecoveryLink)
