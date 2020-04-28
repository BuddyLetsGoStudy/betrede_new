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
import Register from './auth/Register'
import PrivateRoute from './common/PrivateRoute'
import ArtObjectForm from './profile/ArtObjectForm'
import Space from './profile/Space'
import SpaceList from './list/SpaceList'
import Scene from './scene/Scene'
import ProfileDefender from './profile/ProfileDefender'
import SpaceFormNew from './profile/SpaceFormNew';





const alertOptions = {
  timeout: 3000,
  position: 'top center'
}

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser())
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
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/artobject" component={ArtObjectForm} />
                  <Route exact path="/space" component={SpaceFormNew} />
                  <Route exact path='/scene/:spaceID' component={Scene} />
                  <Route exact path="/profile" component={ProfileDefender} />
                  <PrivateRoute exact path="/fuckyou" component={PrivateContent} />
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
