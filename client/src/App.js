import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
//import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import Menu from './components/menu/menu.component';
import LogIn from './components/login/login.component';
import Register from './components/register/register.component';
import Dashboard from './components/dashboard/dashboard.component';
import AddInventory from './components/add-inventory/add-inventory.component';
// import EditInventory from './components/edit-inventory/edit-inventory.component';
import InventoryList from './components/inventory-list/inventorylist.component';
import InventoryTest from './components/inventory/inventory.component';

const PrivateRoute = ({ component: Component, ...rest }) => ( 
  <Route {...rest } render = {(props) => (
            rest.isAuthenticated === true 
            ? <Component {...props } /> 
            : <Redirect to = '/' />
        )}/>
)

// const PrivateRoute1 = ({component: Component, ...rest}) => (    
//   <Route {...rest} render={(props) => (
//       rest.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to='/dashboard'/>
//     )}/>
// )

class App extends React.Component {
  render() {
    return (
      <>
      <Router>
        <Menu />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' component={LogIn} />
          <Route path='/register' component={Register} />
          <PrivateRoute path='/dashboard' exact component={Dashboard} 
            isAuthenticated={this.props.jwt.isAuthenticated} />
          <PrivateRoute path='/add' exact component={AddInventory}
            isAuthenticated={this.props.jwt.isAuthenticated} />
          <PrivateRoute path='/inventory' exact component={InventoryList}
            isAuthenticated={this.props.jwt.isAuthenticated} />
          <PrivateRoute path='/inventorytest' exact component={InventoryTest}
            isAuthenticated={this.props.jwt.isAuthenticated} />
          {/* <PrivateRoute path='/inventory/:pageSize/:page' exact component={InventoryList}
            isAuthenticated={this.props.jwt.isAuthenticated} /> */}
          {/* <PrivateRoute path='/edit' exact component={EditInventory}
            isAuthenticated={this.props.jwt.isAuthenticated} /> */}
        </Switch>
      </Router>
      </>
    );
  }
}

//export default App;
const mapStateToProps = (state) => {
    return {
        jwt: state.jwt
    }
}

export default connect(mapStateToProps)(App);