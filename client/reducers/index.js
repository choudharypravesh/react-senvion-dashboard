import { combineReducers } from "redux"

import Farm from '../containers/analyze/farm/FarmReducers'
import Turbine from '../containers/analyze/turbine/TurbineReducers'
import Forecast from '../containers/power_forecast/power/ForecastReducers';
import Contracts from '../containers/admin/contracts/ContractsReducers';
import EditProfile from '../containers/settings/profile/EditProfileReducers'
import OverviewReducer from '../containers/monitor/overview/OverviewReducers'
import CreateServiceOrderReducer from '../components/CreateServiceOrder/CreateServiceOrderReducer'
import AlertsDetailsData from '../containers/monitor/alerts/AlertsDetailsReducers'
import DashboardData from '../containers/dashboard/dashboardReducer'
import AlertsList from '../containers/monitor/alerts/AlertsListReducer'
import FleetData from '../containers/analyze/Fleet/FleetReducer'
import OrderListData from '../containers/service_assist/order_list_view/OrderListReducer'
import ScadaMonitorData from '../containers/monitor/scada_monitor/ScadaMonitorReducer'
import WeatherData from '../containers/power_forecast/weather/WeatherReducer'
import TurbineFarmList from './TurbineFarmListReducer'

export default combineReducers({
    Farm,
    Turbine,
    Forecast,
    Contracts,
    EditProfile,
    OverviewReducer,
    CreateServiceOrderReducer,
    AlertsList,
    AlertsDetailsData,
    DashboardData,
    FleetData,
    OrderListData,
    ScadaMonitorData,
    WeatherData,
    TurbineFarmList
});
