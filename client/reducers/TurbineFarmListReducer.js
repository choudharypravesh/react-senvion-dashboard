import AppConstants from '../constants/AppConstants'
import {Map} from 'immutable'


const initialState = Map({
    turbinesList : [],
    FarmList : []
})

const TurbineFarmList = (state = initialState,action) => {
    switch(action.type){
        case AppConstants.RECEIVED_TURBINES_LIST:
            return state.set('turbinesList',action.payload.turbinesList)
        case AppConstants.RECEIVED_FARMS_LIST_ALL:
            return state.set('farmsList',action.payload.farms)
        default:
            return state
    }
}

export default TurbineFarmList