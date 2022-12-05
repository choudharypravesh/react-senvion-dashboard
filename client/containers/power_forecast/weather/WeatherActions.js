import AppConstants from '../../../constants/AppConstants';
import {GetData} from '../../../Utils/utils'
import _ from 'underscore'


export const getCountries = () => (dispatch) => {
    GetData.getCountriesList().then(countries => {
        dispatch({
            type: AppConstants.GET_COUNTRY_WEATHER,
            payload: {countries: countries}
        });
    })
}

export const getFarms = (country_id) => (dispatch) => {
    GetData.getFarmsListOfCountry(country_id).then(farms => {

        dispatch({
            type: AppConstants.GET_FARM_WEATHER,
            payload: {farms: farms}
        });
    })
}

export const setCountry = country => ({
    type: AppConstants.SET_COUNTRY_WEATHER,
    payload: {country: country}
})

export const dataLoading = () => ({
    type: AppConstants.DATA_LOADING
})

export const setFarm = farm =>({
    type:AppConstants.SET_FARM_WEATHER,
    payload:{farm: farm}
})

export const setFarmCallNextAction = (farm,nextActionCreators,data) => dispatch  =>{
    
    dispatch(setFarm(farm))
    let initialfarm = farm.split(',')[1]
    data.data1.selectedFarm = initialfarm
    data.data2.selectedFarm = initialfarm
    data.data3.selectedFarm = initialfarm
    dispatch(nextActionCreators[0](data.data1))
    dispatch(nextActionCreators[0](data.data3))
    dispatch(nextActionCreators[1](data.data2))

}

export const setDuration1 = duration =>({
    type:AppConstants.SET_DURATION_1,
    payload:{duration: duration}
})


export const setDuration2 = duration =>({
    type:AppConstants.SET_DURATION_2,
    payload:{duration: duration}
})

export const selectChart = option => ({
    type:AppConstants.SELECT_CHART,
    payload:{option: option}
})

export const setDate = data => ({
    type:AppConstants.SET_DATE,
    payload:{data: data}
})


export const getShortForecast = () => (dispatch) => {
    GetData.getShortForecast().then(res => {
        dispatch({
            type: AppConstants.GET_SHORT_FORECAST_WEATHER,
            payload: {data: res}
        });
    })
}

export const getLongForecast = () => (dispatch) => {
    GetData.getLongForecast().then(res => {
        dispatch({
            type: AppConstants.GET_LONG_FORECAST_WEATHER,
            payload: {data: res}
        });
    })
}


export const getWeatherOverviewChartData = (params) => (dispatch) => {
    GetData.getWeatherOverviewChartData(params).then(res => {
        dispatch({
            type: AppConstants.GET_OVERVIEW_CHART_DATA_WEATHER,
            payload: {data: res}
        });
    })
}

export const getFarmSummary = (params) => (dispatch) => {
    GetData.getFarmSummary(params).then(res => {

        dispatch({
            type: AppConstants.GET_FARM_SUMMARY_WEATHER,
            payload: {summary: res}
        });
    })
}

export const getWeatherForecastData = (params) => (dispatch) => {
    let loading = params.limit ? AppConstants.LOADING_WEATHER_FORECAST_DATA_FOR_CARDS : AppConstants.LOADING_WEATHER_FORECAST_DATA;
    let loaded = params.limit ? AppConstants.LOADED_WEATHER_FORECAST_DATA_FOR_CARDS : AppConstants.GET_WEATHER_FORECAST_DATA;
    dispatch({
        type: loading,
        payload: {}
    })
    GetData.getWeatherForecastData(params).then(res => {
        dispatch({
            type: loaded,
            payload: {data: res}
        });
    })
}
export const setForeCastDate = (date) => ({
    type: AppConstants.SET_FORECAST_DATE,
    payload: date
})
export const setForecastOffset = (offset, forecastType) =>({
    type: forecastType == 'daily' ? AppConstants.SET_DAILY_FORECAST_OFFSET : AppConstants.SET_HOURLY_FORECAST_OFFSET,
    payload: offset
})