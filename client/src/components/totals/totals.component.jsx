import React from 'react';
import './totals.styles.scss';
import { connect } from 'react-redux';
import { add as jwtAdd } from '../../redux/jwt-verification/actions';

class Totals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.jwt.id,
            category: '',
            total:0,
            userMessage: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        fetch('/inventories/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: this.state.userid,
                category: this.state.category,
                total: this.state.total
            }),
        })
        .then(response => response.json())
        .then(json => {
            if (json.success === false) {
                this.setState({
                    userMessage:json.message
                });
                return false;
            }
            this.setState({
                userMessage:json.message,
                id:json.id
            })
            this.props.dispatch1(
                json.token, 
                json.id, 
                json.username, 
                json.password);
        }).catch(error => {console.log(error)});
    }

    // handleChange = event => {
    //     const { value, name } = event.target;
    //     this.setState({ [name]: value });
    // }

    render() {

        return (
            <div className="totals-form-container">
                <form id = 'form-totals' className='form-totals' onSubmit={this.handleSubmit}>
                    <h3>Add Inventory</h3>
                    <h6>Required fields *</h6>
                    <h6 name='userid'>UserID:{this.props.jwt.id}</h6>
                    <h6>{this.state.userMessage}</h6>
                </form>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    console.log('state.jwt',state.jwt)
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

export default connect(mapStateToProps, mapDispatchToProps)(Totals);