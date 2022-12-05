import { combineReducers } from 'redux'
import moment from 'moment';
import {Map} from 'immutable'
import AppConstants from '../../../constants/AppConstants'
import _ from 'underscore'
import createFilterOptions from 'react-select-fast-filter-options'

let initialstate = Map({
    selectedTab: 1,
    selectedFarm:"",
    selectedDate: 1,
    initialDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    finalDate: moment().format('YYYY-MM-DD'),
    countriesList: [],
    farmsList: [],
    power: 0,
    windSpeed: 0,
    availTime: 0,
    availGen: 0,
    lpf: 0,
    numberOfAlerts: 0,
    heatMapLoader:true,
    heatMap2Loader:true,
    farmForDropDown:"",
    farmsAndTurbinesList: [],
    allChartData: {},
    farmToggle:true,
    selectedFarm1:"Airaines",
    selectedTurbine:[92535,92539],
    turbinesForDropdown:["France,Airaines,92535","France,Airaines,92539"],
    compareChartLoader: true,
    compareChartNoData: false,
    farmFullLife:0,
    addMarkerValueInCompare: false,
})

const farmData = (state = initialstate, action) => {
    switch(action.type){
        case AppConstants.SET_DATES:
            return state.set('initialDate',action.payload.initialDate).set('finalDate',action.payload.finalDate).set('selectedDate',action.payload.selectedDate)
        case AppConstants.SELECT_TAB:
            if(action.payload.id == 2 && state.get('selectedTurbine').length == 0){
                return state.set('selectedTab',action.payload.id).set('selectedTurbine',[92535,92539])
                        .set('turbinesForDropdown', ["France,Airaines,92535","France,Airaines,92539"]);
            }
            return state.set('selectedTab',action.payload.id)
        case AppConstants.SELECT_COUNTRY:
            return state.set('selectedCountry',action.payload.countryId)
        case AppConstants.RECEIVED_COUNTRIES_LIST:
            return state.set('countriesList',action.payload.countriesList).set('selectedCountry',action.payload.countriesList[0].value)
        case AppConstants.SELECT_FARM:
            let farmlist = action.payload.farm.split(",")
            return state.set('farmForDropDown',action.payload.farm)
                .set('selectedFarm',farmlist[1])
        case AppConstants.RECEIVED_FARMS_LIST:
            let farmList = action.payload.farmsList;
            console.log(farmList);
            return state.set('farmsList',action.payload.farmsList).set('selectedFarm',farmList ? farmList[0].value : "").set('farmsListFilterOptions', createFilterOptions({options: action.payload.farmsList}))
        case AppConstants.RECEIVED_POWER_WIND:
            return state.set('power',action.payload.power).set('windSpeed',action.payload.wind)
        case AppConstants.RECEIVED_AVAIL_COUNT:
            return state.set('availGen', action.payload.availGen).set('availTime',action.payload.availTime).set('lpf',action.payload.lpf)
        case AppConstants.RECEIVED_ALERTS_COUNT:
            return state.set('numberOfAlerts',action.payload.numberOfAlerts)
        case AppConstants.LOADING_AVAILABILITY:
            return state.set('availLoaderStatus',action.payload.loaderStatus)
        case AppConstants.LOADED_AVAILABILITY:
            return state.set('availLoaderStatus',action.payload.loaderStatus).set('availabilityX',action.payload.availabilityX).set('availabilityY',action.payload.availabilityY).set('availNoData',action.payload.availNoData)
        case AppConstants.LOADED_PBA:
            return state.set('availLoaderStatus',action.payload.loaderStatus).set('farmPbaX',action.payload.farmPbaX).set('farmPbaY',action.payload.farmPbaY).set('pbaNoData',action.payload.pbaNoData)
        case AppConstants.LOADING_WIND_DATA:
            return state.set('windDataLoader',action.payload.loaderStatus)
        case AppConstants.LOADED_WIND_DATA:
            return state.set('windDataLoader',action.payload.loaderStatus).set('wsX',action.payload.wsX).set('wsY',action.payload.wsY).set('wdX',action.payload.wdX).set('wdY',action.payload.wdY).set('noDataSpeed',action.payload.noDataSpeed).set('noDataDirection',action.payload.noDataDirection)
        case AppConstants.SET_VARIABLE:
            if(action.payload.chart == 1){
                return state.set('selectedVariable1',action.payload.variable)
            }else{
                return state.set('selectedVariable2',action.payload.variable)
            }
        case AppConstants.RECEIVED_VARIABLES:
            return state.set('variablesList',action.payload.variablesList).set('selectedVariable1',action.payload.variablesList[0].value).set('selectedVariable2',action.payload.variablesList[1].value)
        case AppConstants.LOADING_TURBINE_HEAT_MAP_DATA:
            if(action.payload.chart == 1){
                return state.set('heatMapLoader',action.payload.loaderStatus)
            }else{
                return state.set('heatMap2Loader',action.payload.loaderStatus)
            }
        case AppConstants.RECEIVED_TURBINE_HEAT_MAP_DATA:
            if(action.payload.chart == 1){
                return state.set('heatMapLoader',action.payload.loaderStatus).set('heatMapX',action.payload.x).set('heatMapY',action.payload.y).set('heatMapZ', action.payload.z).set('heatMapNoData',action.payload.noData)
            }else{
                return state.set('heatMap2Loader',action.payload.loaderStatus).set('heatMap2X',action.payload.x).set('heatMap2Y',action.payload.y).set('heatMap2Z', action.payload.z).set('heatMap2NoData',action.payload.noData)
            }
        case AppConstants.GET_FARMS_AND_TURBINES_LIST:
            return state.set('farmsAndTurbinesList',action.payload.turbinesList).set('farmsAndTurbinesListFilterOptions', createFilterOptions({options: action.payload.turbinesList}))
        case AppConstants.SET_TURBINE_FARM_COMPARE:
            let turbinelist=_.map(action.payload.list,(item)=>{return item.value.split(",")[2]});
            return state.set('turbinesForDropdown',action.payload.list)
                .set('selectedFarm1',(action.payload.list.length>0)?action.payload.list[action.payload.list.length-1].value.split(",")[1]:"")
                .set('selectedCountry',(action.payload.list.length>0)?action.payload.list[0].value.split(",")[0]:"")
                .set('selectedTurbine',turbinelist);
        case AppConstants.LOADING_COMPARE_CHART_DATA:
            return state.set('compareChartLoader', true).set('compareChartNoData', false);
        case AppConstants.GET_COMPARE_CHART_DATA:
            console.log(action.payload);
            return state.set('allChartData',action.payload.res)
                    .set('compareChartLoader', false)
                    .set('compareChartNoData', _.isEmpty(action.payload.res))
                    .set('addMarkerValueInCompare', action.payload.addMarkerValueInCompare);
        case AppConstants.SET_FARM_TOGGLE:
            return state.set('farmToggle',action.payload)
        case AppConstants.SET_TURBINE_FARM_COMPARE_NO_DATA:
            return state.set('compareChartNoData', true);
        case AppConstants.FARM_FULL_LIFE:
            return state.set('farmFullLife',action.payload)
        default:
            return state;
    }
}

export default farmData;