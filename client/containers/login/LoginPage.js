import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import validateInput from '../../validations/signup';
import axios from 'axios';
import _ from 'underscore';
import ReactCookie from 'react-cookie';
let windowWidth =  window.innerWidth;
let alignBottom = {
 position:'relative',
     top:'420px',
     textAlign:'center'
}
let alignBottomInLaptop = {
    position:'relative',
    top:'30px',
    textAlign:'center'
}
class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            lgUsername: "",
            lgPassword: "",
            lgRemember: "",
            submitText: "Sign In",
            errorMessage: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.setCookie = this.setCookie.bind(this);
        this.getCookie = this.getCookie.bind(this);
    }

    componentDidMount() {
        document.querySelector('.right-nav-items').style.display = 'none';
    }

    onChange(e) {
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name] : e.target.value});
    }


    /*COOKIE GET SET FUNCTIONS*/
    setCookie(cname, cvalue) {
        document.cookie = cname + "=" + cvalue + ";path=/;domain:localhost;";
    }

    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                var r = decodeURI(c.substring(name.length, c.length));
                r = r.replace(/%3A/g, ":")
                r = r.replace(/%2C/g, ",")
                r = r.replace(/%40/g, "@")
                return r
            }
        }
        return "";
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state)

        if(!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }





    onSubmit(e) {
        e.preventDefault();


        var self = this;
        var dateNow = new Date();
        dateNow = dateNow.getTime();

        localStorage.clear();
        console.log(dateNow);

        var data = {
            username: this.state.lgUsername,
            password: this.state.lgPassword,
            session_start_time: dateNow,
            session_end_time : ""
        }

        console.log(this.isValid());



        if(this.isValid()) {
            this.setState({submitText: "Please Wait...", errorMessage: ""})
            axios.post('/api/login', 'data='+JSON.stringify(data))
                .then(function(response) {
                    console.log(response);
                   if(response.data.status) {

                       ReactCookie.save('user', response.data.data, {path: '/'});
                       window.location.href = "/dashboard";
                   } else {
                       self.setState({submitText: "Sign In", errorMessage: "**Username and Password do not match. Please try again."})
                   }
                }).catch(function(err) {
                self.setState({submitText: "Sign In", errorMessage: "**Error from server. Please try again!"})
                console.log(err);

            });
        } else {
            self.setState({submitText: "Sign In", errorMessage: "**Please provide with a valid Username and Password"})
            console.log("no username and password");
        }


    }

    render() {
        const { errors } = this.state
        return (
            <div className="back-image-logged-out">
                <div className="login-wrap col-sm-3">
                    <div className="login-html">
                        <div className="text-center">
                            <img className="img-circle" src={require('../../../public/images/loginIcon.jpeg')} width='25%'></img>
                        </div><br/>
                        <div className="text-center login-title">FLEET MONITOR</div><br/>
                        <div className="text-center flex-container">
                            <div className="login-subheading-border"></div>
                            <div className="login-subheading"> Sign in </div>
                            <div className="login-subheading-border"></div>
                        </div>
                        <div className="hr"></div>
                        <div className="text-center error-container has-error">
                            <h4 className="help-block">{this.state.errorMessage}</h4>
                        </div>
                        <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label htmlFor="tab-1" className="tab"></label>
                        <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab"></label>
                            <div className="login-form">
                                <form onSubmit={this.onSubmit} id="login-form" className="text-left">
                                    <div className="sign-in-htm">
                                        <div className={classnames("form-group", { 'has-error': errors.lgUsername})}>
                                            {/*<label htmlFor="user" className="label text-left">Username</label>*/}
                                            <input
                                                type="text"
                                                className="input-custom form-control"
                                                value={this.state.lgUsername}
                                                onChange={this.onChange}
                                                id="lgUsername"
                                                name="lgUsername"
                                                placeholder="Username"/>
                                            {/*{errors.lgUsername && <span className="help-block">{errors.lgUsername}</span>}*/}
                                        </div>
                                        <div className={classnames("form-group", { 'has-error': errors.lgPassword})}>
                                            {/*<label htmlFor="pass" className="label text-left">Password</label>*/}
                                            <input type="password"
                                                   className="input-custom form-control"
                                                   value={this.state.lgPassword}
                                                   onChange={this.onChange}
                                                   id="lgPassword"
                                                   name="lgPassword"
                                                    placeholder="Password"/>
                                            {/*{errors.lgPassword && <span className="help-block">{errors.lgPassword}</span>}*/}
                                        </div><br/>
                                       {/* <div className="group">
                                            <input id="check" type="checkbox" className="check" checked/>
                                            <label htmlFor="check"><span className="icon"></span> Remember me on this computer</label>
                                        </div>*/}
                                        <div className="group">
                                            <input type="submit" className="btn btn-login button-100w btn-primary" value={this.state.submitText}/>
                                        </div>
                                        {/*<div className="foot-lnk">
                                            <a href="#forgot">Forgot Password?</a>
                                        </div>*/}
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
                <div style={(windowWidth > 1400) ? alignBottom : alignBottomInLaptop}>
                    <p> Powered by </p>
                    <p className="top-buffer">Senvion SCADA Solutions | Senvion Data Analytics platform</p>
                </div>
            </div>
        )
    }
}


export default LoginPage;