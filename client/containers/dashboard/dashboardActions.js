import AppConstants from '../../constants/AppConstants';
import {GetData} from '../../Utils/utils'


export const getAlertCount = () => dispatch => {
    GetData.getAlertCount().then(res => {
        let data = res.data;
        dispatch({
            type: AppConstants.DASHBOARD_LOADED,
            category: AppConstants.ALERT_COUNT_DATA,
            payload: {
                openAlerts: data.openAlerts,
                totalAlerts: data.openAlerts + data.ignoredAlerts + data.closedAlerts
            }
        })
    }).catch(function(err) {
        console.error(err);
    });
}

export const getBestFarms = () => dispatch =>  {
    let self = this;
    GetData.getBestFarms().then(function(response) {
            console.log(response.data.data);
            dispatch({
                type: AppConstants.DASHBOARD_LOADED,
                category: AppConstants.BEST_FARMS_DATA,
                payload:{bestFarmsArray: response.data.data}
            })
        }).catch(function(err) {
        console.error(err);
    });
}

export const getBestTurbines = () => dispatch => {
    let self = this;
    GetData.getBestTurbines()
        .then(function(response) {
            dispatch({
                type: AppConstants.DASHBOARD_LOADED,
                category: AppConstants.BEST_TURBINES_DATA,
                payload:{bestTurbinesArray: response.data.data}
            })
        }).catch(function(err) {
        console.error(err);
    });
}
export const getWorstFarms = () => dispatch =>  {
    let self = this;
    GetData.getWorstFarms()
        .then(function(response) {
            dispatch({
                type: AppConstants.DASHBOARD_LOADED,
                category: AppConstants.WORST_FARMS_DATA,
                payload:{worstFarmsArray: response.data.data}
            })
        }).catch(function(err) {
        console.error(err);
    });
}
export const getWorstTurbine = () => dispatch => {
    var self = this;
    GetData.getWorstTurbine()
        .then(function(response) {
            dispatch({
                type: AppConstants.DASHBOARD_LOADED,
                category: AppConstants.WORST_TURBINES_DATA,
                payload:{worstTurbinesArray: response.data.data}
            })
        }).catch(function(err) {
        console.error(err);
    });
}
export const getDashboardAvailabilityData = () => dispatch => {
    dispatch({
        type: AppConstants.DASHBOARD_LOADING,
        category: AppConstants.DASHBOARD_AVAILABILITY_DATA,
        payload:{loaderStatus: true,
        noData: false}
    })
    GetData.getDashboardAvailabilityData().then(response => {

        dispatch({
            type: AppConstants.DASHBOARD_LOADED,
            category: AppConstants.DASHBOARD_AVAILABILITY_DATA,
            payload:{loaderStatus: false,
            noData: false,
            x: response.x,
            y1: response.y1,
            }
        });
    })
}

export const getAlertsDataByTime = () => dispatch => {
    dispatch({
        type: AppConstants.DASHBOARD_LOADING,
        category: AppConstants.DASHBOARD_ALERTSTIME_DATA,
        payload:{loaderStatus: true,
        noData: false
        }
    })
    GetData.getAlertsDataByTime().then(res => {
        dispatch({
            type: AppConstants.DASHBOARD_LOADED,
            category: AppConstants.DASHBOARD_ALERTSTIME_DATA,
            payload:{loaderStatus: false,
            noData: false,
            x: res.data.x,
            y: res.data.y
            }
        })
    }).catch(function(err) {
        console.error(err);
    });
}

export const getDashboardPbaData = () => dispatch => {
    let data = {ranking: false,
        level:"fleet",
        variable:"pba"
    };
    dispatch({
        type: AppConstants.DASHBOARD_LOADING,
        category: AppConstants.DASHBOARD_AVAILABILITY_DATA,
        payload:{loaderStatus: true,
            noData: false}
    })
    GetData.getDashboardPbaData(data).then(response => {
            dispatch({
                type: AppConstants.DASHBOARD_LOADED,
                category: AppConstants.DASHBOARD_PBA_DATA,
                payload:{loaderStatus: false,
                    noData: false,
                    y2: response,
                }
            });
    })
}