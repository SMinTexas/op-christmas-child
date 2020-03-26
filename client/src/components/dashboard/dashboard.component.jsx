import React from 'react';
import './dashboard.styles.scss';

class Dashboard extends React.Component {

    render() {
        return (
            <div className="dashboard-form-container">
                <form className='form-dashboard' onSubmit={this.handleSubmit}>
                    <h1>Welcome to the Dashboard</h1>
                    <h4>Here we will see each primary category</h4>
                    <h4>contained in a separate component</h4>
                    <h4>displaying a category picture and an overall count</h4>
                    <h4>of items in the specific category.</h4>
                </form>
            </div>
        );
    };
}

export default Dashboard;