import React from 'react';
import './dashboard.styles.scss';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import { add as jwtAdd } from '../../redux/jwt-verification/actions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.jwt.userid
        }
    }

    render() {
        return (
            <div className="dashboard-form-container">
                <form className='form-dashboard' onSubmit={this.handleSubmit}>
                    <h1>Welcome to the Dashboard</h1>
                    <h4>Here we will see each primary category</h4>
                    <h4>contained in a separate component</h4>
                    <h4>displaying a category picture and an overall count</h4>
                    <h4>of items in the specific category.</h4>
                    <br />
                    <h4>UserID: {this.props.jwt.id}  UserName: {this.props.jwt.username}</h4>
                    <h5>User Password: {this.props.jwt.password}</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
//export default Dashboard;