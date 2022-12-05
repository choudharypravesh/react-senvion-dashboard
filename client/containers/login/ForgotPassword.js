import React from 'react';
import { Link } from 'react-router';

class ForgotPassword extends React.Component {
    render() {
        return (
            <div>
                <div className="text-center">
                     <div className="login-form-1">
                         <div className="box-title text-center">
                             FORGOT PASSWORD
                         </div>
                         <form id="forgot-password-form" className="text-left">
                             <div className="etc-login-form">
                                 <p>When you fill in your registered email address,
                                     you will be sent instructions on how to reset your password.</p>
                             </div>
                             <div className="login-form-main-message"></div>
                             <div className="main-login-form">
                                 <div className="login-group">
                                     <div className="form-group">
                                         <label htmlFor="fp_email" className="sr-only">Email address</label>
                                         <input type="text" className="form-control" id="fp_email"
                                                name="fp_email" placeholder="email address"/>
                                     </div>
                                 </div>
                                 <button type="submit" className="login-button">Go</button>
                             </div>
                             <div className="etc-login-form">
                                 <p>Forgot your password? <Link to="/forgot-password">click here</Link></p>
                                 <p>New user? <Link to="/signup">create new account</Link></p>
                             </div>
                         </form>
                     </div>
                 </div>
            </div>
        )
    }
}


export default ForgotPassword;