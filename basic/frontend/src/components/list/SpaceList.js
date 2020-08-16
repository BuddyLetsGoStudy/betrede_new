import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAuthorSpaces } from '../../actions/artspace'
import Card from './Card'
import { Link, Redirect } from 'react-router-dom'
import _ from 'lodash';

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
        console.log(window.location.pathname)
    }

    // componentDidUpdate(prevProps){
    //     if(!_.isEqual(prevProps.spaces, this.props.spaces)){
    //         console.log('upd')
    //         console.log(prevProps.spaces, this.props.spaces)

    //         this.props.auth.isAuthenticated && this.props.getAuthorSpaces();
    //         this.setState({spaces: this.props.spaces})
    //     } else {
    //         this.setState({spaces: this.props.spaces})
    //     }
    // }

    static getDerivedStateFromProps(props, current_state) {
        if (!_.isEqual(current_state.spaces, props.spaces)) {
          return {
            spaces: props.spaces,
          }
        }
        return null
      }

    deleted = id => {
        console.log('smth')
        this.props.getAuthorSpaces()
    }

    render() {
        const { spaces } =  this.state;
        const { isAuthenticated, isLoading } = this.props.auth;

        if (isLoading) {
            return <div className={'loader'}></div>;
        } else if (isAuthenticated) {
            return (
                <div className="space-list">
                    <div className="space-list-title">My Spaces</div>
                    {
                      spaces && spaces.length ? spaces.map((space, i) =>
                        <Card space={space} key={i} deleted={this.deleted}/>
                      )
                      :
                        <Link to="/create" className="space-list-empty space-card-publish">Create a space</Link>
                    }
                </div>
            )
        } else {
            return <Redirect to="/login/" />;
        }
        
    }
}

const mapStateToProps = state => ({
    spaces: state.artspace.spaces,
    auth: state.auth
})

export default connect(mapStateToProps, { getAuthorSpaces })(SpaceList)
