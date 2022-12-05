import AppConstants from '../../../constants/AppConstants';
import {GetData} from '../../../Utils/utils'
import _ from "underscore";
// farms is sent through the action which gets the countries or farms
/*-------------overview tab----------------*/
export const getPowerAndWind = (data, farms) => dispatch => {
    GetData.getPowerAndWind(data, farms).then(res => {
        dispatch({
             type: AppConstants.RECEIVED_POWER_WIND,
             payload: {power: res.power, wind: res.windSpeed}
         });

    })
}
export const getAvailability = (data, farms) => dispatch => {
    GetData.getAvailabilityCount(data, farms).then(res => {
        dispatch({
            type: AppConstants.RECEIVED_AVAIL_COUNT,
            payload: {availTime: res.availTime, availGen: res.availGen, lpf: res.lpf}
        })
    })
}
export const getAlertsCount = (data, farms) => dispatch => {
    GetData.getAlertsCount(data, farms).then(res => {
        dispatch({
            type: AppConstants.RECEIVED_ALERTS_COUNT,
            payload: {numberOfAlerts: res.numberOfAlerts}
        })
    })
}
/* -----------------------------------------------------------*/
/*------------------Availability tab--------------------------*/
export const getFarmAvailabilityData = (data, farms) => dispatch => {
    dispatch({
        type: AppConstants.LOADING_AVAILABILITY,
        payload: {loaderStatus: true}
    })
    GetData.getFarmAvailabilityData(data,farms).then(res => {
        let noData=false
        if (_.isEmpty(res.availabilityY)){
            noData=true;
        }
        dispatch({
            type: AppConstants.LOADED_AVAILABILITY,
            payload: {loaderStatus: false, availabilityX: res.availabilityX, availabilityY: res.availabilityY,availNoData:noData}
        })
    })
}
export const getFarmPbaData = (data, farms) => dispatch => {
    GetData.getFarmPbaData(data, farms).then(res => {
        let noData=false
        if (_.isEmpty(res.farmPbaY)){
            noData=true;
        }
        dispatch({
            type: AppConstants.LOADED_PBA,
            payload: {loaderStatus: false, farmPbaX: res.farmPbaX, farmPbaY: res.farmPbaY,pbaNoData:noData}
        })
    })
}
export const getWindDataOfFarm = (data, farms) => dispatch => {
    dispatch({
        type: AppConstants.LOADING_WIND_DATA,
        payload: {loaderStatus: true}
    })
    GetData.getWindDataOfFarm(data, farms).then(res => {
        let noDataSpeed=false;
        let noDataDirection=false;
        if(_.isEmpty(res.wsY)){
            noDataSpeed = true;
        }
        if(_.isEmpty(res.wdY)){
            noDataDirection=true;
        }
        dispatch({
            type: AppConstants.LOADED_WIND_DATA,
            payload: {loaderStatus: false, wsX: res.wsX, wsY: res.wsY, wdX: res.wdX, wdY: res.wdY,noDataDirection,noDataSpeed}
        })
    })
}

export const getVariablesForFarmsHeatMap = (data) => dispatch => {
    GetData.getVariablesForFarmsHeatMap().then(res => {
        dispatch({
            type: AppConstants.RECEIVED_VARIABLES,
            payload: {variablesList: res.variablesList}
        })
        if(data){
            let chartData1 = Object.assign({}, data, {chart: 1, variable: res.variablesList[0].value})
            dispatch(getTurbineLevelHeatMapData(chartData1))
            let chartData2 = Object.assign({}, data, {chart: 2, variable: res.variablesList[1].value})
            dispatch(getTurbineLevelHeatMapData(chartData2))
        }
    })
}
export const getTurbineLevelHeatMapData = (data, farm) => dispatch => {
    dispatch({
       type: AppConstants.LOADING_TURBINE_HEAT_MAP_DATA,
       payload: {loaderStatus: true, chart: data.chart}
   })
   let chart = data.chart;
    let noData= ""
   GetData.getTurbineLevelHeatMapData(data, farm).then(res => {
       if(_.isEmpty(res.z)){
           noData=true
       }
       dispatch({
           type: AppConstants.RECEIVED_TURBINE_HEAT_MAP_DATA,
           payload: {loaderStatus: false,x: res.x, y: res.y, z: res.z, chart: chart,noData:noData}
       })
    })
}
export const setTurbines = (list) => dispatch => {
    dispatch({
        type: AppConstants.SET_TURBINE_FARM_COMPARE,
        payload: {list: list}
    })
}
export const setVariable = (variable, chart) => dispatch => {
    dispatch({
        type: AppConstants.SET_VARIABLE,
        payload: {variable, chart}
    })
}
export const setVariableAndGetData = (variable, data) => dispatch => {
    dispatch(setVariable(variable, data.chart))
    data.variable = variable;
    dispatch(getTurbineLevelHeatMapData(data))
}

export const getCompareChartData = (data) => dispatch => {
    dispatch({
        type: AppConstants.LOADING_COMPARE_CHART_DATA,
        payload: {}
    })
    GetData.getCompareChartData(data).then(res => {
        dispatch({
            type: AppConstants.GET_COMPARE_CHART_DATA,
            payload: {res: res.allChartData, addMarkerValueInCompare: res.addMarkerValueInCompare}
        })
    }).catch(err=> {
        dispatch({
            type: AppConstants.GET_COMPARE_CHART_DATA,
            payload: {}
        })
    })
}

export const getFarmsAndTurbinesList = () => dispatch => {
    GetData.getFarmsAndTurbinesList().then(res => {
        dispatch({
            type: AppConstants.GET_FARMS_AND_TURBINES_LIST,
            payload: {turbinesList: res}
        })
    })
}
export const setFarmTurbineCompareNoData = () => ({
    type: AppConstants.SET_TURBINE_FARM_COMPARE_NO_DATA,
    payload: {}
})
