import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSpaces } from '../../actions/artspace'


class SpaceList extends Component {
    static propTypes = {
        getSpaces: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.getSpaces()
     }

    render() {
        const { spaces } =  this.props
        return (
            <div className="row">
                {
                  spaces && spaces.map(space =>
                    <Card />
                  )
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    spaces: state.artspace.spaces
})

export default connect(mapStateToProps, { getSpaces })(SpaceList)
