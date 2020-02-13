import React from 'react';
import './homepage.styles.scss';
//import SignIn from '../../components/login/login.component';
import Splash from '../../components/splash/splash.component';
//import logo from '../../assets/occ.jpeg';

class HomePage extends React.Component {
    render() {
        return (
            <>
                {/* <div className='logo-main'>
                    <img src={logo} className='company-logo' alt='logo' />
                </div> */}

                <div className='homepage'>
                    {/* <SignIn /> */}
                    <Splash />
                </div>
            </>
        );
    }
}

export default HomePage;