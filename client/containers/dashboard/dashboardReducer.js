import AppConstants from '../../constants/AppConstants';
import ReactCookie from 'react-cookie';
import {Map} from 'immutable'

let initialState = Map({agX: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    agY1: [20, 14, 25, 16, 18, 22, 19, 15, 12, 16, 14, 17],
    agY2: [19, 14, 22, 14, 16, 19, 15, 14, 10, 12, 12, 16],
    ttY1: ["Achairn", "Achany", "A'Chruach", "Achtrup", "Ahlen", "Aino Cho", "Airaines", "Beseritz"],
    ttY2: ["Bestepe", "Bickenbach", "Bierbergen", "Bilsthorpe", "Birkenzell", "Bisaccia", "Blantyre Muir", "Blindow"],
    wtY1: ["90987-", "90765-", "96475-", "91637-", "91745-", "91117-", "98877-", "95564-"],
    user: ReactCookie.load('user'),
    bestFarmsArray: [],
    worstFarmsArray: [],
    bestTurbinesArray: [],
    worstTurbinesArray: [],
    totalAlerts: 0,
    openAlerts: 0,
    alertsByTimeLoader: true,
    alertsByTimeNoData: false,
    alertsByTimeX: [],
    alertsByTimeY: [],
    availabilityLoader: true,
    availabilityNoData: false,
    availabilityX: [],
    availabilityY1: [],
    availabilityY2: []})

const dashboardData = (state = initialState ,action)=> {
    switch(action.type){
        case AppConstants.DASHBOARD_LOADED:{
            switch(action.category){
                case AppConstants.DASHBOARD_ALERTSTIME_DATA:
                    return state.set('alertsByTimeLoader',action.payload.loaderStatus).set('alertsByTimeNoData',action.payload.noData).set('alertsByTimeX',action.payload.x).set('alertsByTimeY',action.payload.y)
                case AppConstants.DASHBOARD_AVAILABILITY_DATA:
                    return state.set('availabilityNoData',action.payload.noData).set('availabilityX',action.payload.x).set('availabilityY1',action.payload.y1)
                case AppConstants.BEST_FARMS_DATA:
                    return state.set('bestFarmsArray',action.payload.bestFarmsArray)
                case AppConstants.BEST_TURBINES_DATA:
                    return state.set('bestTurbinesArray',action.payload.bestTurbinesArray)
                case AppConstants.WORST_FARMS_DATA:
                    return state.set('worstFarmsArray',action.payload.worstFarmsArray)
                case AppConstants.WORST_TURBINES_DATA:
                    return state.set('worstTurbinesArray',action.payload.worstTurbinesArray)
                case AppConstants.ALERT_COUNT_DATA:
                    return state.set('openAlerts',action.payload.openAlerts).set('totalAlerts',action.payload.totalAlerts)
                case AppConstants.DASHBOARD_PBA_DATA:
                    return state.set('availabilityLoader',action.payload.loaderStatus).set('availabilityNoData',action.payload.noData).set('availabilityY2',action.payload.y2)
            }
            break;
        }
        case AppConstants.DASHBOARD_LOADING:{
            switch (action.category){
                case AppConstants.DASHBOARD_ALERTSTIME_DATA:
                    return state.set('alertsByTimeLoader',action.payload.alertsByTimeLoader).set('alertsByTimeNoData',action.payload.noData)
                case AppConstants.DASHBOARD_AVAILABILITY_DATA:
                    return state.set('availabilityLoader',action.payload.loaderStatus).set('availabilityNoData',action.payload.noData)
            }
            break;
        }
        default:
            return state;
    }
}

export  default dashboardData;