import AppConstants from '../../../constants/AppConstants';
import {GetData} from '../../../Utils/utils'
export const getContractsOverViewData = () => dispatch => {
    dispatch({
        type: AppConstants.LOADING_CONTRACT_OVERVIEW_DATA,
        payload: {}
    })
    GetData.getContractsOverView().then(data => {
        dispatch({
            type: AppConstants.LOADED_CONTRACT_OVERVIEW_DATA,
            payload: {overviewData: data}
        });
    }).catch(e => {console.error(e);})
}
export const getSelectedContractData = (cno) => dispatch => {
    dispatch({
        type: AppConstants.LOADING_CONTRACT_FIELDS_DATA,
        payload: {}
    })
    GetData.getSelectedContractData(cno).then(res => {
        dispatch({
            type: AppConstants.LOADED_CONTRACT_FIELDS_DATA,
            payload: {selectedContractData: res.data}
        })
    })
}
export const setSelectedContractId = id => dispatch => {
    dispatch({
        type: AppConstants.SET_CONTRACT,
        payload: {selectedContractId: id}
    })
}
export const changeValue = changeObj => ({
    type: AppConstants.CHANGE_VALUE,
    payload: changeObj
})
export const setCurrentlyShowing = tab => dispatch => {
    dispatch({
        type: AppConstants.SET_CURRENTLY_SHOWING,
        payload: {show: tab}
    })
}
export const setSelectedWindPark = park => dispatch => {
    dispatch({
        type: AppConstants.SET_WIND_PARK,
        payload: {windPark: park}
    })
}
export const setMode = mode => dispatch =>{
    dispatch({
        type: AppConstants.SET_MODE,
        payload: {mode: mode}
    })
}
export const setValues = (key, value, container) =>  ({
    type: AppConstants.SET_VALUE,
    payload: {key: key, value: value, container: container}
});

export const setContractData = (row, data) => ({
    type: AppConstants.SET_CONTRACT_DATA,
    payload: {row: row, data: data}
})

export const setTurbineDetailsData = (row, data) => ({
    type: AppConstants.SET_TURBINE_DETAILS_DATA,
    payload: {row: row, data: data}
})
export const setRibbonSuccess = (boolean) => ({
    type: AppConstants.SET_RIBBON_SUCCESS,
    payload: {boolean}
})
export const changeType = changeObj =>({
    type: AppConstants.CHANGE_TYPE,
    payload: changeObj
})
export const getDropDownsData = () =>dispatch =>{
    GetData.getContractDropDownData().then(res =>{
        dispatch({
            type: AppConstants.LOADED_DROPDOWN_VALUES,
            payload: res
        })
    })
}
export const postTurbineDetails = (details, mode) => dispatch => {
    GetData.postTurbineDetails(details, mode).then(res =>{
        dispatch({
                type: AppConstants.UPDATED_CONTRACT,
                payload: {status: true}
            })
    });
}

