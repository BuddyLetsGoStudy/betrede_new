import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAuthorSpaces } from '../../actions/artspace'
import Card from './Card'

class SpaceList extends Component {
    static propTypes = {
        getAuthorSpaces: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.getAuthorSpaces()
    }

    render() {
        const { spaces } =  this.props
        return (
            <div className="space-list">
                {
                  spaces && spaces.length ? spaces.map((space, i) =>
                    <Card space={space} key={i} />
                  )
                  :
                  <a className={"space-list-empty"} href="/space">+ Create your first space right now!</a>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    spaces: state.artspace.spaces
})

export default connect(mapStateToProps, { getAuthorSpaces })(SpaceList)
