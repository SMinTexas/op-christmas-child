import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link, NavLink, Redirect } from "react-router-dom";
import './menu.styles.scss';
import { remove } from '../../redux/jwt-verification/actions'
import Register from '../register/register.component';

class Menu extends Component {
  constructor() {
    super();
    
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
    console.log("did run")
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
    return (
    <section className="navigation">
      {this.state.didLogout ? <Redirect to='/' /> : null}
      <div className="nav-container">
        {/* <div className="brand">
          <a href="#!"></a>
        </div> */}
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
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(remove())
    }
  }
}

export default connect(null, mapDispatchToProps)(Menu)

            {/* <li>
              <a href="#!">About</a>
            </li>
            <li>
              <a href="#!">Resources</a>
            <ul class="nav-dropdown">
              <li>
                <a href="#!"></a>
              </li>
              <li>
                <a href="#!">Web Development</a>
              </li>
              <li>
                <a href="#!">Graphic Design</a>
              </li>
            </ul>
          </li> */}
          {/* <li>
            <a href="https://start.teamviewer.com/">TeamViewer</a>
          </li> */}
          {/* <li>
            <a href="#!">Contact</a>
          </li> */}
          {/* <li>
            <a onClick={e => this.handleLogoutClick()} >Logout</a>
          </li> */}