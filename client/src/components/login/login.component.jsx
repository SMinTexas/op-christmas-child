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
        //return this.state.username.length > 0 && this.state.password.length > 0;
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        fetch('/users/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                //username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.success === false) {
                this.setState({
                    hasError:true,
                    userMessage:json.message
                });
                return false;
            }
            this.setState({
                userMessage:json.message,
                id:json.id
            });
            this.props.dispatch1(
                json.token, 
                json.id, 
                json.username, 
                json.password);
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

            this.state.hasError = false;

            return (
                <div className="login-form-container">
                    <form className='form' onSubmit={this.handleSubmit}>
                        <input className='email-input'
                            name='email'
                            placeholder='Enter E-Mail'
                            onChange={this.handleChange}
                            value=''
                            label='E-Mail'
                            required
                        />
                        {/* <input className='username-input'
                            name='username'
                            placeholder='Enter Username'
                            onChange={this.handleChange}
                            value=''
                            label='UserName'
                            required
                        /> */}
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
                    <input className='email-input'
                        name='email'
                        placeholder='Enter E-Mail'
                        onChange={this.handleChange}
                        value={this.state.email}
                        label='E-Mail'
                        required
                    />
                    {/* <input className='username-input'
                        name='username'
                        placeholder='Enter Username'
                        onChange={this.handleChange}
                        value={this.state.username}
                        label='UserName'
                        required
                    /> */}
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
        dispatch1: (token, id, username, password) => {
            dispatch(jwtAdd(token, id, username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

