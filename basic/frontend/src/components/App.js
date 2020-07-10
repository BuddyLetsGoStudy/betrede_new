import React, { Component, Fragment  } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '../store'
import { loadUser } from '../actions/auth'

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Header from './layout/Header'
import Alerts from './layout/Alerts';
import PrivateContent from './layout/PrivateContent';
import Login from './auth/Login'
import Logout from './auth/Logout';
import ResetPassword from './auth/ResetPassword'
import RecoveryLink from './auth/RecoveryLink'
import Register from './auth/Register'
import PrivateRoute from './common/PrivateRoute'
import ArtObjectForm from './profile/ArtObjectForm'
import MobileButton from './mobile/MobileButton'

import Space from './profile/Space'
import SpaceList from './list/SpaceList'
import Scene from './scene/Scene'
import ProfileDefender from './profile/ProfileDefender'
import SpaceFormNew from './profile/SpaceFormNew';
import flatSpace from './flat/flatSpace';



const alertOptions = {
  timeout: 3000,
  position: 'top center'
}

class App extends Component {
  componentDidMount(){
    console.log(store.dispatch(loadUser()))
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/logout" component={Logout} />
                  <Route exact path="/myspaces" component={SpaceList} />
                  <Route exact path="/reset" component={ResetPassword} />
                  <Route exact path="/recovery/:token" component={RecoveryLink} />

                  <Route exact path="/create" component={SpaceFormNew} />
                  <Route exact path="/flat/:spaceID" component={flatSpace} />

                  <Route exact path="/mobile/:spaceID" component={MobileButton} />
                  <PrivateRoute component={<Route exact path="/edit/:spaceID" component={SpaceFormNew} />} /> 
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
