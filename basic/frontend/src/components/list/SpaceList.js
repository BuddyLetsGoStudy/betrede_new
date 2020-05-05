import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAuthorSpaces } from '../../actions/artspace'
import Card from './Card'
import { Link } from 'react-router-dom'

class SpaceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spaces: []
        };
    }

    static propTypes = {
        getAuthorSpaces: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.getAuthorSpaces()
        console.log('fuck')
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({spaces: this.props.spaces})
        }
    }

    deleted = () => {
        this.props.getAuthorSpaces()
    }

    render() {
        const { spaces } =  this.state
        return (
            <div className="space-list">
                <div className="space-list-title">My Spaces</div>
                {
                  spaces && spaces.length ? spaces.map((space, i) =>
                    <Card space={space} key={i} deleted={this.deleted}/>
                  )
                  :
                    <Link to="/space" className="space-list-empty space-card-publish">Create a space</Link>
                }
            </div>
            // <div className="space-list">
                // {
                //   spaces && spaces.length ? spaces.map((space, i) =>
                //     <Card space={space} key={i} />
                //   )
                //   :
                //   <a className={"space-list-empty"} href="/space">+ Create your first space right now!</a>
                // }
            //     fuck
            // </div>
        )
    }
}

const mapStateToProps = state => ({
    spaces: state.artspace.spaces
})

export default connect(mapStateToProps, { getAuthorSpaces })(SpaceList)
