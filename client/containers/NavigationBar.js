import React from 'react'
import { Link } from 'react-router'
import { ButtonGroup, Button, Dropdown, MenuItem, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import FaBell from 'react-icons/lib/fa/bell'
import FaUser from 'react-icons/lib/fa/user'
import ReactCookie from 'react-cookie';

export default () => {
    var user = ReactCookie.load('user');
    var user_type_text = "";

    if(user && user.user_type == 1) {
        user_type_text= "TCC Admin"
    } else if(user && user.user_type == 2) {
        user_type_text= "Supervisor"
    } else {
        user_type_text= "Technician"
    }

    function logout() {
        ReactCookie.remove('user',{ path: '/' });
        window.location.href = "/login";
    }

    return (
        <div className="secondary-nav just-upper-nav">
            <nav className="second-nav">
                <div className="container-fluid nav-items flex-container flex-sb-h">
                    <div>
                        <Link className="" to="/dashboard">
                            <div className="navbar-brand flex-container-nowrap">
                                <div></div>
                                <div className="company-title">HILBERT</div>
                            </div>
                        </Link>
                    </div>
                    <div className="flex-container right-nav-items">
                        <div className="text-right side-buttons">
                            <Dropdown pullRight id="nav-notifs" className="nav-dropdown-icon flex-container">
                                <Dropdown.Toggle>
                                    <FaBell className="nav-icon-right"/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="super-colors">
                                    <MenuItem eventKey="16">Status Code 1234 updated</MenuItem>
                                    <MenuItem eventKey="4">User John logged in</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="text-right side-buttons">
                            <Dropdown id="nav-profile" pullRight className="nav-dropdown-icon flex-container">
                                <Dropdown.Toggle>
                                    <div className="flex-container">
                                        <div>
                                            <FaUser className="nav-icon-right"/>&nbsp;&nbsp;&nbsp;
                                        </div>
                                        <div>
                                            {user_type_text}
                                        </div>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="super-colors">
                                    <MenuItem eventKey="1">Help</MenuItem>
                                    <MenuItem eventKey="2">Settings</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem onSelect={logout} eventKey="4">Logout</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
