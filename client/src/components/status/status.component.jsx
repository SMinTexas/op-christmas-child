import React, { Component } from "react";
import './status.styles.scss';
import { connect } from "react-redux";


class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            time: new Date().toLocaleString()
        };
    }

    convertDay() {
        var day = "";
        switch (new Date().getDay()) {
            case 0:
                day = "Sunday ";
                break;
            case 1:
                day = "Monday ";
                break;
            case 2:
                day = "Tuesday ";
                break;
            case 3:
                day = "Wednesday ";
                break;
            case 4:
                day = "Thursday ";
                break;
            case 5:
                day = "Friday ";
                break;
            case 6:
                day = "Saturday ";
                break;
            default:
                break;
        }
        return day;
    }

    setWelcome() {
        var user = this.state.username;
        if (this.state.username ===  '' || undefined || null) {
            return "Please log in"
        } else {
            return "Welcome " + user;
        }
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            time: new Date().toLocaleString()
        });
    }
    
    render() {
        console.log(this.state.username)
        var curDay = this.convertDay()
        var msg = this.setWelcome()
        var statusString = curDay + this.state.time
        return (
            <>
                <div className="Status-bar">
                    {/* <p>{msg}</p>
                    <p>{curDay}{this.state.time}</p> */}
                    <span>{statusString}</span>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        time: state.time
    }
}

export default connect(mapStateToProps)(Status)