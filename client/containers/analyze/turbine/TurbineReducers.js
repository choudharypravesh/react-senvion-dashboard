import { combineReducers } from 'redux'
import {Map} from 'immutable'
import moment from 'moment'
import AppConstants from '../../../constants/AppConstants'

const initialState = Map({
    selectedTab: 1,
    variables:['Temp__Rotorbearing', 'Rotor_speed', 'Wind_speed', 'Wind_speed_2' ],
    selectedVariables:{selectedVariable1:'777', selectedVariable2:'774',selectedVariable3: '569',selectedVariable4: '568', selectedVariable5: '1372', selectedVariable6: '614'},
    initialDate:moment().subtract(7, 'days').format('YYYY-MM-DD'),
    finalDate: moment().format('YYYY-MM-DD'),
    selectedTurbine:"90903",
    selectedTurbine2:"90904",
    selectedCountry:"France",
    selectedFarm:"Sambres",
    selectedAlert:{id:"14",alerts:"Rotor Bearing Temperature",priority:"High",model:"MM",date_identified:new Date(),date_resolved:null,category:"Category 1",source:"PDM",status:0,resolved_by:null,resolved_at:null,type_of_chart:"1"},
    noData:false,
    selectedDate: 1,
    powerCurveChart2Loading: true,
    powerCurveChartLoading: true,
    powerCurveMode: '2',//1: torque rpm curve 2: power curve
    loaderStatusIntraChart1:true,
    loaderStatusIntraChart2:true,
    loaderStatusIntraChart3:true,
    loaderStatusIntraChart4:true,
    loaderStatusAlertByComp:true,
    loaderStatusAlertByMonth:true,
    loaderStatusAlertsHistory:true
})

const TurbineData = (state = initialState, action) => {
    switch(action.type){
        case AppConstants.SELECT_TAB:
            return state.set('selectedTab',action.payload.id);
        case AppConstants.SELECT_COUNTRY:
            return state.set('selectedCountry',action.payload.countryId)
        case AppConstants.RECEIVED_COUNTRIES_LIST:
            return state.set('countriesList', action.payload.countriesList).set('selectedCountry',action.payload.countriesList[0].value)
        case AppConstants.SELECT_FARM:
            return state.set('selectedFarm',action.payload.farm)
        case AppConstants.RECEIVED_FARMS_LIST:
            let farmList = action.payload.farmsList;
            return state.set('farmsList',action.payload.farmsList).set('selectedFarm',farmList ? farmList[0].value : "")
        case AppConstants.SELECT_TURBINE:
            return state.set('selectedTurbine', action.payload.turbine)
        case AppConstants.SELECT_TURBINE2:
            return state.set('selectedTurbine2', action.payload.turbine)
        case AppConstants.RECEIVED_TURBINE_LIST:
            let turbinesList = action.payload.TurbineList;
            return state.set('turbineList',turbinesList)
                .set('selectedTurbine',turbinesList.length > 0 ? turbinesList[0].value : "")
                .set('selectedTurbine2', turbinesList.length > 1 ? turbinesList[1].value : "")

        case AppConstants.SET_VARIABLES_LIST:
            return state.set('variables', action.payload.variables)
        case AppConstants.SET_VARIABLE_1:
            return state.set('selectedVariable1', action.payload.variable)
        case AppConstants.SET_VARIABLE_2:
            return state.set('selectedVariable2', action.payload.variable)
        case AppConstants.SET_VARIABLE_3:
            return state.set('selectedVariable3', action.payload.variable)
        case AppConstants.SET_VARIABLE_4:
            return state.set('selectedVariable4', action.payload.variable)
        case AppConstants.SET_VARIABLE_5:
            return state.set('selectedVariable5', action.payload.variable)
        case AppConstants.SET_VARIABLE_6:
            return state.set('selectedVariable6', action.payload.variable)
        case AppConstants.SET_PLOT_1:
            return state.set('noDataPlot1', action.payload.noDataPlot1)
                .set('loaderStatusIntraChart1', action.payload.loaderStatus)
                .set('plot1X1', action.payload.plot.x1)
                .set('plot1Y1', action.payload.plot.y1)
                .set('plot1X2', action.payload.plot.x2)
                .set('plot1Y2', action.payload.plot.y2)
        case AppConstants.SET_PLOT_2:
            return state.set('noDataPlot2', action.payload.noDataPlot2)
                .set('loaderStatusIntraChart2', action.payload.loaderStatus)
                .set('plot2X1', action.payload.plot.x1)
                .set('plot2Y1', action.payload.plot.y1)
                .set('plot2X2', action.payload.plot.x2)
                .set('plot2Y2', action.payload.plot.y2)
        case AppConstants.SET_PLOT_3:
            return state.set('noDataPlot3', action.payload.noDataPlot3)
                .set('loaderStatusIntraChart3', action.payload.loaderStatus)
                .set('plot3X1', action.payload.plot.x1)
                .set('plot3Y1', action.payload.plot.y1)
                .set('plot3X2', action.payload.plot.x2)
                .set('plot3Y2', action.payload.plot.y2)
        case AppConstants.SET_PLOT_4:
            return state.set('noDataPlot4', action.payload.noDataPlot4)
                .set('loaderStatusIntraChart4', action.payload.loaderStatus)
                .set('plot4X1', action.payload.plot.x1)
                .set('plot4Y1', action.payload.plot.y1)
                .set('plot4X2', action.payload.plot.x2)
                .set('plot4Y2', action.payload.plot.y2)
        case AppConstants.SET_DATES:
            return state.set('initialDate', action.payload.initialDate)
                .set('finalDate', action.payload.finalDate)
                .set('selectedDate', action.payload.selectedDate)
        case AppConstants.SET_HISTORY_OF_ALERTS_FOR_TURBINES:
            return state.set('historyofAlerts', action.payload.historyofAlerts)
            .set('loaderStatusAlertsHistory', false)
        case AppConstants.SET_ALERTS_BY_COMPONENT:
            return state.set('loaderStatusAlertByComp', action.payload.loaderStatus)
                .set('alertsByCompNoData', action.payload.AlertsByCompNoData)
                .set('alertsByComponentX', action.payload.plot.x1)
                .set('alertsByComponentY', action.payload.plot.y1)
        case AppConstants.SET_ALERTS_BY_MONTH:
            return state.set('loaderStatusAlertByMonth', action.payload.loaderStatus)
                .set('alertsByMonthNoData', action.payload.AlertsByMonthNoData)
                .set('alertsByMonthX', action.payload.plot.x1)
                .set('alertsByMonthY', action.payload.plot.y1)
        case AppConstants.SET_TURBINE_AVAILABILITY_DATA:
            return state.set('noDataAvail', action.payload.noData)
                .set('loaderStatusTurbineAvail', action.payload.loaderStatus)
                .set('availabilityX', action.payload.plot.x1)
                .set('availabilityY', action.payload.plot.y1)
        case AppConstants.SET_TURBINE_PBA_DATA:
            return state.set('noDataPba', action.payload.noData)
                .set('loaderStatusTurbineAvailPba', action.payload.loaderStatus)
                .set('pbaX', action.payload.plot.x1)
                .set('pbaY', action.payload.plot.y1)
        case AppConstants.LOADING_INTRA_CHART1:
            return state.set('loaderStatusIntraChart1', action.payload.loaderStatus)
        case AppConstants.LOADING_INTRA_CHART2:
            return state.set('loaderStatusIntraChart2', action.payload.loaderStatus)
        case AppConstants.LOADING_INTRA_CHART3:
            return state.set('loaderStatusIntraChart3', action.payload.loaderStatus)
        case AppConstants.LOADING_INTRA_CHART4:
            return state.set('loaderStatusIntraChart4', action.payload.loaderStatus)
        case AppConstants.LOADING_TURBINE_AVAILABILITY:
            return state.set('loaderStatusTurbineAvail', action.payload.loaderStatus)
        case AppConstants.LOADING_TURBINE_AVAILABILITY_PBA:
            return state.set('loaderStatusTurbineAvailPba', action.payload.loaderStatus)
        case AppConstants.LOADING_TURBINE_SCADA_DATA:
            return state.set('loadingTurbinePowerCurve', true);
        case AppConstants.LOADED_TURBINE_SCADA_DATA:
            return state.set('powerCurve1NoData', action.payload.noData)
                .set('loadingTurbinePowerCurve', false)
                .set('powerCurveX', action.payload.res.x)
                .set('powerCurveY1', action.payload.res.y1)
                .set('powerCurveY2', action.payload.res.y2)
                .set('powerCurveY3', action.payload.res.y3)
        case AppConstants.LOADING_TURBINE_CHART2_SCADA_DATA:
            return state.set('loadingTurbinePowerCurveChart2', true)
        case AppConstants.LOADED_TURBINE_CHART2_SCADA_DATA:
            return state.set('powerCurve2NoData', action.payload.noData)
                .set('loadingTurbinePowerCurveChart2', false)
                .set('powerCurveChart2X', action.payload.res.x)
                .set('powerCurveChart2Y1', action.payload.res.y1)
                .set('powerCurveChart2Y2', action.payload.res.y2)
                .set('powerCurveChart2Y3', action.payload.res.y3)
        case AppConstants.CHANGE_CHART_MODE:
            return state.set('powerCurveMode', action.payload.mode)
        case AppConstants.LOADING_TURBINE_ALERTS_COMP:
            return state.set('loaderStatusAlertByComp', action.payload.loaderStatus)
        case AppConstants.LOADING_TURBINE_ALERTS_MONTH:
            return state.set('loaderStatusAlertByMonth', action.payload.loaderStatus)
        case AppConstants.LOADING_TURBINE_ALERTS_HISTORY:
            return state.set('loaderStatusAlertsHistory', action.payload.loaderStatus)
        default:
            return state;
    }
}


export default TurbineData;
