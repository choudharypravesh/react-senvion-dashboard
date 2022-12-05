import AppConstants from '../../constants/AppConstants';
import {GetData} from '../../Utils/utils'
import _ from "underscore";


export const errorMessage = boolean => ({
    type: AppConstants.SET_ERROR_MESSAGE_CSO,
    payload: {boolean}
})

export const selectTurbine = turbine =>({
    type:AppConstants.SELECT_TURBINE_CSO,
    payload:{turbine}
})