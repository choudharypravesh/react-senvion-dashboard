import {GetData} from '../../../Utils/utils'
import AppConstants from '../../../constants/AppConstants'
/*--------------ALERTS OVERVIEW--------------*/

export const recievedAlertsOverviewData = data => ({
    type: AppConstants.RECEIVED_ALERTS_OVERVIEW_DATA,
    payload: {data}
})

export const getAlertsOverviewData = (data) => dispatch => {
    dispatch({
        type:AppConstants.LOADING_ALERTS_OVERVIEW,
        payload:{loaderStatus:true}
    })
    GetData.getAlertsOverviewData(data).then(res => {
        dispatch(recievedAlertsOverviewData(res))
    })
}


export const recievedAlertsOverviewSummary = data => ({
    type: AppConstants.RECEIVED_ALERTS_SUMMARY_DATA,
    payload: {data}
})

export const getAlertsOverviewSummary = () => dispatch => {
    dispatch({
        type:AppConstants.LOADING_ALERTS_OVERVIEW_SUMMARY,
        payload:{loaderStatus:true}
    })
    GetData.getAlertsOverviewSummary().then(res => {
        dispatch(recievedAlertsOverviewSummary(res))
    })
}

export const setDate = date => ({
    type: AppConstants.SET_DATES,
    payload: {initialDate: date.initialDate, finalDate: date.finalDate, selectedDate: date.selectedDate}
})