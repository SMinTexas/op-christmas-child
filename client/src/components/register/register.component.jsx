import React from 'react';
import './register.styles.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { add as jwtAdd } from '../../redux/jwt-verification/actions';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            toLogin: false,
            hasError: false,
            userMessage: ''
        };
    }

    validateForm() {
        return this.state.username.length > 0 && 
               this.state.email.length > 0 &&
               this.state.password.length > 0;
    }

    handleSubmit = e => {
        e.preventDefault();

        fetch('/users/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.error) return false;
            console.log(json);
            if (json.success === true) {
                this.setState({toLogin: true, userMessage: json.message});
                this.props.dispatch1(json.token,json.username);
            }
            else {
                this.setState({hasError: true, userMessage: json.message});
            }
        }).catch(error => {
                console.log(error);
            })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        if (this.props.jwt.isAuthenticated === true) {
            return <Redirect to='/dashboard' />
        }

        if (this.state.toLogin === true) {
            return <Redirect to='/login' />
        }

        if (this.state.hasError === true) {

            //this.state.hasError = false;
            this.setState({hasError: false})
            
            return (
                <div className="register-form-container">
                    <form className='form' onSubmit={this.handleSubmit}>
                        <input className='username-input'
                            name='username'
                            placeholder='Enter Username'
                            onChange={this.handleChange}
                            value=''
                            label='UserName'
                            required
                        />
                        <input className='email-input'
                            name='email'
                            placeholder='Enter E-Mail'
                            onChange={this.handleChange}
                            value=''
                            label="E-Mail"
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
                        <button className='submit'>Register</button>
                        <h6>{this.state.userMessage}</h6>
                    </form>
                </div>
            );
        }

        return (
            <div className="register-form-container">
                <form className='form' onSubmit={this.handleSubmit}>
                    <input className='username-input'
                        name='username'
                        placeholder='Enter Username'
                        onChange={this.handleChange}
                        value={this.state.username}
                        label='UserName'
                        required
                    />
                    <input className='email-input'
                        name='email'
                        placeholder='Enter E-Mail'
                        onChange={this.handleChange}
                        value={this.state.email}
                        label="E-Mail"
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
                    <button className='submit'>Register</button>
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
        dispatch1: (token, username) => {
            dispatch(jwtAdd(token, username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)