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
import Login from './accounts/Login'
import Register from './accounts/Register'
import PrivateRoute from './common/PrivateRoute'
import ArtObjectForm from './profile/ArtObjectForm'
import SpaceForm from './profile/SpaceForm'


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
                  <Route exact path="/" component={PrivateContent} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/artobject" component={ArtObjectForm} />
                  <PrivateRoute exact path="/space" component={SpaceForm} />
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
