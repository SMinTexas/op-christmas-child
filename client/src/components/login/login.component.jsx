import React from 'react';
import './login.styles.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { add as jwtAdd } from '../../redux/jwt-verification/actions';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            username: '',
            password: '',
            hasError: false,
            userMessage: ''
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        fetch('/users/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.err) {
                this.setState({hasError:true,userMessage:json.error});
                return false;
            }
            //console.log('JSON',json);
            this.setState({userMessage:json.message,id:json.id})
            console.log('STATE:', this.state)
            //console.log('TOKEN:',json.token,'ID:',json.id,'USERNAME:',json.username)
            this.props.dispatch1(json.token, json.id, json.username);
        }).catch(error => {console.log(error)});
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        if (this.props.jwt.isAuthenticated === true) {
            return <Redirect to='/dashboard' />
          }

        if (this.state.hasError === true) {
            return (
                <div className="login-form-container">
                    <form className='form' onSubmit={this.handleSubmit}>
                        <input className='username-input'
                            name='username'
                            placeholder='Enter Username'
                            onChange={this.handleChange}
                            value=''
                            label='UserName'
                            required
                        />
                        <input className='password-input'
                            name='password'
                            type='password'
                            placeholder='Enter Password'
                            value=''
                            onChange={this.handleChange}
                            label='Password'
                            required
                        />
                        <button className='submit'>Log In</button>
                        <h6>{this.state.userMessage}</h6>
                    </form>
                </div>
            );
        }

        return (
            <div className="login-form-container">
                <form className='form' onSubmit={this.handleSubmit}>
                    <input className='username-input'
                        name='username'
                        placeholder='Enter Username'
                        onChange={this.handleChange}
                        value={this.state.username}
                        label='UserName'
                        required
                    />
                    <input className='password-input'
                        name='password'
                        type='password'
                        placeholder='Enter Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <button className='submit'>Log In</button>
                </form>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        jwt: state.jwt
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: (token, id, username) => {
            dispatch(jwtAdd(token, id, username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

