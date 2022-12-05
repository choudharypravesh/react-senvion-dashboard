import AppConstants from '../../../constants/AppConstants';
import {GetData} from '../../../Utils/utils'
import _ from 'underscore'
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
    console.log(nextActionCreators.indexOf(getTurbinesList));
    if (nextActionCreators && nextActionCreators[0].name=="getTurbinesList"){
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
        if (nextActionCreators && nextActionCreators[0].name=="getTurbinesList"){
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
        if (nextActionCreators && nextActionCreators[0] && (nextActionCreators[0].name=="getTurbineAvailabilityData" ||nextActionCreators[0].name=="getTurbineScadaDetails")) {
            data.turbines=turbines[0].value;
        }else if(nextActionCreators && nextActionCreators[0] && nextActionCreators[0].name=="getAlertsByComponentTurbine"){
            data.turbine_id=turbines[0].value;
        }
        else {
            let turbine2 = turbines[1] && turbines[1].value? ","+turbines[1].value: ""
            data && data.turbines ? data.turbines = turbines[0].value + "" + turbine2 : "";
        }
        nextActionCreators.map(actionCreator => {dispatch(actionCreator(data,turbines[0]))});
    })

}

export const getVariablesAndCallIntraFarmsData = (data) => dispatch => {
    GetData.getVariables().then(variables => {
        dispatch(setVariable1(variables[0]));
        dispatch(setVariable2(variables[5]));
        dispatch(setVariable3(variables[2]));
        dispatch(setVariable4(variables[3]));
        dispatch(setVariable5(variables[1]));
        dispatch(setVariable6(variables[4]));
        dispatch(setVariableList(variables));
        data.variable=variables[0].label;
        dispatch(getIntraFarmData(data,1))
        data.variable=variables[5].label;
        dispatch(getIntraFarmData(data,2))
        data.variable=variables[2].label;
        dispatch(getIntraFarmData(data,3))
        data.variable=variables[3].label;
        dispatch(getIntraFarmData(data,4))

    })
}


export const setVariableList = variables =>({
    type :AppConstants.SET_VARIABLES_LIST,
    payload:{variables}
})

export const setVariable1 = variable => ({
    type : AppConstants.SET_VARIABLE_1,
    payload : {variable}
})

export const setVariable2 = variable => ({
    type : AppConstants.SET_VARIABLE_2,
    payload : {variable}
})
export const setVariable3 = variable => ({
    type : AppConstants.SET_VARIABLE_3,
    payload : {variable}
})
export const setVariable4 = variable => ({
    type : AppConstants.SET_VARIABLE_4,
    payload : {variable}
})
export const setVariable5 = variable => ({
    type : AppConstants.SET_VARIABLE_5,
    payload : {variable}
})
export const setVariable6 = variable => ({
    type : AppConstants.SET_VARIABLE_6,
    payload : {variable}
})


export const changeVariablesAndGetIntraFarmsData = (data,index) => dispatch => {
    switch (index){
        case 1: dispatch(setVariable1(data.variable));
            break;
        case 2: dispatch(setVariable2(data.variable));
            break;
        case 3: dispatch(setVariable3(data.variable));
            break;
        case 4: dispatch(setVariable4(data.variable));
            break;
    }
    data.variable=data.variable.label;
    dispatch(getIntraFarmData(data,index));
}
export const changeVariablesAndGetPowerCurveScadaData = (data,index) => dispatch => {

    switch (index){
        case 1: dispatch(setVariable1(data.variable1));
            dispatch(getTurbineScadaDetailsChart1(data));
            break;
        case 2: dispatch(setVariable2(data.variable2));
            dispatch(getTurbineScadaDetailsChart1(data));
            break;
        case 3: dispatch(setVariable3(data.variable3));
            dispatch(getTurbineScadaDetailsChart1(data));
            break;
        case 4: dispatch(setVariable4(data.variable4));
            dispatch(getTurbineScadaDetailsChart2(data));
            break;
        case 5: dispatch(setVariable5(data.variable5));
            dispatch(getTurbineScadaDetailsChart2(data));
            break;
        case 6: dispatch(setVariable6(data.variable6));
            dispatch(getTurbineScadaDetailsChart2(data));
            break;
    }
}

export const setPlot1 = (plot,noDataPlot1) => ({
    type : AppConstants.SET_PLOT_1,
    payload : {plot,loaderStatus:false,noDataPlot1}
})

export const setPlot2 = (plot,noDataPlot2) => ({
    type : AppConstants.SET_PLOT_2,
    payload : {plot,loaderStatus:false,noDataPlot2}
})

export const setPlot3 = (plot,noDataPlot3) => ({
    type : AppConstants.SET_PLOT_3,
    payload : {plot,loaderStatus:false,noDataPlot3}
})

export const setPlot4 = (plot,noDataPlot4) => ({
    type : AppConstants.SET_PLOT_4,
    payload : {plot,loaderStatus:false,noDataPlot4}
})

export const getIntraFarmDataForAllCharts =(data) => dispatch => {
    let variables = data.variable
    data.variable=variables.selectedVariable1.label;
    dispatch(getIntraFarmData(data,1))
    data.variable=variables.selectedVariable2.label;
    dispatch(getIntraFarmData(data,2))
    data.variable=variables.selectedVariable3.label;
    dispatch(getIntraFarmData(data,3))
    data.variable=variables.selectedVariable4.label;
    dispatch(getIntraFarmData(data,4))
}

export const getIntraFarmData = (data,index) => dispatch => {
    if (index == 1) {
        dispatch({
            type:AppConstants.LOADING_INTRA_CHART1,
            payload:{loaderStatus:true}
        });
    }
    else if (index == 2) {
        dispatch({
            type:AppConstants.LOADING_INTRA_CHART2,
            payload:{loaderStatus:true}
        });
    }
    else if (index==3){
        dispatch({
            type:AppConstants.LOADING_INTRA_CHART3,
            payload:{loaderStatus:true}
        });
    }
    else {
        dispatch({
            type:AppConstants.LOADING_INTRA_CHART4,
            payload:{loaderStatus:true}
        });
    }
    GetData.getTurbineScadaData(data).then(plot => {
        if (index == 1) {
            let noDataPlot1=false
            if(_.isEmpty(plot.y1) && (_.isEmpty(plot.y2))){
                noDataPlot1 = true
            }
            dispatch(setPlot1(plot,noDataPlot1));
        }
        else if (index == 2) {
            let noDataPlot2=false
            if(_.isEmpty(plot.y1) && (_.isEmpty(plot.y2))){
                noDataPlot2 = true
            }
            dispatch(setPlot2(plot,noDataPlot2));
        }
        else if (index==3){
            let noDataPlot3=false
            if(_.isEmpty(plot.y1) && (_.isEmpty(plot.y2))){
                noDataPlot3 = true
            }
            dispatch(setPlot3(plot,noDataPlot3));
        }
        else {
            let noDataPlot4=false
            if(_.isEmpty(plot.y1) && (_.isEmpty(plot.y2))){
                noDataPlot4 = true
            }
            dispatch(setPlot4(plot,noDataPlot4));
        }
    })
}
export const getTurbineScadaDetailsChart1 = data => dispatch => {
    dispatch({
        type: AppConstants.LOADING_TURBINE_SCADA_DATA,
        payload: {}
    });
    GetData.getScadaDetails(data).then(res =>{
        let noData=false;
        if (_.isEmpty(res.y1) || _.isEmpty(res.y2) || _.isEmpty(res.y3) )
        {
            noData=true;
        }
        dispatch({
            type: AppConstants.LOADED_TURBINE_SCADA_DATA,
            payload: {res,noData}
        });

    })
}
export const getTurbineScadaDetailsChart2 = data => dispatch => {
    let chart2Data = Object.assign({}, data, {variable1: data.variable4, variable2: data.variable5, variable3: data.variable6})
    dispatch({
        type: AppConstants.LOADING_TURBINE_CHART2_SCADA_DATA,
        payload: {}
    })
    GetData.getScadaDetails(chart2Data).then(res =>{
        let noData=false;
        if (_.isEmpty(res.y1) || _.isEmpty(res.y2) || _.isEmpty(res.y3) )
        {
            noData=true;
        }
        dispatch({
            type: AppConstants.LOADED_TURBINE_CHART2_SCADA_DATA,
            payload:{res,noData}
        })
    })
}
export const getVariablesAndTurbineScadaDetails = (data, powerCurveMode) => dispatch => {
    var variables;
    if(powerCurveMode == 2){
        variables = [{value:"568",label:"Wind_speed_2"},{value:"1372",label:"Active_power"}, {value:"1295",label:"Status_power_curve"}, {value:"614",label:"Outdoor_temp_"}]
    }else{
        variables = [{value:"774",label:"Rotor_speed"},{value:"90",label:"Torque"},{value:"614",label:"Outdoor_temp_"},{value:"568",label:"Wind_speed_2"} ]
    }
    dispatch(setVariable1(variables[0]));
    dispatch(setVariable2(variables[1]));
    dispatch(setVariable3(variables[2]));
    dispatch(setVariable4(variables[0]));
    dispatch(setVariable5(variables[1]));
    dispatch(setVariable6(variables[3]));
    data.variable1 = variables[0]
    data.variable2 = variables[1]
    data.variable3 = variables[2]
    data.variable4 = variables[0]
    data.variable5 = variables[1]
    data.variable6 = variables[3]
    dispatch(getTurbineScadaDetails(data))
}
export const getTurbineScadaDetails = data => dispatch =>{
    dispatch(getTurbineScadaDetailsChart1(data));
    dispatch(getTurbineScadaDetailsChart2(data));
}
export const changeMode = mode => ({
    type: AppConstants.CHANGE_CHART_MODE,
    payload: {mode: mode}
})

export const changeModeAndGetScadaTurbineData = (mode, data) => dispatch => {
    dispatch(changeMode(mode));
    var variables;
    if(mode == 2){
        variables = [{value:"568",label:"Wind_speed_2"},{value:"1372",label:"Active_power"}, {value:"1295",label:"Status_power_curve"}, {value:"614",label:"Outdoor_temp_"}]
    }else{
        variables = [{value:"774",label:"Rotor_speed"},{value:"90",label:"Torque"},{value:"614",label:"Outdoor_temp_"},{value:"568",label:"Wind_speed_2"} ]
    }
    dispatch(setVariable1(variables[0]));
    dispatch(setVariable2(variables[1]));
    dispatch(setVariable3(variables[2]));
    dispatch(setVariable4(variables[0]));
    dispatch(setVariable5(variables[1]));
    dispatch(setVariable6(variables[3]));
    data.variable1 = variables[0]
    data.variable2 = variables[1]
    data.variable3 = variables[2]
    data.variable4 = variables[0]
    data.variable5 = variables[1]
    data.variable6 = variables[3]
    dispatch(getTurbineScadaDetailsChart1(data));
    dispatch(getTurbineScadaDetailsChart2(data));
}

export const setHistoryOfAlerts = historyofAlerts => ({
    type:AppConstants.SET_HISTORY_OF_ALERTS_FOR_TURBINES,
    payload:{historyofAlerts}
})
export const getAlertHistoryForTurbine = (data) => dispatch => {
    data
    GetData.getAlertHistoryForTurbine(data).then(historyofAlerts =>{
        dispatch(setHistoryOfAlerts(historyofAlerts));
    })
}
export const setBarPlot1 = (plot,AlertsByCompNoData) => ({
    type:AppConstants.SET_ALERTS_BY_COMPONENT,
    payload:{plot,AlertsByCompNoData,loaderStatus:false}
})
export const getAlertsByComponentTurbine = (data,turbine) => dispatch => {
    dispatch({
        type:AppConstants.LOADING_TURBINE_ALERTS_COMP,
        payload:{loaderStatus:true}
    })
    dispatch({
        type:AppConstants.LOADING_TURBINE_ALERTS_MONTH,
        payload:{loaderStatus:true}
    })
    dispatch({
        type:AppConstants.LOADING_TURBINE_ALERTS_HISTORY,
        payload:{loaderStatus:true}
    })
    GetData.getAlertsByComponentTurbine(data.turbine_id).then(plot => {
        let AlertsByCompNoData = false
        if (_.isEmpty(plot.y1)){
            AlertsByCompNoData = true
        }
        dispatch(setBarPlot1(plot,AlertsByCompNoData));
        dispatch(getTotalAlertsByMonth(data));
    })
}
export const setBarPlot2 = (plot,AlertsByMonthNoData) => ({
    type:AppConstants.SET_ALERTS_BY_MONTH,
    payload:{plot,AlertsByMonthNoData,loaderStatus:false}
})

export const getTotalAlertsByMonth = (data) => dispatch => {
    GetData.getTotalAlertsByMonth(data.turbine_id).then(plot => {
        let AlertsByMonthNoData = false
        if (_.isEmpty(plot.y1)){
            AlertsByMonthNoData = true
        }
        dispatch(setBarPlot2(plot,AlertsByMonthNoData));
        dispatch(getAlertHistoryForTurbine(data));

    })
}

export const setTurbineAvailabilityData = (plot,noData) =>({
    type:AppConstants.SET_TURBINE_AVAILABILITY_DATA,
    payload:{plot,loaderStatus:false,noData}
})
export const getTurbineAvailabilityData = (data) => dispatch => {
    dispatch({
        type:AppConstants.LOADING_TURBINE_AVAILABILITY,
        payload:{loaderStatus:true}
    })
    GetData.getTurbineAvailabilityData(data).then(plot => {
        let noData = false
        if(_.isEmpty(plot.y1)){
            noData=true
        }
        dispatch(setTurbineAvailabilityData(plot,noData));
        dispatch(getTurbinePbaData(data));
    } )
}
export const setTurbinePbaData = (plot,noData) =>({
    type:AppConstants.SET_TURBINE_PBA_DATA,
    payload:{plot,loaderStatus:false,noData}
})
export const getTurbinePbaData = (data) => dispatch => {
    dispatch({
        type:AppConstants.LOADING_TURBINE_AVAILABILITY_PBA,
        payload:{loaderStatus:true}
    })
    data.level="turbine"
    data.ranking= false
    data.variable="pba"
    GetData.getTurbinePbaData(data).then(plot => {
        let noData = false;
        if (_.isEmpty(plot.y1)){
            noData = true;
        }
        dispatch(setTurbinePbaData(plot,noData));

    } )
}