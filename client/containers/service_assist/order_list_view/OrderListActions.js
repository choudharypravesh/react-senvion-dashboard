import AppConstants from '../../../constants/AppConstants';
import {GetData} from '../../../Utils/utils'
import _ from "underscore";


export const getOrdersForTechnician = () => dispatch => {
    GetData.getOrdersForTechnician().then(res => {
        dispatch({
            type: AppConstants.GET_ORDERS,
            payload: {res}
        });

    })
}

export const updateOrdersForTechnician = (data) => dispatch => {
    GetData.updateOrdersForTechnician(data).then(res => {
        dispatch({
            type: AppConstants.GET_ORDERS,
            payload: {res}
        });

    })
}
