import React from 'react';
import {Link} from 'react-router'
import '../../../public/styles/containers/settings/SideNavigation.css'

class SideNavigation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    componentDidMount() {
        console.log("yes in side nav");
        document.querySelector('.main-container').classList.remove('body-wrapper');
        document.querySelector('.main-container').classList.remove('margin-top');
       // document.querySelector('.content-container').style.height = window.innerHeight+"px";
        /*document.querySelector('.main-container').style.backgroundColor = "#ffffff";*/
        document.querySelector('.breadcrumbs').style.display = 'none';
        /*document.body.style.background = '#FFFFFF';*/
    }

    render() {
        return(
            <div className="e-sidenav-container flex-container-nowrap flex-start-v flex-start-h">
                <div className="s-sidenav">
                    {/*<div className="sidenav-heading">Your Account</div><br/>*/}
                    <div className="navigation-items">
                        <Link to="">
                            <div className="active">General</div>
                        </Link>
                        {/*<Link to="">
                            <div>Change Password</div>
                        </Link>*/}
                        <Link to="">
                            <div>Advanced Settings</div>
                        </Link>
                        <Link to="">
                            <div>Security and Privacy</div>
                        </Link>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default SideNavigation;