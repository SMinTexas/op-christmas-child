import React from 'react';
//import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import Menu from './components/menu/menu.component';
import LogIn from './components/login/login.component';
import Register from './components/register/register.component';

class App extends React.Component {
  render() {
    return (
      <>
      <Router>
        <Menu />
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/login' component={LogIn} />
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jwt: state.jwt
  }
}

export default connect(mapStateToProps)(App)

