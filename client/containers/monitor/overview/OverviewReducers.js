import moment from 'moment';
import ReactCookie from 'react-cookie';
import AppConstants from '../../../constants/AppConstants';

import {Map} from 'immutable';
const overviewReducer = (state = Map({
    user: ReactCookie.load('user'),
    tableData: [],
    tableHeight: window.innerHeight < 700 ? 400: 700,
    initialDate: moment().subtract(360, 'days').format('YYYY-MM-DD'),
    finalDate: moment().format('YYYY-MM-DD'),
    summary: {},
    totalAlerts: "--",
    totalTurbines: "--",
    totalFarms: "--",
    lpf: "--",
    selectedDate: 5,
}), action) => {
    switch(action.type){
        case AppConstants.RECEIVED_ALERTS_OVERVIEW_DATA:
            return state.set('tableData', action.payload.data)
                    .set('loaderStatusAlertsOverview', false)
        case AppConstants.RECEIVED_ALERTS_SUMMARY_DATA:
            return state.set('lpf', action.payload.data[1].lpf.toFixed())
                    .set('totalAlerts',action.payload.data[0].total_no_alarms)
                    .set('totalFarms', action.payload.data[0].number_of_farms_affected)
                    .set('totalTurbines',action.payload.data[0].number_of_turbines_affected)
                    .set('loaderStatusAlertsOverviewSummary',false)
        case AppConstants.SET_DATES:
            return state.set('initialDate', action.payload.initialDate)
                    .set('finalDate', action.payload.finalDate)
                    .set('selectedDate',action.payload.selectedDate)
        case AppConstants.LOADING_ALERTS_OVERVIEW:
            return state.set('loaderStatusAlertsOverview', action.payload.loaderStatus)
        case AppConstants.LOADING_ALERTS_OVERVIEW_SUMMARY:
            return state.set('loaderStatusAlertsOverviewSummary', action.payload.loaderStatus)
        default:
            return state;

    }
}
export default overviewReducer;
