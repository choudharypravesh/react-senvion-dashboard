import AppConstants from '../../../constants/AppConstants';
import {GetData} from '../../../Utils/utils'
import _ from 'underscore'
export const getPowerForecastData = data => dispatch => {
    dispatch({
        type: AppConstants.LOADING_POWER_FORECAST_DATA,
        payload: {}
    })
    GetData.getPowerForecastData(data).then(res => {
        let noDataPower = false;
        let noDataWindSpeed = false;
        let noDataWindDirection = false;
        let noDataDownTime = false;
        if (_.isEmpty(res)){
            noDataPower=true
            noDataWindSpeed=true
            noDataWindDirection=true
            noDataDownTime=true
            dispatch({
                type: AppConstants.LOADED_POWER_FORECAST_DATA_NO_DATA,
                payload: {noDataPower,noDataWindSpeed,noDataWindDirection,noDataDownTime}
            })
        }
        else{
            if (_.isEmpty(res.forecast2y) && _.isEmpty(res.forecast1y)){
                noDataPower=true
            }
            if (_.isEmpty(res.windspeed1y) && _.isEmpty(res.windspeed2y)){
                noDataWindSpeed=true
            }
            if (_.isEmpty(res.winddirection1y)){
                noDataWindDirection=true
            }
            if (_.isEmpty(res.scheduledtime1y)){
                noDataDownTime=true
            }
            dispatch({
                type: AppConstants.LOADED_POWER_FORECAST_DATA,
                payload: {res,noDataPower,noDataWindSpeed,noDataWindDirection,noDataDownTime}
            })
        }
    })
}

export const selectTurbine = turbine =>({
    type:AppConstants.SELECT_TURBINE,
    payload:{turbine}
})

export const setForecastTurbineAndCallNextActions = (nextActionCreators, data) => dispatch => {
    dispatch(selectTurbine(data.turbines));
    nextActionCreators.map(action => {
        dispatch(action(data))
    })
}