import React from 'react';
import './splash.styles.scss';
import splashImage from '../../assets/main-page-picture.jpeg';

class Splash extends React.Component {
    render() {
        return (
            <div className="splash-form-container">
                <form className='form' onSubmit={this.handleSubmit}>
                    <img 
                        src={splashImage} 
                        className='company-logo' 
                        alt='logo' 
                    />
                </form>
            </div>
        );
    };
}

export default Splash;