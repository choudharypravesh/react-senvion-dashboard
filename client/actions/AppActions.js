import AppConstants from '../constants/AppConstants';
import axios from 'axios';
import _ from 'underscore'
import {GetData} from '../Utils/utils'
import {getPowerForecastData} from  '../containers/power_forecast/power/PowerForecastActions'
import {setFarmCallNextAction} from '../containers/power_forecast/weather/WeatherActions'
export class AppActions {
    constructor(dispatcher){
        this.dispatcher = dispatcher;
    }

    //Fleet

    getAlertsData(filter){
        console.log("executing dispatcher");
        this.dispatcher.dispatch({
            type: AppConstants.GET_ALERTS_DATA,
            filter,
        })
    }


    /*-------------------CONTACT ACTIONS----------------*/
    updateContractForm(name, value) {
        return dispatch => dispatch({
            type: AppConstants.FORM_UPDATE_VALUE,
            name, value
        });
    }

    resetContractForm() {
        return dispatch => dispatch({
            type: AppConstants.FORM_RESET
        });
    }
    /*--------------------------------------------------*/


}

export const toggleFullLife = (data) => ({
    type: data.type,
    payload : data.full
})


//----------------------GET FARM AND TURBINE LIST-----------------------//

export const getCountryFarmsList = (firstFunction,nextActionCreators,data)=> dispatch => {
    GetData.getCountryFarmsList().then(response =>{
        dispatch({
           type:AppConstants.RECEIVED_FARMS_LIST_ALL,
            payload:{farms:response}
        });
        if(firstFunction && nextActionCreators){
            let farmlist = response[4].value.split(",");
            data.wind_farm = farmlist[1];
            dispatch(firstFunction(response[4].value,nextActionCreators,data));
        }
    })
}

export const getFarmsAndTurbinesList = () => dispatch => {
    GetData.getFarmsAndTurbinesList().then(res => {
        dispatch({
            type: AppConstants.RECEIVED_TURBINES_LIST,
            payload: {turbinesList: res}
        })
    })
}




/* -----------flux actions -----------*/
export const selectTab = id => ({
    type: AppConstants.SELECT_TAB,
    payload: {id}
})

export const onChangeText = e => ({
    type: AppConstants.CHANGE_TEXT,
    name: e.target.name,
    payload: e.target.value
})

export const selectCountry = countryId =>({
    type: AppConstants.SELECT_COUNTRY,
    payload: {countryId}
})
export const receivedCountries = countriesList => ({
    type: AppConstants.RECEIVED_COUNTRIES_LIST,
    payload: {countriesList}
})
export const changeCountryAndGetFarms = (country, nextActionCreators, data) => (dispatch) => {
    dispatch(selectCountry(country))
    dispatch(getFarmsListOfCountry(country, nextActionCreators, data))
}
export const getCountriesList = (nextActionCreators, data) => dispatch => {
    GetData.getCountriesList().then(countriesList => {
        dispatch(receivedCountries(countriesList));
        dispatch(getFarmsListOfCountry(countriesList[0].value, nextActionCreators, data));
    })
}


export const selectFarm = farm =>({
    type: AppConstants.SELECT_FARM,
    payload: {farm}
})

export const selectFarmAndCallNextAction = (farm, nextActionCreators, data) => dispatch => {
    dispatch(selectFarm(farm))
    if (nextActionCreators && nextActionCreators.indexOf(getTurbinesList)>-1){
        nextActionCreators.shift();
        dispatch(getTurbinesList(nextActionCreators,data,farm))
    }else {
        nextActionCreators.map(actionCreator => {
            dispatch(actionCreator(data))
        })
    }
}

export const receivedFarms = farms =>({
    type: AppConstants.RECEIVED_FARMS_LIST,
    payload: {farmsList: farms}
})

export const receivedTurbines = turbines =>({
    type: AppConstants.RECEIVED_TURBINE_LIST,
    payload: {TurbineList: turbines}
})

export const getFarmsListOfCountry = (country, nextActionCreators, data) => (dispatch) => {
    GetData.getFarmsListOfCountry(country).then(farms => {
        dispatch(receivedFarms(farms));
        if (nextActionCreators && nextActionCreators.indexOf(getTurbinesList)>-1){
            nextActionCreators.shift();
            dispatch(getTurbinesList(nextActionCreators,data,farms[0].value))
        }else if(nextActionCreators) {
            nextActionCreators.map(actionCreator => {
                dispatch(actionCreator(data, farms))
            })
        }
    })
}

export const setDate = date => ({
    type: AppConstants.SET_DATES,
    payload: {initialDate: date.initialDate, finalDate: date.finalDate, selectedDate: date.selectedDate}
})
export const selectTurbine = turbine =>({
    type:AppConstants.SELECT_TURBINE,
    payload:{turbine}
})


export const selectTurbine2 = turbine =>({
    type:AppConstants.SELECT_TURBINE2,
    payload:{turbine}
})

export const setTurbineAndCallNextActions = (turbine,nextActionCreators,data,tab) => dispatch => {
    if ("Turbine1" in turbine){
        dispatch(selectTurbine(turbine.Turbine1.value))
        nextActionCreators.map(actionCreator => {
            dispatch(actionCreator(data))})
    }else {
        dispatch(selectTurbine2(turbine.Turbine2.value));
        nextActionCreators.map(actionCreator => {
        dispatch(actionCreator(data))})
    }

};

export const setDateAndCallNextActions = (nextActionCreators,data, selectedDate) => dispatch => {
    dispatch(setDate({initialDate: data.start_date, finalDate: data.end_date, selectedDate: selectedDate}));
    nextActionCreators.map(actionCreator => {dispatch(actionCreator(data))});

}

export const getTurbinesList = (nextActionCreators,data,farm) => dispatch => {
    GetData.getTurbinesList(farm).then(turbines => {
        dispatch(receivedTurbines(turbines));
        data.turbines=turbines[0].value;
        nextActionCreators.map(actionCreator => {dispatch(actionCreator(data,turbines[0]))});
    })

}


/*----------------------SETTINGS-------------------*/

export const receivedUserDetails = userDetails => ({
    type: AppConstants.RECEIVED_USER_DETAILS,
    payload: {userDetails}
})

export const getUserDetails = (data) => dispatch => {
    GetData.getUserDetails(data).then(userDetails => {
        console.log("getUserDetails");
        console.log(userDetails);
        dispatch(receivedUserDetails(userDetails));
    })
}

export const validatePassword = data => ({
    type: AppConstants.VALIDATE_PASSWORD,
    payload: {data}
})

export const resetStatesEditProfile = () => ({
    type: AppConstants.RESET_STATES_EDIT_PROFILE
})

export const validatingPassword = (data) => dispatch => {
    console.log(data);
    let res = GetData.validatePassword(data)/*.then(res => {
        console.log(res);
        dispatch(validatePassword(res));
    })*/
    dispatch(validatePassword(res));
}


export const recievedCountries = countries => ({
    type: AppConstants.GET_COUNTRIES,
    payload: {countries}
})

export const getCountries = () => dispatch => {
    GetData.getCountries().then(countries => {
        dispatch(recievedCountries(countries));
    })
}

export const changedPassword = data => ({
    type: AppConstants.CHANGE_PASSWORD,
    payload: {data}
})

export const changePassword = (data) => dispatch => {
    GetData.changePassword(data).then(res => {
        dispatch(changedPassword(res));
    })
}

export const changeErrorCount = count => ({
    type: AppConstants.ERROR_COUNT,
    payload: {count}
})

export const changedSettingsData = data => ({
    type: AppConstants.SUBMIT_SETTINGS_FORM,
    payload: {data}
})

export const changeSettingsData = (data) => dispatch => {
    GetData.submitSettingsData(data).then(res => {
        dispatch(changedSettingsData(res));
    })
}

export const setRibbonSuccess = (boolean) => ({
    type: AppConstants.SET_RIBBON_SUCCESS,
    payload: {boolean}
})




/*--------------CONTRACT FORM----------------*/
export const getParcData = (data, variable) => {

}


export const getTypeData = (data, variable) => {

}
/*-------------------------------------------*/
export const setSelectedContractData = details => ({
    type : AppConstants.SET_CONTRACT_DETAILS,
    payload: {details}
})


export const getSelectedContractData = cno => dispatch =>{
    GetData.getSelectedContractData(cno).then(details => {
        dispatch(setSelectedContractData(details));
        dispatch(getContractYearDetails(details.windparc,cno))
    });

}

export const setContractYearDetails = details =>({
    type:AppConstants.SET_CONTRACT_YEAR_DETAILS,
    payload:{details}
})
export const getContractYearDetails = (wpac,cno) => dispatch => {
    GetData.getContractYearData(wpac).then(details => {
        dispatch(setContractYearDetails(details));
        dispatch(getTurbineContractDetails(cno,wpac));
    })
}

export const setTurbineContractDetails = details =>({
    type:AppConstants.SET_TURBINE_CONTRACT_DETAILS,
    payload:{details}
})

export const getTurbineContractDetails = (cno,wpac) => dispatch => {
    GetData.getTurbineContractDetails(cno,wpac).then(details => {
        dispatch(setTurbineContractDetails(details.data));
        });
}

export const postContractDetails = (details1,details2, mode)  => dispatch => {
    GetData.postContractDetails(details1,details2, mode);
}


export const addRowInSubContract = () => ({
    type: AppConstants.ADD_ROW,
    payload: {}
})

//---------------------------------------//
/*CREATE SERVICE ORDER*/

export const setSearchInputChange = data => ({
    type: AppConstants.SEARCH_INPUT_CHANGED,
    payload: {data}
})

export const selectFarmServiceOrder = farm =>({
    type: AppConstants.SELECT_FARM_SERVICE_ORDER,
    payload: {farm}
})

export const selectFarmSOAndCallNextAction = (farm, nextActionCreators) => dispatch => {
    dispatch(selectFarmServiceOrder(farm))
    if (nextActionCreators && nextActionCreators.indexOf(getTurbinesListCsr)>-1){
        nextActionCreators.shift();
        dispatch(getTurbinesListCsr(farm))
    }else {
        nextActionCreators.map(actionCreator => {
            dispatch(actionCreator(data))
        })
    }
}

export const receivedTurbinesCsr = turbines =>({
    type: AppConstants.RECEIVED_TURBINE_LIST_CSR,
    payload: {TurbineList: turbines}
})

export const getTurbinesListCsr = (farm) => dispatch => {
    GetData.getTurbinesList(farm).then(turbines => {
        dispatch(receivedTurbinesCsr(turbines));
        data.turbines=turbines[0].value;
        nextActionCreators.map(actionCreator => {dispatch(actionCreator(data,turbines[0]))});
    })

}



export const showHidePopup = (bool,turbine,status, turbineDisable) => ({
    type: AppConstants.SHOW_HIDE_POPUP,
    payload: {
        bool, turbine , status, turbineDisable
    }
})

export const getSearchInputChange = () => dispatch => {
    GetData.searchInputChanged().then(data => {
        dispatch(setSearchInputChange(data));
    })
}

export const statusCodeSearchInput = data => ({
    type: AppConstants.STATUSCODE_SEARCH_INPUT_CHANGED,
    payload: {data}
})

export const statusCodeSearchInputChanged = () => dispatch => {
    GetData.statusCodeSearchInputChanged().then(data => {
        dispatch(statusCodeSearchInput(data));
    })
}

export const selectStatusCode = statuscode =>({
    type: AppConstants.SELECT_STATUS_CODE,
    payload: {statuscode}
})

export const selectRecommendedObservations = recObservations =>({
    type: AppConstants.SELECT_RECOMMENDED_OBSERVATIONS,
    payload: {recObservations}
})

export const onChangeTextEditProfile = e => ({
    type: AppConstants.CHANGE_TEXT_EDIT_PROFILE,
    name: e.target.name,
    payload: e.target.value
})



export const emptyFormFields = () =>({
    type: AppConstants.EMPTY_FORM_FIELDS
})
