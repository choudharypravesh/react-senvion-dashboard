import React from 'react'
import { Link, browserHistory } from 'react-router'
import { ButtonGroup, Button, Dropdown, MenuItem, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactCookie from 'react-cookie';
import _ from 'underscore'
import classnames from 'classnames'
import FaCog from 'react-icons/lib/fa/cog';
import FaBell from 'react-icons/lib/fa/bell'
import FaClock from 'react-icons/lib/fa/clock-o'
import FaBriefCase from 'react-icons/lib/fa/briefcase'
import FaUser from 'react-icons/lib/fa/user'
import FaCheck from 'react-icons/lib/fa/check'
import FaReport from 'react-icons/lib/fa/bar-chart'
import FaInstructions from 'react-icons/lib/fa/sticky-note'
import BreadCrumbs from 'react-breadcrumbs';
import CreateServiceOrderPopup from '../components/CreateServiceOrder/CreateServiceOrderModal'
import FaPlus from 'react-icons/lib/fa/plus-circle';
import { showHidePopup} from '../../client/actions/AppActions'
import SkeletonPredictiveAnalysis from '../../public/styles/containers/Skeleton.css'


class Skeleton extends React.Component {
    constructor(props) {
        super(props);
        this.user = ReactCookie.load('user');
        this.topNavItems = ["Dashboard", "Scheduler", 'Monitor', 'Service Assist', 'Map', 'Admin', "Help"];

        this.onRightMenuSelect = this.onRightMenuSelect.bind(this);
        this.topMenuItemClick = this.topMenuItemClick.bind(this);
        this.logout = this.logout.bind(this);
        this.openCreateServiceOrderPopup = this.openCreateServiceOrderPopup.bind(this);
        this.showPopup = this.showPopup.bind(this);
    }

    componentDidMount() {
        console.log("yes componentDidMount");
        Ps.initialize(document.querySelector('#skeleton-dashboard'));
    }



    topMenuItemClick(index) {
        var self = this;
        console.log(index); // 0,1,2

        localStorage.indexTop = index;

        let userType = this.user.user_type;
        console.log(userType);

        //TEMPORARY ROUTING
        if(index == 0) {
            browserHistory.push("/dashboard")
        } else if(index == 1) {
            //window.location.href = "/blank"
            //self.history.pushState(null, '/technician/analyze/anomalies');
        } else if(index == 2) {
            //window.location.href = "/monitor/scada-monitor"
            window.open(
                '/monitor/scada-monitor',
                '_blank' // <- This is what makes it open in a new window.
            );
        } else if(index == 3) {
            //window.location.href = "/monitor/scada-monitor"
            browserHistory.push("/maps")
        }
    }

    showPopup() {
        self.refs.globalPopup.showPopup();
    }


    logout() {
        ReactCookie.remove('user',{ path: '/' });
        window.location.href = "/login";
    }

    onRightMenuSelect(key, e) {
        switch (key) {
            case 1:
                browserHistory.push('/analyze/Fleet');
                break;
            case 2:
                browserHistory.push('/analyze/farm');
                break;
            case 3:
                browserHistory.push("analyze/turbine");
                break;
            case 4:
                browserHistory.push("/analyze/datalabs");
                break;
            case 5:
                browserHistory.push("/monitor/alerts");
                break;
            case 6:
                browserHistory.push("/monitor/scada-monitor");
                break;
            case 7:
                //window.location.href = "/analyze/datalabs";
                break;
            case 8:
                browserHistory.push("/service-assist/orders-list-view");
                break;
            case 9:
                browserHistory.push("/service-assist/time-view");
                break;
            case 10:
                browserHistory.push("/admin/approve-requests");
                break;
            case 11:
                browserHistory.push("/admin/reports");
                break;
            case 12:
                browserHistory.push("/admin/instructions");
                break;
            case 13:
                browserHistory.push("/admin/approve-status-codes");
                break;
            case 14:
                browserHistory.push("/forecast/power");
                break;
            case 15:
                browserHistory.push("/forecast/weather");
                break;
            case 16:
                browserHistory.push("/admin/contracts");
                break;
            case 17:
                browserHistory.push("/monitor/overview");
                break;
            case 18:
                break;
            case 19:
                browserHistory.push("/help/about");
                break;
            case 98:
                browserHistory.push("/settings");
                break;
            case 99:
                this.logout()
                break;
        }
    }

    openCreateServiceOrderPopup() {
        this.refs.globalPopup.getWrappedInstance().showPopup();
    }

    render() {
        return(
            <div className="fluid-container pa-skeleton" id="skeleton-dashboard">
                <div className={classnames('secondary-nav')}>
                    <nav className="second-nav">
                        <div className="nav-items container-fluid flex-container flex-sb-h">
                            <div className="flex-container-nowrap">
                                <div className="">
                                    <Link className="" to="/dashboard">
                                        <div className="navbar-brand flex-container-nowrap">
                                            <div className="company-title">HILBERT</div>
                                        </div>
                                    </Link>
                                    <ul className="nav navbar-nav pa-navbar">

                                        {/*Dashboard*/}
                                        <li>
                                            <div onClick={() => {this.topMenuItemClick(0)}} className="nav-menu-item">{this.topNavItems[0]}</div>
                                        </li>

                                        {/*Monitor*/}
                                        <li id="monitor">
                                            {/*<div onClick={() => {this.topMenuItemClick(0)}} className="">{this.state.topNavItems[0]}</div>*/}
                                            <Dropdown id="nav-profile" className="nav-dropdown-icon flex-container">
                                                <Dropdown.Toggle className="font-15">
                                                    Monitor
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={17} className={classnames({'display-none': this.user.user_type == 6})}>Alerts Overview</MenuItem>
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={5} className={classnames({'display-none': this.user.user_type == 6})}>Alerts</MenuItem>
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={6}>SCADA Monitor</MenuItem>
                                                    {/*<MenuItem onSelect={this.onRightMenuSelect} eventKey={7}>Status Log</MenuItem>*/}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>

                                        {/*Analyze*/}
                                        <li>
                                            {/*<div onClick={() => {this.topMenuItemClick(0)}} className="">{this.state.topNavItems[0]}</div>*/}
                                            <Dropdown id="nav-profile" className="nav-dropdown-icon flex-container">
                                                <Dropdown.Toggle className="font-15">
                                                    Analyze
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={1}>Fleet</MenuItem>
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={2}>Farm</MenuItem>
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={3}>Turbine</MenuItem>
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={4} className={classnames({ 'display-none': this.user.user_type == 4 || this.user.user_type == 6})}>Datalabs</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>

                                        {/*Power Forecast*/}
                                        <li>
                                            {/*<div onClick={() => {this.topMenuItemClick(0)}} className="">{this.state.topNavItems[0]}</div>*/}
                                            <Dropdown id="nav-profile" className="nav-dropdown-icon flex-container">
                                                <Dropdown.Toggle className="font-15">
                                                    Forecast
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={14} className={classnames({ 'display-none': this.user.user_type == 4 || this.user.user_type == 6})}>Power</MenuItem>
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={15}>Weather</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>

                                        {/*Scheduler*/}
                                        <li className={classnames({'display-none': this.user.user_type == 4 || this.user.user_type == 6})}>
                                            <div onClick={() => {this.topMenuItemClick(1)}} className="nav-menu-item">{this.topNavItems[1]}</div>
                                        </li>


                                        {/*Service Assist*/}
                                        <li className={classnames({'display-none': this.user.user_type == 4 || this.user.user_type == 6})}>
                                            {/*<div onClick={() => {this.topMenuItemClick(0)}} className="">{this.state.topNavItems[0]}</div>*/}

                                            <Dropdown id="nav-profile" className={classnames("nav-dropdown-icon flex-container", {'display-none': (this.user.user_type !== 2 ^ this.user.user_type !== 1 ^ this.user.user_type !== 3) === 1?true:false})}>
                                                <Dropdown.Toggle className="font-15">
                                                    Service Assist
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem className={classnames({'display-none':this.user.user_type == 2 || this.user.user_type == 1 })} onSelect={this.onRightMenuSelect} eventKey={8}>Order</MenuItem>
                                                    <MenuItem className={classnames({'display-none':this.user.user_type == 2 || this.user.user_type == 1 })} onSelect={this.onRightMenuSelect} eventKey={9}>Time</MenuItem>

                                                    <MenuItem className={classnames({'display-none':this.user.user_type == 3 || this.user.user_type == 1 })} onSelect={this.onRightMenuSelect} eventKey={10}>Approvals</MenuItem>
                                                    <MenuItem className={classnames({'display-none':this.user.user_type == 3 || this.user.user_type == 1 })} onSelect={this.onRightMenuSelect} eventKey={11}>Reports</MenuItem>
                                                    <MenuItem className={classnames({'display-none':this.user.user_type == 3 || this.user.user_type == 1 })} onSelect={this.onRightMenuSelect} eventKey={12}>Instructions</MenuItem>

                                                    <MenuItem className={classnames({'display-none':this.user.user_type == 3 || this.user.user_type == 2 })} onSelect={this.onRightMenuSelect} eventKey={13}>Approvals</MenuItem>
                                                    <MenuItem className={classnames({'display-none':this.user.user_type == 3 || this.user.user_type == 2 })} onSelect={this.onRightMenuSelect} eventKey={11}>Reports</MenuItem>
                                                    <MenuItem className={classnames({'display-none':this.user.user_type == 3 || this.user.user_type == 2 })} onSelect={this.onRightMenuSelect} eventKey={12}>Instructions</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </li>


                                        {/*Maps*/}
                                        <li>
                                            <div onClick={() => {this.topMenuItemClick(3)}} className="nav-menu-item">{this.topNavItems[4]}</div>
                                        </li>




                                        {/*Admin*/}
                                        <li>
                                            {/*<div onClick={() => {this.topMenuItemClick(0)}} className="">{this.topNavItems[0]}</div>*/}

                                            <Dropdown id="nav-profile" className={classnames("nav-dropdown-icon flex-container", {'display-none': this.user.user_type == 4 || this.user.user_type == 6})}>
                                                <Dropdown.Toggle className="font-15">
                                                    Admin
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={16}>Contracts</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>





                                        {/*Help*/}
                                        <li>
                                            {/*<div onClick={() => {this.topMenuItemClick(4)}} className="nav-menu-item">{this.topNavItems[6]}</div>*/}
                                            <Dropdown id="nav-profile" className={classnames("nav-dropdown-icon flex-container", {'display-none': this.user.user_type == 4 || this.user.user_type == 6})}>
                                                <Dropdown.Toggle className="font-15">
                                                    Help
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={18}><span id="feedback-form">Feedback</span></MenuItem>
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={19}>About</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>

                                        <li>
                                            <div className="global-create-button">
                                                <button id="openPopup" onClick={this.openCreateServiceOrderPopup} className="btn btn-sm btn-success"><FaPlus style={{fontSize: '15px'}}/>&nbsp;&nbsp;Create Service Order</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
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
                                            <div className="usersettings-container">
                                                <div>
                                                    {/*<FaUser className="nav-icon-right"/>&nbsp;&nbsp;&nbsp;*/}
                                                    <div className="user_pic">
                                                        <img src={localStorage.user_pic ? localStorage.user_pic : this.user.picture} width="100%"/>&nbsp;&nbsp;&nbsp;
                                                    </div>
                                                </div>
                                                <div className="user_name">
                                                    {this.user.name}
                                                </div>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="super-colors">
                                            <MenuItem eventKey="1">Help</MenuItem>
                                            {(this.user.user_type !== 4) ? (
                                                    <MenuItem onSelect={this.onRightMenuSelect} eventKey={98} className={classnames({'display-none': this.user.user_type == 4 || this.user.user_type == 6})}>Settings</MenuItem>
                                                ) : null}
                                            <MenuItem divider />
                                            <MenuItem onSelect={this.onRightMenuSelect} eventKey={99}>Logout</MenuItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-xl-12 padding-0 main-content">
                        <div className="main-container body-wrapper margin-top">
                            <div className="">
                                <BreadCrumbs
                                    excludes={['Home']}
                                    routes={this.props.routes}
                                    params={this.props.params}
                                    setDocumentTitle={true}
                                />
                            </div>
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <CreateServiceOrderPopup ref="globalPopup" closePopup={this.closePopup} show={this.showPopup}/>
            </div>
        )
    }
}

export default Skeleton;
