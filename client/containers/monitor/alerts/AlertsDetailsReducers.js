import { combineReducers } from 'redux'
import ReactCookie from 'react-cookie';
import {Map} from 'immutable'
import moment from 'moment'
import AppConstants from '../../../constants/AppConstants'
const AlertsDetailsData = (state = Map({
    user: ReactCookie.load('user'),
    selectedTab:0,
    variables:['Temp__Rotorbearing', 'Rotor_speed', 'Wind_speed', 'Wind_speed_2' ],
    selectedVariables:{selectedVariable1:'777', selectedVariable2:'774',selectedVariable3: '569',selectedVariable4: '568', selectedVariable5: '1372', selectedVariable6: '614'},
    initialDate:moment().subtract(7, 'days').format('YYYY-MM-DD'),
    finalDate: moment().format('YYYY-MM-DD'),
    selectedTurbine:"",
    selectedTurbine2:"",
    selectedCountry:"France",
    selectedFarm:"Sambres",
    historyofAlerts:[],
    noData:false,
    selectedDate: 1,
    powerCurveMode: '2',
    mode: 'alerts',
    loadingScadaDataChart: true,
    loadingLPFChart: true,
    scadaSelectedVariable: '',
    selectedAlert: localStorage.selectedAlert ? JSON.parse(localStorage.selectedAlert) : {id:"14",alerts:"Rotor Bearing Temperature",priority:"High",farm_name:"St. Robert Bellarmin",turbine_id:"91690",model:"MM",date_identified:"2016-04-30T18:30:00.000Z",date_resolved:null,category:"Category 1",source:"PDM",status:0,resolved_by:null,resolved_at:null,type_of_chart:"1"},
    loaderStatusIntraChart1:true,
    loaderStatusIntraChart2:true,
    loaderStatusIntraChart3:true,
    loaderStatusIntraChart4:true,
    loaderStatusAlertByComp:true,
    loaderStatusAlertByMonth:true,
    loaderStatusAlertsHistory:true,
    scadaSelectedDate:1
    }), action) => {
    switch(action.type){
        case AppConstants.ALERTS_LOADED_TURBINES_OF_SAME_FARM:
            return state.set('turbineList', action.payload.turbinesList)
                    .set('selectedTurbine2', action.payload.turbinesList[3].value)
        case AppConstants.ALERTS_LOADED_SCADA_TURBINES_OF_SAME_FARM:
            return state.set('turbineList', action.payload.turbinesList)
                    .set('selectedScadaTurbine', action.payload.turbine1)
                    .set('selectedScadaTurbine2', action.payload.turbinesList[1] && action.payload.turbinesList[1].value && action.payload.turbinesList[1].value !== action.payload.turbine1? action.payload.turbinesList[1].value:action.payload.turbinesList[0].value)
        case AppConstants.ALERTS_SET_ALERT:
            return state.set('mode', 'alerts')
                    .set('type_of_chart', action.payload.type_of_chart)
                    .set('initialDate', moment(action.payload.date_identified).subtract(7, 'days').format('YYYY-MM-DD'))
                    .set('finalDate', moment(action.payload.date_identified).format('YYYY-MM-DD'))
                    .set('selectedScadaTurbine', action.payload.turbine_id)
                    .set('selectedTurbine', action.payload.turbine_id)
                    .set('scadaInitialDate', moment(action.payload.date_identified).subtract(7, 'days').format('YYYY-MM-DD'))
                    .set('scadaFinalDate', moment(action.payload.date_identified).format('YYYY-MM-DD'))
                    .set('selectedTab', 1)
                    .set('selectedFarm', action.payload.farm_name)
                    .set('selectedAlert', action.payload)
                    .set('scadaSelectedDate',1)
                    .set('selectedDate',1)
        case AppConstants.SET_SCADA_INITIAL_DATE:
            return state.set('scadaInitialDate', action.payload)
        case AppConstants.SET_SCADA_FINAL_DATE:
            return state.set('scadaFinalDate', action.payload)
        case AppConstants.SET_SCADA_TURBINE1:
            return state.set('selectedScadaTurbine', action.payload.turbine)
        case AppConstants.SET_SCADA_TURBINE2:
            return state.set('selectedScadaTurbine2', action.payload.turbine)
        case AppConstants.SET_SCADA_VARIABLES:
            return state.set('scadaVariableList', action.payload.variables)
        case AppConstants.ALERTS_SELECT_TAB:
            return state.set('selectedTab', action.payload.id);
        case AppConstants.ALERTS_SELECT_COUNTRY:
            return state.set('selectedCountry', action.payload.countryId);
        case AppConstants.ALERTS_RECEIVED_COUNTRIES_LIST:
            return state.set('countriesList', action.payload.countriesList);
        case AppConstants.ALERTS_SELECT_FARM:
            return state.set('selectedFarm', action.payload.farm)
        case AppConstants.ALERTS_RECEIVED_FARMS_LIST:
            return state.set('farmsList', action.payload.farmsList)
        case AppConstants.ALERTS_SELECT_TURBINE:
            return state.set('selectedTurbine', action.payload.turbine)
        case AppConstants.ALERTS_SELECT_TURBINE2:
            return state.set('selectedTurbine2', action.payload.turbine)
        case AppConstants.ALERTS_RECEIVED_TURBINE_LIST:
            return state.set('turbineList', action.payload.TurbineList)
                    .set('selectedTurbine', action.payload.TurbineList[0].value)
                    .set('selectedTurbine2', action.payload.TurbineList[1].value)
        case AppConstants.ALERTS_SET_VARIABLES_LIST:
            return state.set('variables', action.payload.variables)
        case AppConstants.ALERTS_SET_VARIABLE_1:
            return state.set('selectedVariable1', action.payload.variable)
        case AppConstants.ALERTS_SET_VARIABLE_2:
            return state.set('selectedVariable2', action.payload.variable)
        case AppConstants.ALERTS_SET_VARIABLE_3:
            return state.set('selectedVariable3', action.payload.variable)
        case AppConstants.ALERTS_SET_VARIABLE_4:
            return state.set('selectedVariable4', action.payload.variable)
        case AppConstants.ALERTS_SET_VARIABLE_5:
            return state.set('selectedVariable5', action.payload.variable)
        case AppConstants.ALERTS_SET_VARIABLE_6:
            return state.set('selectedVariable6', action.payload.variable)
        case AppConstants.ALERTS_SET_PLOT_1:
            return state.set('noDataPlot1', action.payload.noDataPlot1)
                    .set('loaderStatusIntraChart1', action.payload.loaderStatus)
                    .set('plot1X1', action.payload.plot.x1)
                    .set('plot1Y1', action.payload.plot.y1)
                    .set('plot1X2', typeof action.payload.plot.x2 === "undefined" ? "" : action.payload.plot.x2)
                    .set('plot1Y2', typeof action.payload.plot.y2 === "undefined" ? "" : action.payload.plot.y2);
        case AppConstants.ALERTS_SET_PLOT_2:
            return state.set('noDataPlot2', action.payload.noDataPlot2)
                    .set('loaderStatusIntraChart2', action.payload.loaderStatus)
                    .set('plot2X1', action.payload.plot.x1)
                    .set('plot2Y1', action.payload.plot.y1)
                    .set('plot2X2', action.payload.plot.x2)
                    .set('plot2Y2', action.payload.plot.y2)

        case AppConstants.ALERTS_SET_PLOT_3:
            return state.set('noDataPlot3', action.payload.noDataPlot3)
                    .set('loaderStatusIntraChart3', action.payload.loaderStatus)
                    .set('plot3X1', action.payload.plot.x1)
                    .set('plot3Y1', action.payload.plot.y1)
                    .set('plot3X2', action.payload.plot.x2)
                    .set('plot3Y2', action.payload.plot.y2)
        case AppConstants.ALERTS_SET_PLOT_4:
            return state.set('noDataPlot4', action.payload.noDataPlot4)
                    .set('loaderStatusIntraChart4', action.payload.loaderStatus)
                    .set('plot4X1', action.payload.plot.x1)
                    .set('plot4Y1', action.payload.plot.y1)
                    .set('plot4X2', action.payload.plot.x2)
                    .set('plot4Y2', action.payload.plot.y2)
        case AppConstants.ALERTS_SET_DATES:
            return state.set('initialDate', action.payload.initialDate)
                    .set('finalDate', action.payload.finalDate)
                    .set('selectedDate', action.payload.selectedDate)
        case AppConstants.ALERTS_SET_HISTORY_OF_ALERTS_FOR_TURBINES:
            return state.set('historyofAlerts', action.payload.historyofAlerts)
                    .set('loaderStatusAlertsHistory', false)
        case AppConstants.ALERTS_SET_ALERTS_BY_COMPONENT:
            return state.set('loaderStatusAlertByComp', action.payload.loaderStatus)
                    .set('alertsByCompNoData', action.payload.AlertsByCompNoData)
                    .set('alertsByComponentX', action.payload.plot.x1)
                    .set('alertsByComponentY', action.payload.plot.y1)
        case AppConstants.ALERTS_SET_ALERTS_BY_MONTH:
            return state.set('loaderStatusAlertByMonth', action.payload.loaderStatus)
                    .set('alertsByMonthNoData', action.payload.AlertsByMonthNoData)
                    .set('alertsByMonthX', action.payload.plot.x1)
                    .set('alertsByMonthY', action.payload.plot.y1)
        case AppConstants.ALERTS_SET_TURBINE_AVAILABILITY_DATA:
            return state.set('noDataAvail', action.payload.noData)
                    .set('loaderStatusTurbineAvail', action.payload.loaderStatus)
                    .set('availabilityX', action.payload.plot.x1)
                    .set('availabilityY', action.payload.plot.y1)
        case AppConstants.ALERTS_SET_TURBINE_PBA_DATA:
            return state.set('noDataPba', action.payload.noData)
                    .set('loaderStatusTurbineAvailPba', action.payload.loaderStatus)
                    .set('pbaX', action.payload.plot.x1)
                    .set('pbaY', action.payload.plot.y1)
        case AppConstants.ALERTS_CHANGE_CHART_MODE:
            return state.set('powerCurveMode', action.payload.mode)
        case AppConstants.ALERTS_LOADING_TURBINE_SCADA_DATA:
            return state.set('loadingTurbinePowerCurve', true);
        case AppConstants.ALERTS_LOADED_TURBINE_SCADA_DATA:
            return state.set('powerCurve1NoData', action.payload.noData)
                    .set('loadingTurbinePowerCurve', false)
                    .set('powerCurveX', action.payload.res.x)
                    .set('powerCurveY1', action.payload.res.y1)
                    .set('powerCurveY2', action.payload.res.y2)
                    .set('powerCurveY3', action.payload.res.y3)
        case AppConstants.ALERTS_LOADING_TURBINE_CHART2_SCADA_DATA:
            return state.set('loadingTurbinePowerCurveChart2', true)
        case AppConstants.ALERTS_LOADED_TURBINE_CHART2_SCADA_DATA:
            return state.set('powerCurve2NoData', action.payload.noData)
                    .set('loadingTurbinePowerCurveChart2', false)
                    .set('powerCurveChart2X', action.payload.res.x)
                    .set('powerCurveChart2Y1', action.payload.res.y1)
                    .set('powerCurveChart2Y2', action.payload.res.y2)
                    .set('powerCurveChart2Y3', action.payload.res.y3)
        case AppConstants.ALERTS_LOADING_INTRA_CHART1:
            return state.set('loaderStatusIntraChart1', action.payload.loaderStatus)
        case AppConstants.ALERTS_LOADING_INTRA_CHART2:
            return state.set('loaderStatusIntraChart2', action.payload.loaderStatus)
        case AppConstants.ALERTS_LOADING_INTRA_CHART3:
            return state.set('loaderStatusIntraChart3', action.payload.loaderStatus)
        case AppConstants.ALERTS_LOADING_INTRA_CHART4:
            return state.set('loaderStatusIntraChart4', action.payload.loaderStatus)
        case AppConstants.ALERTS_LOADING_TURBINE_AVAILABILITY:
            return state.set('loaderStatusTurbineAvail', action.payload.loaderStatus)
        case AppConstants.ALERTS_LOADING_TURBINE_AVAILABILITY_PBA:
            return state.set('loaderStatusTurbineAvailPba', action.payload.loaderStatus)
        case AppConstants.SET_ALERTS_ANOMALY_VARIABLE:
            return state.set('scadaSelectedVariable', action.payload.variable)
        case AppConstants.LOADING_ALERTS_SCADA_DATA_VALUES:
            return state.set('loadingScadaDataChart', true)
        case AppConstants.LOADED_ALERTS_SCADA_DATA_VALUES:
            return state.set('loadingScadaDataChart', false)
                    .set('scadaDatax1', action.payload.res.x1)
                    .set('scadaDatay1', action.payload.res.y1)
                    .set('scadaDatax2', action.payload.res.x2)
                    .set('scadaDatay2', action.payload.res.y2)
                .set('noDataScada',action.payload.noDataScada)
        case AppConstants.LOADING_FARM_LEVEL_DATA_FOR_ANOMALY_CHART1:
            return state.set('loadingLPFChart', true)
        case AppConstants.LOADED_FARM_LEVEL_DATA_FOR_ANOMALY_CHART1:
            return state.set('loadingLPFChart', false)
                    .set('lpfDataX', action.payload.x)
                    .set('lpfDataY', action.payload.y)
                    .set('lpfDataY2', action.payload.y2)
                    .set('markX', action.payload.markX)
                    .set('markY', action.payload.markY)
        case AppConstants.ALERTS_LOADING_TURBINE_ALERTS_COMP:
            return state.set('loaderStatusAlertByComp', action.payload.loaderStatus)
        case AppConstants.ALERTS_LOADING_TURBINE_ALERTS_MONTH:
            return state.set('loaderStatusAlertByMonth', action.payload.loaderStatus)
        case AppConstants.ALERTS_LOADING_TURBINE_ALERTS_HISTORY:
            return state.set('loaderStatusAlertsHistory', action.payload.loaderStatus)
        case AppConstants.SET_SCADA_DATE:
            return state.set('scadaInitialDate',action.payload.start).set('scadaFinalDate',action.payload.end).set('scadaSelectedDate',action.payload.selected)
        default:
            return state;
    }
}


export default AlertsDetailsData;


