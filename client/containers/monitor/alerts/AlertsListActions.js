import AppConstants from '../../../constants/AppConstants';
import {GetData, downloadCSV} from '../../../Utils/utils';
import _ from 'underscore';

export const getAlertsListData = (data, params) => dispatch =>{
    if(!(params && params.saveToCsv)){
        dispatch({
            type: AppConstants.LOADING_ALERTS_LIST_DATA,
            payload: {}
        })
    }
    GetData.getAlertsListData(data).then(res => {
        if(params && params.saveToCsv){
            let csvData = Object.assign({}, res.tableData)
            let finalData = _.map(csvData, (item)=> {
                if(item.status == 0) {
                    item.status = 'New'
                } else if(item.status == 1) {
                    item.status = 'Ignored'
                } else if(item.status == 2) {
                    item.status = 'Closed'
                } else {
                    item.status = 'In Progress'
                }
                return item;
            })
            let header = ["id","alerts","priority","farm_name","turbine_id","model","date_identified", "status"]
            finalData.header = header;
            finalData.filename = 'Alerts'
            downloadCSV(finalData, "table")
        }else{
            dispatch({
                type: AppConstants.LOADED_ALERTS_LIST_DATA,
                payload: {res}
            });
        }
    })
}
export const getAlertTypes = () => dispatch => {
     GetData.getAlertTypes().then(alerts => {
        dispatch({
            type: AppConstants.LOADED_ALERTS_TYPES_LIST,
            payload: {alerts}
        })
    })
}
export const getAllTurbines = () => dispatch => {
    GetData.getAllTurbines().then(res =>{
        dispatch({
            type: AppConstants.LOADED_ALL_TURBINES,
            payload: {turbines: res.turbines}
        })
    })
};
export const setInitialDate = (initialDate, data) => dispatch => {
    dispatch({
         type: AppConstants.SET_INITIAL_DATE,
         payload: initialDate
    })
    //data.start_date = initialDate;
    //dispatch(getAlertsListData(data))
}
export const setFinalDate = (finalDate, data) => dispatch => {
    dispatch({
        type: AppConstants.SET_FINAL_DATE,
        payload: finalDate
    })
    //data.end_date = finalDate;
    //dispatch(getAlertsListData(data))
}
export const changeAlert = (alert, data) => dispatch => {
    dispatch({
        type: AppConstants.CHANGE_ALERT_TYPE,
        payload: alert
    })
    data.alerts = alert ? alert.value : '';
    dispatch(getAlertsListData(data))
}
export const changePriority = (priority, data) => dispatch =>{
    dispatch({
        type: AppConstants.CHANGE_PRIORITY,
        payload: priority
    })
    data.priority = priority ? priority.value : '';
    dispatch(getAlertsListData(data))
}
export const changeStatus = (status, data) => dispatch =>{
    dispatch({
        type: AppConstants.CHANGE_STATUS,
        payload: status
    })
    data.status = status ? status.value : '';
    dispatch(getAlertsListData(data))
}
export const changeTurbine = (turbine, data) => dispatch =>{
    dispatch({
        type: AppConstants.CHANGE_TURBINE,
        payload: turbine
    })
    data.turbines = turbine ? turbine.value : '';
    dispatch(getAlertsListData(data))
}
export const clearAllFiltersAndGetData = (data) => dispatch =>{
    dispatch({
        type: AppConstants.CLEAR_ALL_DATA,
        payload: {}
    })
    dispatch(getAlertsListData(data))
}
export const setPageIndex = data =>({
    type: AppConstants.SET_PAGE_INDEX,
    payload: {currentPageIndex: data.currentPageIndex, initialPage: data.initialPage}
})
export const updateStatus = data => dispatch =>{
    GetData.updateAlertsStatus(data).then(res => {
        dispatch({
                    type: AppConstants.LOADED_ALERTS_LIST_DATA,
                    payload: {res}
                })
    })
}