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
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 p-2" key={space.key}>
                        <div className="card" >
                            <div className="card-body">
                            <h5 className="card-title">{space.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {space.author}
                            </h6>
                            <p className="card-text">{space.description}</p>
                            <a href={`scene/${space.id}`} className="btn btn-primary">Enter the space</a>
                            </div>
                        </div>
                    </div>
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
