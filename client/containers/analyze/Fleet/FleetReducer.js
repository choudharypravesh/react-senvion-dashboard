import { combineReducers } from 'redux'
import moment from 'moment';
import {Map} from 'immutable'
import AppConstants from '../../../constants/AppConstants'


const initialState = Map({
    selectedTab: 1,
    selectedChart: 8,
    allDataLoader: true,
    allNoData: false,
    hubDataLoader: true,
    hubNoData: false,
    allChartData: {X:[], Y1:[], Y2:[], Y3:[], Y4:[], Y5:[], name:"", name1: "", name2: "", name3: "", name4: "", name5:""},
    hubChartData: {X:[], Y1:[], Y2:[], Y3:[], Y4:[], Y5:[], name:"", name1: "", name2: "", name3: "", name4: "", name5:""},
    initialDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    finalDate: moment().format('YYYY-MM-DD'),
    selectedDate: 1
})

const fleetData = (state = initialState ,action) => {
    switch (action.type){
        case AppConstants.LOADING:
            if(action.category === 9){
                return state.set('allDataLoader',action.payload.loaderStatus).set('allNoData',action.payload.allNoData)
            }else{
                return state.set('hubDataLoader',action.payload.loaderStatus).set('selectedChart',action.payload.chartId).set('hubNoData',action.payload.noData)
            }
        case AppConstants.LOADED:
            if(action.category === 9){
                return state.set('allDataLoader',action.payload.loaderStatus).set('allChartData',action.payload.allChartData).set('allNoData',action.payload.noData)
            }else{
                return state.set('hubDataLoader',action.payload.loaderStatus).set('hubChartData',action.payload.allChartData).set('hubNoData',action.payload.noData)
            }
        case AppConstants.NODATA:
            if(action.category === 9){
                return state.set('allNoData',action.payload.noData).set('allDataLoader',action.payload.loaderStatus)
            }else{
                return state.set('hubNoData',action.payload.noData).set('hubDataLoader',action.payload.loaderStatus)
            }
        case AppConstants.CHANGE_FLEET_TAB:
            return state.set('selectedTab',action.payload.tabId)
        case AppConstants.SET_DATES:
            return state.set('initialDate',action.payload.initialDate).set('finalDate',action.payload.finalDate).set('selectedDate',action.payload.selectedDate)
        case AppConstants.GET_FLEET_DATA:
            return state;
        default:
            return state;
    }
}

export default fleetData;