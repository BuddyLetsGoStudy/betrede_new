import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from "../../actions/auth";

class Logout extends Component {
    componentWillMount() {
        this.props.logout();
    }
    render() {
        return (
            <div>
               
            </div>
        )
    }
}

export default connect(null, { logout })(Logout)

