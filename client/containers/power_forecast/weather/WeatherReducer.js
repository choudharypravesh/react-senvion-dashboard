import { combineReducers } from 'redux'
import moment from 'moment';
import {Map} from 'immutable'
import AppConstants from '../../../constants/AppConstants'

let initialState = Map({
    selectedTab: 1,
    selectedCountry: "Germany",
    selectedFarm:"",
    selectedDate: 1,
    initialDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    finalDate: moment().format('YYYY-MM-DD'),
    chart1Data: [],
    chart2Data: [],
    countriesList: [],
    farmsList: [],
    power: 0,
    windSpeed: 0,
    availTime: 0,
    availGen: 0,
    lpf: 0,
    noData1: false,
    noData2: false,
    numberOfAlerts: 0,
    data: [],
    countryDropdown: [
        {value: 'Canada', label: 'Canada'}
    ],
    farms : [
        { value: 'maida1', label: 'Maida1' },
        { value: 'maida2', label: 'Maida2' }
    ],
    variable : [
        { value: 'Nacelle_temp_2_median', label: 'Nacelle_temp_2_median' },
        { value: 'pressure', label: 'Pressure' }
    ],
    turbine1: 91654,
    loader:true,
    turbine2: 91653,
    selectedChart: 1,
    selectedDuration1: "day",
    selectedDuration2: "night",
    summary: {all:{
        ws: 0,
        tb: 0,
        ot: 0
    },
        day: {
            ws: 0,
            tb: 0,
            ot: 0
        },
        night: {
            ws: 0,
            tb: 0,
            ot: 0
        }
    },
    xaxis: [],
    yaxis: [],
    zaxis1: [],
    zaxis2: [],
    colorScale:'',
    xaxis2: [],
    yaxis2: [],
    colorScale2:'',
    durations: [{value: "daily", label: "All"}, {value: "day", label: "Day time"}, {value: "night", label: "Night time"}],
    weatherForecastData: [],
    weatherForecastDailyData: [],
    loadingForecastData: true,
    loadingCardsForecastData: true,
    hourlyWeatherForecastCardsData: [],
    noForecastData: false,
    dateOfForecast: moment(),
    dailyForecastOffset: 0,
    hourlyForecastOffset: 0,
})

const weatherData = (state = initialState, action) => {
    switch(action.type) {
        case AppConstants.SELECT_TAB:
            if(action.payload.id == 1){
                return state.set('selectedTab', action.payload.id)
            }else{
                return state.set('selectedTab', action.payload.id).set('hourlyWeatherForecastCardsData', [])
                            .set('weatherForecastData', [])
                            .set('noForecastData', false)
                            .set('loadingCardsForecastData', true)
                            .set('hourlyForecastOffset',0)
                            .set('dailyForecastOffset',0);
            }
        case AppConstants.GET_COUNTRY_WEATHER:
            return state.set('countryDropdown', action.payload.countries)
                .set('selectedCountry', 'DE');
        case AppConstants.GET_FARM_WEATHER:
            return state.set('farms', action.payload.farms)
                .set('selectedFarm', action.payload.farms[0].value);
        case AppConstants.SET_COUNTRY_WEATHER:
            return state.set('selectedCountry', action.payload.country)
        case AppConstants.SET_FARM_WEATHER:
            return state.set('selectedFarm', action.payload.farm)
        case AppConstants.GET_SHORT_FORECAST_WEATHER:
            return state.set('selectedFarm', action.payload.farm)
        case AppConstants.GET_LONG_FORECAST_WEATHER:
            return state.set('selectedFarm', action.payload.farm)
        case AppConstants.DATA_LOADING:
            return state.set('loader', true)
        case AppConstants.GET_OVERVIEW_CHART_DATA_WEATHER:
            let data = action.payload.data;
            if(data.zaxis1) {
                if(data.zaxis1.length > 0) {
                    return state.set('xaxis', data.xaxis)
                        .set('yaxis', data.yaxis)
                        .set('colorScale', data.colorScale)
                        .set('title', data.title)
                        .set('zaxis1', data.zaxis1)
                        .set('loader',false)
                        .set('noData1', false)
                } else {
                    return state.set('noData1', true)
                }
            } else if(data.zaxis2) {
                if(data.zaxis2.length > 0) {
                    return state.set('xaxis2', data.xaxis2)
                        .set('yaxis2', data.yaxis2)
                        .set('colorScale2', data.colorScale2)
                        .set('title2', data.title2)
                        .set('zaxis2', data.zaxis2)
                        .set('loader',false)
                        .set('noData2', false)
                }  else {
                    return state.set('noData2', true)
                }
            }
        case AppConstants.GET_FARM_SUMMARY_WEATHER:
            return state.set('summary', action.payload.summary.summary)
        case AppConstants.SET_DURATION_1:
            return state.set('selectedDuration1', action.payload.duration.selectedDuration1)
        case AppConstants.SET_DURATION_2:
            return state.set('selectedDuration2', action.payload.duration.selectedDuration2)
        case AppConstants.SELECT_CHART:
            return state.set('selectedChart', action.payload.option)
        case AppConstants.SET_DATE:
            console.log(action.payload);
            console.log(state.finalDate);
            return state.set('initialDate', action.payload.data.initialDate)
                .set('finalDate', action.payload.data.finalDate)
                .set('selectedDate',action.payload.data.selectedDate)
        case AppConstants.GET_WEATHER_FORECAST_DATA:
            let forecastData = action.payload.data;
            let noDate = false;
            if(forecastData.date.length === 0){
                noDate = true;
            }
            return state.set('weatherForecastData', forecastData).set('loadingForecastData', false).set('noForecastData', noDate)
        case AppConstants.LOADING_WEATHER_FORECAST_DATA_FOR_CARDS:
            return state.set('loadingCardsForecastData', true).set('hourlyWeatherForecastCardsData', []).set('noForecastCardsData', false);
        case AppConstants.LOADED_WEATHER_FORECAST_DATA_FOR_CARDS:
            return state.set('hourlyWeatherForecastCardsData', action.payload.data).set('loadingCardsForecastData', false).set('noForecastCardsData', action.payload.data.length ? false : true);
        case AppConstants.LOADING_WEATHER_FORECAST_DATA:
            return state.set('loadingForecastData', true)
        case AppConstants.SET_FORECAST_DATE:
            return state.set('dateOfForecast', action.payload)
        case AppConstants.SET_HOURLY_FORECAST_OFFSET:
            return state.set('hourlyForecastOffset', action.payload)
        case AppConstants.SET_DAILY_FORECAST_OFFSET:
            return state.set('dailyForecastOffset', action.payload)
        default:
            return state;
    }
}

export default weatherData;