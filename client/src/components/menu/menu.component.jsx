import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import './menu.styles.scss';
import { remove } from '../../redux/jwt-verification/actions'

class Menu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showMenu: false,
      didLogout: false
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  handleLogoutClick(e) {
    this.props.dispatch1()
    this.setState({
      ...this.state,
      didLogout: true
    })
  }

  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    //console.log('this.props.jwt.isAuthenticated',this.props.jwt.isAuthenticated);
    if (this.props.jwt.isAuthenticated === true) {
      return (
        <section className="navigation">
          {this.state.disLogout ? <Redirect to="/" /> : null}
          <div className="nav-container">
            <nav>
              <div className="nav-mobile">
                <a id="nav-toggle" href="#!"><span></span></a>
              </div>
              <ul className="nav-list">
                {/* <li>
                  <Link to="/">Home</Link>
                </li> */}
                <li>
                  <Link to='/inventory'>Inventory</Link>
                </li>
                <li>
                  <Link to='/add'>Add Inventory</Link>
                </li>
                <li>
                  <a onClick={e => this.handleLogoutClick()} >Logout</a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      )
    }
    else {
      return (
        <section className="navigation">
        {this.state.didLogout ? <Redirect to='/' /> : null}
        <div className="nav-container">
          <nav>
            <div className="nav-mobile">
              <a id="nav-toggle" href="#!"><span></span></a>
            </div>
            <ul className="nav-list">
              <li>
                <Link to="/">Home </Link>
              </li>
              <li>
                <Link to="/register">Register </Link>
              </li>
              <li>
                <Link to="/login">Log In </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    jwt: state.jwt
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(remove())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
