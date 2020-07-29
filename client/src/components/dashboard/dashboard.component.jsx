import React from 'react';
import './dashboard.styles.scss';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
//import { add as jwtAdd } from '../../redux/jwt-verification/actions';
import { verify as jwtVerify } from '../../redux/jwt-verification/actions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.jwt.id, 
            token: this.props.jwt.token,
            items: []
        }
    }

    componentDidMount() {
        console.log('this is the state componentDidMount:', this.state)

        fetch('/inventories/dashboard/' + this.state.userid, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log('JSON.SUCCESS = ', json.success)
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


        // fetch('/inventories/dashboard/' + this.state.userid, {
        //     method: "GET",//POST
        //     headers: { 'Content-Type': 'application/json' },
        //     // body: JSON.stringify({
        //     //     userid: this.state.userid
        //     // }),
        // })
        // .then(response => response.json())
        // .then(json => {
        //     console.log('JSON.SUCCESS = ', json.success)
        //     if (json.success === false) {
        //         this.setState({
        //             hasError:true,
        //             userMessage:json.message
        //         });
        //         return false;
        //     }
        //     this.setState({
        //         userMessage:json.message,
        //         id:json.id,
        //         token:json.token,
        //         recordInserted:true
        //     })
        //     this.props.dispatch1(
        //         json.token, 
        //         json.id, 
        //         json.username, 
        //         json.password);
        //     console.log('JSON.TOKEN = ', this.props.jwt.token)
        // }).catch(error => {console.log(error)});
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
                    <h6>Token: {this.props.jwt.token}</h6>
                </form>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    console.log('DASHBOARD COMPONENT mapStateToProps: state.jwt = ', state.jwt)
    return {
        jwt: state.jwt
    }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         dispatch1: (token, id, username) => {
//             //console.log('token = ', token, 'id = ', id, 'username = ', username)
//             //dispatch(jwtAdd(token, id, username))
//             dispatch(jwtVerify(token))
//         }
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        dispatch1: (token, id, username, password) => {
            console.log('DASHBOARD COMPONENT mapDispatchToProps: token ===== ', token)
            //dispatch(jwtVerify(token))
            dispatch(jwtVerify(token, id, username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
//export default connect(mapStateToProps)(Dashboard);
