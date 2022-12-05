import { combineReducers } from 'redux'
import moment from 'moment';
import {Map} from 'immutable'
import AppConstants from '../../../constants/AppConstants';

const forecastData = (state = Map({
                            selectedDate: 1,
                            initialDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                            finalDate: moment().format('YYYY-MM-DD'),
                            selectedTurbine:"90903",
                            loaderStatus : true
                        }), action) => {
    switch(action.type){
        case AppConstants.SET_DATES:
            return state.set('initialDate', action.payload.initialDate)
                    .set('finalDate', action.payload.finalDate)
                    .set('selectedDate', action.payload.selectedDate)
        case AppConstants.SELECT_TAB:
            return state.set('selectedTab', action.payload.id)
        case AppConstants.SELECT_COUNTRY:
            return state.set('selectedCountry', action.payload.countryId)
        case AppConstants.RECEIVED_COUNTRIES_LIST:
            return state.set('countriesList', action.payload.countriesList)
                    .set('selectedCountry', action.payload.countriesList[0].value);
        case AppConstants.SELECT_FARM:
            return state.set('selectedFarm', action.payload.farm)
        case AppConstants.RECEIVED_FARMS_LIST:
            let farmList = action.payload.farmsList;
            return state.set('farmsList', action.payload.farmsList)
                    .set('selectedFarm', farmList ? farmList[0].value : "")
        case AppConstants.SELECT_TURBINE:
            return state.set('selectedTurbine', action.payload.turbine)
        case AppConstants.RECEIVED_TURBINE_LIST:
            let turbinesList = action.payload.TurbineList;
            return state.set('turbineList', turbinesList)
                    .set('selectedTurbine', turbinesList.length > 0 ? turbinesList[0].value : "")
                    .set('selectedTurbine2', turbinesList.length > 1 ? turbinesList[1].value : "")
        case AppConstants.LOADED_POWER_FORECAST_DATA:
            return state.set('Xaxis', action.payload.Xaxis)
                    .set('forecast1y', action.payload.res.forecast1y)
                    .set('forecast2y', action.payload.res.forecast2y)
                    .set('windspeed1y', action.payload.res.windspeed1y)
                    .set('windspeed2y', action.payload.res.windspeed2y)
                    .set('winddirection1y', action.payload.res.winddirection1y)
                    .set('scheduledtime1y', action.payload.res.scheduledtime1y)
                    .set('noDataPower', action.payload.noDataPower)
                    .set('noDataWindSpeed', action.payload.noDataWindSpeed)
                    .set('noDataWindDirection', action.payload.noDataWindDirection)
                    .set('noDataDownTime', action.payload.noDataDownTime)
                    .set('loaderStatus', false);
        case AppConstants.LOADED_POWER_FORECAST_DATA_NO_DATA:
            return state.set('noDataPower', action.payload.noDataPower)
                    .set('noDataWindSpeed', action.payload.noDataWindSpeed)
                    .set('noDataWindDirection', action.payload.noDataWindDirection)
                    .set('noDataDownTime', action.payload.noDataDownTime)
                    .set('loaderStatus', false);
        case AppConstants.LOADING_POWER_FORECAST_DATA:
            return state.set('loaderStatus', true);
        default:
            return state;

    }
}
export default forecastData;
