import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMessage } from "../../actions/messages";
import { getArtObjects } from "../../actions/artspace";


class SpaceForm extends Component {
    state = {
        name: '',
        description: '',
        width: '',
        height: ''
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        artObjects: PropTypes.array.isRequired,
        createMessage: PropTypes.func.isRequired,
        getArtObjects: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getArtObjects()
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e => {
        e.preventDefault()

    }
    render() {
        return (
        <div>
           <h1>kek</h1>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    artObjects: state.artObjects
})

export default connect(mapStateToProps, { createMessage, getArtObjects })(SpaceForm)
