import AppConstants from '../../../constants/AppConstants';
import {GetData} from '../../../Utils/utils'
import _ from 'underscore'

export const setAlertToStore = (alert) => ({
    type: AppConstants.ALERTS_SET_ALERT,
    payload: Object.assign({}, alert)
});

export const setAlert = alert => dispatch => {
    dispatch(setAlertToStore(alert));
    dispatch(getFarmsList())
}

export const getTurbinesOfSameFarms = (turbine, selectedTab, data) => dispatch => {
   return GetData.getSameFarmTurbines(turbine).then(res =>{
        dispatch({
            type: selectedTab == 1 ? AppConstants.ALERTS_LOADED_SCADA_TURBINES_OF_SAME_FARM :AppConstants.ALERTS_LOADED_TURBINES_OF_SAME_FARM,
            payload: {turbinesList: res.turbinesList, turbine1: turbine}
        })
        let turbine1 = turbine;
        let turbine2 = res.turbinesList[1] && res.turbinesList[1].value && res.turbinesList[1].value !== turbine1? res.turbinesList[1].value:res.turbinesList[0].value;
        data.turbines = [turbine1,turbine2].join(',');
        if(selectedTab == 1){
            dispatch(getAnomalyVariable(data));
        }else{
            dispatch(getVariables(data, 'alerts'));
        }
    })
}
export const setTurbineAndCallNextActions = (turbine,nextActionCreators,data,tab) => dispatch => {
    if ("Turbine1" in turbine){
        dispatch(selectTurbine(turbine.Turbine1.value))

        nextActionCreators.map(actionCreator => {
            dispatch(actionCreator(data))})
    }else {
        dispatch(selectTurbine2(turbine.Turbine2.value));
        if(tab==2){
            let turbines = data.turbines;
            let turbinelist= turbines.split(",");
            turbinelist[1]=turbine.Turbine2.value;
            turbines=turbinelist.join(",");
            data.turbines=turbines;
            data.turbines=turbines;
        }
        else{
            data.turbine_id=turbine.Turbine1.value;
        }
        nextActionCreators.map(actionCreator => {
        dispatch(actionCreator(data))})
    }

};

export const selectFarm = farm =>({
    type: AppConstants.ALERTS_SELECT_FARM,
    payload: {farm}
})

export const selectFarmAndCallNextAction = (farm, nextActionCreators, data) => dispatch => {
    dispatch(selectFarm(farm));
    if (nextActionCreators && nextActionCreators[0].name == "getTurbinesList"){
        nextActionCreators.shift();
        dispatch(getTurbinesList(nextActionCreators,data,farm))
    }else {
        nextActionCreators.map(actionCreator => {
            dispatch(actionCreator(data))
        })
    }
}

export const receivedFarms = farms =>({
    type: AppConstants.ALERTS_RECEIVED_FARMS_LIST,
    payload: {farmsList: farms}
})

export const receivedTurbines = turbines =>({
    type: AppConstants.ALERTS_RECEIVED_TURBINE_LIST,
    payload: {TurbineList: turbines}
})

export const getFarmsList = () => (dispatch) => {
    GetData.getFarmsList().then(farms => {
        dispatch(receivedFarms(farms));
    })
}

export const setDate = date => ({
    type: AppConstants.ALERTS_SET_DATES,
    payload: {initialDate: date.initialDate, finalDate: date.finalDate, selectedDate: date.selectedDate}
})
export const selectTurbine = turbine =>({
    type:AppConstants.ALERTS_SELECT_TURBINE,
    payload:{turbine}
})


export const selectTurbine2 = turbine =>({
    type:AppConstants.ALERTS_SELECT_TURBINE2,
    payload:{turbine}
});



export const setDateAndCallNextActions = (nextActionCreators,data, selectedDate) => dispatch => {
    dispatch(setDate({initialDate: data.start_date, finalDate: data.end_date, selectedDate: selectedDate}));
    nextActionCreators.map(actionCreator => {dispatch(actionCreator(data))});

}

export const getTurbinesList = (nextActionCreators,data,farm) => dispatch => {
    GetData.getTurbinesList(farm).then(turbines => {
        dispatch(receivedTurbines(turbines));
        if (nextActionCreators && nextActionCreators[0].name=="getAlertsByComponentTurbine_Alerts") {
            data.turbine_id=turbines[0].value;
        }
        else if(nextActionCreators && nextActionCreators[0].name=="getIntraFarmDataForAllCharts") {
            data && data.turbines ? data.turbines = turbines[0].value + "," + turbines[1].value : "";
        }
        else{
            data.turbines=turbines[0].value;
        }
        nextActionCreators.map(actionCreator => {dispatch(actionCreator(data,turbines[0]))});
    })

}

export const getTurbineAvailabilityData = (data) => dispatch => {
    dispatch({
        type:AppConstants.LOADING_TURBINE_AVAILABILITY,
        payload:{loaderStatus:true}
    })
    GetData.getTurbineAvailabilityData(data).then(plot => {
        dispatch(setTurbineAvailabilityData(plot));
        dispatch(getTurbinePbaData(data));
    } )
}

export const getVariables = (data) => dispatch => {
    GetData.getVariables().then(variables => {
        dispatch(setVariable1(variables[0]));
        dispatch(setVariable2(variables[5]));
        dispatch(setVariable3(variables[2]));
        dispatch(setVariable4(variables[3]));
        dispatch(setVariable5(variables[1]));
        dispatch(setVariable6(variables[4]));
        dispatch(setVariableList(variables));
        data && dispatch(getDataForVariables(data, variables));
    })
}

export const getDataForAnomalyReport = (data) => dispatch =>{
    //let selectedTab = data.selectedTab;
    let typeOfChart = data.typeOfChart;
    delete data.selectedTab;
    delete data.typeOfChart;
    //dispatch(getTurbinesOfSameFarms(data.turbines, selectedTab, data));
    if(typeOfChart == '2'){
       dispatch(getType2ChartForAnomalyReport(data))
    }else{
       dispatch(getFarmLevelTurbineDataForAnomaly(data))
    }
}
export const getAnomalyVariable = (data) => dispatch => {
    GetData.getVariables().then(variables => {
        dispatch(setScadaVariables(variables))
        dispatch(setAnomalyReportVariable(variables[0]))
        data && dispatch(getScadaDataForAnomalyReport(data, variables))
    })
}
export const setAnomalyReportVariable = variable => ({
    type: AppConstants.SET_ALERTS_ANOMALY_VARIABLE,
    payload: {variable,}
})
export const setScadaVariables = variables =>({
    type: AppConstants.SET_SCADA_VARIABLES,
    payload: {variables}
})
export const getScadaDataForAnomalyReport = (data, variables) => dispatch => {
    data.variable=variables[0].label;
    dispatch(getScadaDataForVar(data))
}
export const getScadaDataForVar = (data) => dispatch => {
    dispatch({
        type: AppConstants.LOADING_ALERTS_SCADA_DATA_VALUES,
        payload: {}
    })
    delete data.scadaSelectedVariable
    delete data.selectedScadaTurbines
    delete data.typeOfChart
    GetData.getScadaDataForVar(data).then(res => {
        let noData = false
        if(_.isEmpty(res.y1) && _.isEmpty(res.y2)){
            noData = true
        }
        dispatch({
            type: AppConstants.LOADED_ALERTS_SCADA_DATA_VALUES,
            payload: Object.assign({},{res:res,noDataScada:noData})
        })
    })
}
export const setTurbineAndGetScadaData = (turbine, tId, data) => dispatch =>{
    //tId = 1 indicates first turbine dropdown :: tId = 2 indicates second turbine dropdown
    let turbine1 = data.selectedScadaTurbines.split(',')[0];
    let turbine2 = data.selectedScadaTurbines.split(',')[1];
    if(tId === 1){
        dispatch(setSelectedScadaTurbine(turbine))
        turbine1 = turbine;
    }else{
        dispatch(setSelectedScadaTurbine2(turbine))
        turbine2 = turbine;
    }
    dispatch(getScadaDataForVar(Object.assign({}, data, {turbines: turbine1+','+turbine2, variable: data.scadaSelectedVariable.label})));
}
export const setSelectedScadaTurbine = turbine =>({
    type: AppConstants.SET_SCADA_TURBINE1,
    payload: {turbine}
})

export const setSelectedScadaTurbine2 = turbine => ({
    type: AppConstants.SET_SCADA_TURBINE2,
    payload: {turbine}
})
export const setVariableAndGetScadaData = (variable, data) => dispatch => {
    dispatch(setAnomalyReportVariable(variable))
    dispatch(getScadaDataForVar(Object.assign({}, data, {variable: variable.label, turbines: data.selectedScadaTurbines})));
}
export const setScadaDateAndGetScadaData = (date, data) => dispatch => {
    dispatch(setScadaDate(date.start,date.end,date.scadaSelectedDate))
    dispatch(getScadaDataForVar(Object.assign({}, data, {variable: data.scadaSelectedVariable.label, turbines: data.selectedScadaTurbines, start_date: date.start, end_date: date.end})));
}
export const getFarmLevelTurbineDataForAnomaly = data => dispatch => {
    dispatch({
        type: AppConstants.LOADING_FARM_LEVEL_DATA_FOR_ANOMALY_CHART1,
        payload: {}
    })
    GetData.getFarmLevelTurbineDataForAnomaly(data).then(res => {
        dispatch({
            type: AppConstants.LOADED_FARM_LEVEL_DATA_FOR_ANOMALY_CHART1,
            payload: {x: res.farmX, y: res.farmY, y2: res.farmY2}
        })
    })
}
export const getType2ChartForAnomalyReport = data => dispatch => {
     GetData.getLPFDataForAnomaly(data).then(res => {
        dispatch({
            type: AppConstants.LOADING_FARM_LEVEL_DATA_FOR_ANOMALY_CHART1,
            payload: {}
        })
        GetData.getFarmLevelTurbineDataForAnomaly(data).then(res => {
            dispatch({
                type: AppConstants.LOADED_FARM_LEVEL_DATA_FOR_ANOMALY_CHART1,
                payload: {x: res.farmX, y: res.farmY, y2: res.farmY2, markX: res.markX, markY: res.markY}
            })
        })
     })
}

export const getDataForVariables = (data, variables) => dispatch => {
    data.variable=variables[0].label;
    dispatch(getIntraFarmData(data,1))
    data.variable=variables[5].label;
    dispatch(getIntraFarmData(data,2))
    data.variable=variables[2].label;
    dispatch(getIntraFarmData(data,3))
    data.variable=variables[3].label;
    dispatch(getIntraFarmData(data,4))
}


export const setVariableList = variables =>({
    type :AppConstants.ALERTS_SET_VARIABLES_LIST,
    payload:{variables}
})

export const setVariable1 = variable => ({
    type : AppConstants.ALERTS_SET_VARIABLE_1,
    payload : {variable}
})

export const setVariable2 = variable => ({
    type : AppConstants.ALERTS_SET_VARIABLE_2,
    payload : {variable}
})
export const setVariable3 = variable => ({
    type : AppConstants.ALERTS_SET_VARIABLE_3,
    payload : {variable}
})
export const setVariable4 = variable => ({
    type : AppConstants.ALERTS_SET_VARIABLE_4,
    payload : {variable}
})
export const setVariable5 = variable => ({
    type : AppConstants.ALERTS_SET_VARIABLE_5,
    payload : {variable}
})
export const setVariable6 = variable => ({
    type : AppConstants.ALERTS_SET_VARIABLE_6,
    payload : {variable}
})


export const changeVariablesAndGetIntraFarmsDataOfAlerts = (data,index) => dispatch => {
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



export const changeVariablesAndGetPowerCurveScadaDataOfAlerts = (data,index) => dispatch => {

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



export const changeVariables = (data,index) => dispatch => {
    if (index==1){dispatch(setVariable1(data.variable))}
    else if (index==2){dispatch(setVariable2(data.variable))}
    else if (index==3){dispatch(setVariable3(data.variable))}
    else{dispatch(setVariable4(data.variable))}
    data.variable=data.variable.label;
    dispatch(getIntraFarmData(data,index));
}



export const setPlot1 = (plot,noDataPlot1) => ({
    type : AppConstants.ALERTS_SET_PLOT_1,
    payload : {plot,loaderStatus:false,noDataPlot1}
})

export const setPlot2 = (plot,noDataPlot2) => ({
    type : AppConstants.ALERTS_SET_PLOT_2,
    payload : {plot,loaderStatus:false,noDataPlot2}
})

export const setPlot3 = (plot,noDataPlot3) => ({
    type : AppConstants.ALERTS_SET_PLOT_3,
    payload : {plot,loaderStatus:false,noDataPlot3}
})

export const setPlot4 = (plot,noDataPlot4) => ({
    type : AppConstants.ALERTS_SET_PLOT_4,
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
            type:AppConstants.ALERTS_LOADING_INTRA_CHART1,
            payload:{loaderStatus:true}
        });
    }
    else if (index == 2) {
        dispatch({
            type:AppConstants.ALERTS_LOADING_INTRA_CHART2,
            payload:{loaderStatus:true}
        });
    }
    else if (index==3){
        dispatch({
            type:AppConstants.ALERTS_LOADING_INTRA_CHART3,
            payload:{loaderStatus:true}
        });
    }
    else {
        dispatch({
            type:AppConstants.ALERTS_LOADING_INTRA_CHART4,
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
export const setHistoryOfAlerts = historyofAlerts => ({
    type:AppConstants.ALERTS_SET_HISTORY_OF_ALERTS_FOR_TURBINES,
    payload:{historyofAlerts}
})

export const getAlertHistoryForTurbine = (data) => dispatch => {
    GetData.getAlertHistoryForTurbine(data).then(historyofAlerts =>{
        dispatch(setHistoryOfAlerts(historyofAlerts));
    })
}
export const setBarPlot1 = (plot,AlertsByCompNoData) => ({
    type:AppConstants.ALERTS_SET_ALERTS_BY_COMPONENT,
    payload:{plot,AlertsByCompNoData,loaderStatus:false}
})
export const getAlertsByComponentTurbine_Alerts = (data,turbine) => dispatch => {
    dispatch({
        type:AppConstants.ALERTS_LOADING_TURBINE_ALERTS_COMP,
        payload:{loaderStatus:true}
    })
    dispatch({
        type:AppConstants.ALERTS_LOADING_TURBINE_ALERTS_MONTH,
        payload:{loaderStatus:true}
    })
    dispatch({
        type:AppConstants.ALERTS_LOADING_TURBINE_ALERTS_HISTORY,
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
    type:AppConstants.ALERTS_SET_ALERTS_BY_MONTH,
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
    type:AppConstants.ALERTS_SET_TURBINE_AVAILABILITY_DATA,
    payload:{plot,loaderStatus:false,noData}
})
export const getTurbineAvailabilityData_Alerts = (data) => dispatch => {
    dispatch({
        type:AppConstants.ALERTS_LOADING_TURBINE_AVAILABILITY,
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
    type:AppConstants.ALERTS_SET_TURBINE_PBA_DATA,
    payload:{plot,loaderStatus:false,noData}
})
export const getTurbinePbaData = (data) => dispatch => {
    dispatch({
        type:AppConstants.ALERTS_LOADING_TURBINE_AVAILABILITY_PBA,
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

export const selectTab = id => ({
    type: AppConstants.ALERTS_SELECT_TAB,
    payload: {id}
})

export const changeMode = mode => ({
    type: AppConstants.ALERTS_CHANGE_CHART_MODE,
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
export const getTurbineScadaDetailsChart1 = data => dispatch => {
    dispatch({
        type: AppConstants.ALERTS_LOADING_TURBINE_SCADA_DATA,
        payload: {}
    });
    GetData.getScadaDetails(data).then(res =>{
        let noData=false;
        if (_.isEmpty(res.y1) || _.isEmpty(res.y2) || _.isEmpty(res.y3) )
        {
            noData=true;
        }
        dispatch({
            type: AppConstants.ALERTS_LOADED_TURBINE_SCADA_DATA,
            payload: {res,noData}
        });
    })
}
export const getTurbineScadaDetailsChart2 = data => dispatch => {
    let chart2Data = Object.assign({}, data, {variable1: data.variable4, variable2: data.variable5, variable3: data.variable6})
    dispatch({
        type: AppConstants.ALERTS_LOADING_TURBINE_CHART2_SCADA_DATA,
        payload: {}
    })
    GetData.getScadaDetails(chart2Data).then(res =>{
        let noData=false;
        if (_.isEmpty(res.y1) || _.isEmpty(res.y2) || _.isEmpty(res.y3) )
        {
            noData=true;
        }
        dispatch({
            type: AppConstants.ALERTS_LOADED_TURBINE_CHART2_SCADA_DATA,
            payload:{res,noData}
        })
    })
}

export const getVariablesAndTurbineScadaDetailsOfAlerts = (data, powerCurveMode) => dispatch => {
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
export const setScadaInitialDate = initialDate =>({
    type: AppConstants.SET_SCADA_INITIAL_DATE,
    payload: initialDate
})
export const setScadaFinalDate = finalDate => ({
    type: AppConstants.SET_SCADA_FINAL_DATE,
    payload: finalDate
})

export const setScadaDate = (start,end,selected) => ({
    type : AppConstants.SET_SCADA_DATE,
    payload : {start,end,selected}
})