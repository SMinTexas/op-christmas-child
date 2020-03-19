import React from 'react';
import './dashboard.styles.scss';

class Dashboard extends React.Component {

    render() {
        return (
            <div className="dashboard-form-container">
                <form className='form' onSubmit={this.handleSubmit}>
                    <h1>Welcome to the Dashboard</h1>
                </form>
            </div>
        );
    };
}

export default Dashboard;