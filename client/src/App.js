import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Register from "./components/Register";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";
import DeleteForm from "./components/DeleteForm";
import Footer from './components/Footer';
import NoMatch from "./components/NoMatch";
import { ProtectedRoute } from "./components/ProtectedRoute";
import authService from "./services/authService";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './css/app.css';

class App extends React.Component {

  state = {
    auth: false,
  };

  checkAuth = () => {
    this.setState({ auth: authService.isAuthenticated() });
  }

  updateNavbar = () => {
    this.checkAuth();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar auth={this.state.auth} />
        <div id="main-content">
          <Router>
            <Switch>
              <Route exact path='/register' render = { props => <Register { ...props } />} />
              <Route exact path='/signin' render = { props => <SignIn { ...props}  update={ this.updateNavbar } />} />
              <Route exact path='/' render = { props => <Main { ...props } />} />
              <ProtectedRoute exact path='/create' component = { CreateForm } />
              <ProtectedRoute exact path='/edit' component = { EditForm } />
              <ProtectedRoute exact path='/delete' component = { DeleteForm } />
              <Route exact path='/signout' render = { props => <SignOut { ...props } />} />
              <Route path="*" render = { props => <NoMatch { ...props } />} />
            </Switch>
          </Router>
        </div>
        <Footer />
      </React.Fragment>
    );
  }

}

export default App;
