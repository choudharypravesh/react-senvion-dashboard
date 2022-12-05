import moment from 'moment'
import AppConstants from '../../../constants/AppConstants'
import {Map} from 'immutable';
const AlertsListData = (state = Map({
    alerts: "",
    priority: "",
    status: "",
    start_date: "",
    end_date: "",
    turbines: "",
    pageNo: 1,
    entriesPerPage: 15,
    farms: "",
    tableData: [],
    alertTypesList: [],
    turbinesList: [],
    initialDate: '',
    finalDate: '',
    priorityList: [{value: 'High', label: 'High'},{value: 'Low', label: 'Low'}],
    statusList: [{value: "", label: 'All'}, {value: 0, label: 'New'}, {value: 1, label: 'Ignored'}, {value: 2, label: 'Closed'}, {value: 3, label: 'In Progress'}],
    selectedAlert: '',
    selectedPriority: '',
    selectedStatus: '',
    selectedTurbine: '',
    tableHeight: window.innerHeight < 700 ? 400 : 750,
    numberOfRows: window.innerHeight < 700 ? 10 : 15,
    currentPageIndex: 1,
    initialPage: 1,
    loadingAlertsList: true
}), action) => {
    switch(action.type){
        case AppConstants.SET_INITIAL_DATE:
            return state.set('initialDate', action.payload)
        case AppConstants.SET_FINAL_DATE:
            return state.set('finalDate', action.payload)
        case AppConstants.LOADING_ALERTS_LIST_DATA:
            return state.set('loadingAlertsList', true);
        case AppConstants.LOADED_ALERTS_LIST_DATA:
            return state.set('loadingAlertsList', false)
                    .set('tableData', action.payload.res.tableData)
                    .set('resultCount', action.payload.res.resultCount)
        case AppConstants.LOADED_ALERTS_TYPES_LIST:
            return state.set('alertTypesList', action.payload.alerts)
        case AppConstants.LOADED_ALL_TURBINES:
            return state.set('turbinesList', action.payload.turbines)
        case AppConstants.CHANGE_ALERT_TYPE:
            return state.set('selectedAlert', action.payload)
        case AppConstants.CHANGE_PRIORITY:
            return state.set('selectedPriority', action.payload)
        case AppConstants.CHANGE_STATUS:
            return state.set('selectedStatus', action.payload)
        case AppConstants.CHANGE_TURBINE:
            return state.set('selectedTurbine', action.payload)
        case AppConstants.CLEAR_ALL_DATA:
            return state.set('initialDate', '')
                    .set('finalDate', '')
                    .set('selectedAlert', '')
                    .set('selectedPriority', '')
                    .set('selectedStatus', '')
                    .set('selectedTurbine', '')
        case AppConstants.SET_PAGE_INDEX:
            return state.set('initialPage', action.payload.initialPage)
                    .set('currentPageIndex', action.payload.currentPageIndex)
        default: return state;
    }
}
export default AlertsListData;