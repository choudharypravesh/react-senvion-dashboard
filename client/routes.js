import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { hashHistory, Router } from 'react-router';
import ReactCookie from 'react-cookie';

import App from './containers/App';
import ChatPage from './containers/session/ChatPage';
import LoginPage from './containers/login/LoginPage';


//DOORMAN
import Skeleton from './containers/Skeleton';
import OrdersListView from './containers/service_assist/order_list_view/OrderListView';
import OrdersMapView from './containers/technician/OrdersMapView';
import OrdersCalenderView from './containers/technician/OrdersCalenderView'
import GenerateStatuscodeSolutions from './containers/admin/GenerateStatuscodeSolutions';
import ApprovalRequests from './containers/admin/ApprovalRequests';
import ApproveStatusCodes from './containers/superadmin/ApproveStatusCodes';
import Instructions from './containers/admin/Instructions';
import Report from './containers/admin/Reports';
import Anomalies from './containers/technician/analyze/anomalies/Anomalies';
import AnomaliesComparasions from './containers/technician/analyze/anomalies/AnomaliesComparasions';
import Power from './containers/technician/analyze/power/Power';
import TimeMgmtView from './containers/technician/time/TimeManagement.js';
import Powerforecast from './containers/power_forecast/power/PowerForcast';
import ForecastWeather from './containers/power_forecast/weather/WeatherOverview'
import Weather from './containers/power_forecast/weather/Weather'


//PREDICTIVE ANALYTICS
import MonitorWrapper from './containers/monitor/MonitorWrapper'

import SkeletonPredictiveAnalytics from './containers/Skeleton'
import AlertsPredictiveAnalytics from './containers/monitor/alerts/Alerts'
import FarmPredictiveAnalytics from './containers/analyze/farm/Farms'
import DatalabsPredictiveAnalytics from './containers/analyze/datalabs/Datalabs'
import MonitorPredictiveAnalytics from './containers/monitor/Monitor'


import AlertsDetails from './containers/monitor/alerts/AlertsDetails';


import AlertsDatalabs from './containers/dashboard/Dashboard'

import FarmHeatMap from './containers/analyze/farm/HeatMapView'
import FarmTurbineView from './containers/analyze/farm/Turbines'

import TurbineDetails from './containers/analyze/turbine/TurbineDetails';

import Maps from './containers/map/Maps'
import Dashboard from './containers/dashboard/Dashboard';
import Fleet from './containers/analyze/Fleet/Fleet';

import SideNavigation from './containers/settings/SideNavigation'
import EditProfile from './containers/settings/profile/EditProfile'

import Overview from './containers/monitor/overview/Overview'


/*CONTRACT FORM*/
import Contracts from './containers/admin/contracts/Contracts';
import CreateContract from './containers/admin/contracts/CreateContract';
import ContractForm from './containers/admin/contracts/ContractForm'


/*HELP*/
import About from './containers/help/about/About'



let userCookie = ReactCookie.load('user');
let selectedAlert = localStorage.selectedAlert ? JSON.parse(localStorage.selectedAlert) : "90983";

function requireAuth(nextState, replace) {
    if (!userCookie) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

function loggedInRoute(nextState, replace) {
    if (userCookie) {
        replace({
            pathname: '/dashboard',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}


export default (
    <Router history={hashHistory}>

            <Route name="Home" path="/" component={App}>
                <IndexRoute component={LoginPage} onEnter={loggedInRoute}/>
                <Route name="Login" path="login" component={LoginPage}  onEnter={loggedInRoute}/>
                <Route name="Troubleshoot" path="/service_assist/order/troubleshoot" component={ChatPage} onEnter={requireAuth}/>
            </Route>

            <Route name="Home" path="/welcome" component={Skeleton} onEnter={requireAuth}>
                <IndexRoute component={OrdersListView}/>
                <Route name="Anomalies" path="/technician/analyze/anomalies" containers={Anomalies}/>
                <Route name="Power" path="/technician/power" containers={Power}/>
                <Route name="Chart" path="/chart" containers={AnomaliesComparasions}/>
            </Route>


            <Route name="Home" path="/pa" component={SkeletonPredictiveAnalytics} onEnter={requireAuth}>
                <IndexRoute component={SkeletonPredictiveAnalytics}/>
                <Route name="Monitor" component={MonitorWrapper}>

                    {/*MONITOR*/}
                    <Route name="Monitor > Alerts" path="/monitor/alerts" component={AlertsPredictiveAnalytics}/>
                    <Route name="Monitor > Alerts Overview" path="/monitor/overview" component={Overview}/>
                    <Route name="Monitor > Alerts" path="/monitor/alerts/details" component={AlertsDetails}/>
                    <Route name="Monitor > SCADA Monitor" path="/monitor/scada-monitor" component={MonitorPredictiveAnalytics}/>

                    {/*ANALYZE*/}
                    <Route name="Analyze > Farm" path="/analyze/farm" component={FarmPredictiveAnalytics}/>
                    <Route name="Analyze > Datalabs" path="/analyze/datalabs" component={DatalabsPredictiveAnalytics}/>
                    <Route name="Analyze > Farm > Farm Heat Map" path="/analyze/farm/heatmap" component={FarmHeatMap}/>
                    <Route name="Analyze > Farm > Farm Turbines" path="/analyze/farm/turbines" component={FarmTurbineView}/>
                    <Route name="Analyze > Fleet" path="/analyze/Fleet" component={Fleet}/>
                    <Route name="Analyze > Datalabs" path="/analyze/datalabs" component={AlertsDatalabs}/>
                    <Route name="Analyze > Turbine" path="/analyze/turbine" component={TurbineDetails}/>


                    <Route name="Settings" component={SideNavigation}>
                        <Route name="Settings > Edit Profile" path="/settings" component={EditProfile}/>
                    </Route>

                    <Route name="&nbsp;" path="/dashboard" component={Dashboard}/>
                    <Route name="Service Assist > Orders List" path="/service-assist/orders-list-view" component={OrdersListView}/>
                    <Route name="Service Assist > Orders Map View" path="/service-assist/service-assist/map-view" component={OrdersMapView}/>
                    <Route name="Service Assist > Orders Time View" path="/service-assist/time-view" component={TimeMgmtView}/>
                    <Route name="Service Assist > Orders Calender View" path="/calender-view" component={OrdersCalenderView}/>
                    <Route name="Maps" path="/maps" component={Maps}/>
                    <Route name="Service Assist > Create Instructions" path="/admin/instructions/create" component={GenerateStatuscodeSolutions}/>
                    <Route name="Service Assist > Instructions" path="/admin/instructions" component={Instructions}/>
                    <Route name="Service Assist > Approve Requests" path="/admin/approve-requests" component={ApprovalRequests}/>
                    <Route name="Service Assist > Approve Status Codes" path="/admin/approve-status-codes" component={ApproveStatusCodes}/>
                    <Route name="Service Assist > Reports" path="/admin/reports" component={Report}/>

                    {/*CONTRACT*/}
                    <Route name="Admin > Contracts" path="/admin/contracts" component={Contracts}/>
                    <Route name="Admin > Create Contract" component={CreateContract}>
                        <Route name="Admin > Contracts > Create Contract" path="/admin/contracts/create" component={ContractForm}/>
                    </Route>
                    {/*--------*/}


                    {/*HELP*/}
                    <Route name="Help > About" path="/help/about" component={About}/>
                    {/*----*/}


                    <Route name="Forecast > Weather" path="/forecast/weather" component={Weather}/>
                    <Route name="Forecast > Power" path="/forecast/power" component={Powerforecast}/>
                </Route>
            </Route>

    </Router>
)
