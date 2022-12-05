// App.js
import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import {Link} from 'react-router';
import FaPlus from 'react-icons/lib/fa/plus-circle';
import CreateServiceOrderPopup from '../../../components/CreateServiceOrder/CreateServiceOrderModal'
import FaArrowBack from 'react-icons/lib/fa/arrow-left'
import classnames from 'classnames'
import CommentBox from '../../../components/CommentsBox/Skeleton'
import FaArrowRight from 'react-icons/lib/fa/arrow-right'
import AlertHistory from './subcomponents/AlertsHistory';
import Availability from './subcomponents/Availability'
import IntraFarm from './subcomponents/IntraFarm'
import PowerCurve from './subcomponents/PowerCurve'
import TurbineKPI from './subcomponents/TurbineKPI'
import AnomalyReport from './subcomponents/AnomalyReport2'
import moment from 'moment'

import Chart from '../../../components/PlotlyChart/skeleton';
import Select  from 'react-virtualized-select';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import { connect } from 'react-redux'
import { setDate, selectTab,getTurbinesList, getTurbineScadaDetails, getDataForAnomalyReport} from './AlertsDetailsActions';
import {selectFarmAndCallNextAction,setDateAndCallNextActions,getIntraFarmDataForAllCharts,getVariables,getAnomalyVariable} from './AlertsDetailsActions';
import {getAlertsByComponentTurbine_Alerts,getTurbineAvailabilityData} from './AlertsDetailsActions';
import ReactCookie from 'react-cookie';
import {setAlert, setTurbineAndCallNextActions, changeModeAndGetScadaTurbineData} from './AlertsDetailsActions'
import {showHidePopup} from '../../../actions/AppActions'

class AlertsDetailsAlerts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedAlert: localStorage.selectedAlert ? JSON.parse(localStorage.selectedAlert) : {id:"14",alerts:"Rotor Bearing Temperature",priority:"High",farm_name:"St. Robert Bellarmin",turbine_id:"91690",model:"MM",date_identified:"2016-04-30T18:30:00.000Z",date_resolved:null,category:"Category 1",source:"PDM",status:0,resolved_by:null,resolved_at:null,type_of_chart:"1"},
            activeTab: 1,
            showPopup: false,
        };
        this.setActive = this.setActive.bind(this);
        this.openCreateServiceOrderPopup = this.openCreateServiceOrderPopup.bind(this);
        this.handleFarmChange = this.handleFarmChange.bind(this)
        this.handleTurbineChange = this.handleTurbineChange.bind(this)
        this.handleTurbineChange2 = this.handleTurbineChange2.bind(this)
        this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this)
        this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this)
        this.handleGo = this.handleGo.bind(this)
        this.updateDate = this.updateDate.bind(this);
        this.getNextActionsCreatorsAndData = this.getNextActionsCreatorsAndData .bind(this);
        this.handleModeChange = this.handleModeChange.bind(this)
        this.showPopup = this.showPopup.bind(this);
        this.openCreateServiceOrderPopup = this.openCreateServiceOrderPopup.bind(this);
    }


    componentWillMount() {

        if(this.props.selectedTab == 1 ){
            this.props.dispatch(getAnomalyVariable());
        }
    }

    handleModeChange(mode){//mode 2: power curve , mode 1: torque rpm curve
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();

        this.props.dispatch(changeModeAndGetScadaTurbineData(mode.value,data))
    }
    getNextActionsCreatorsAndData(){
        switch(this.props.selectedTab) {
            case 1:
                 let data = {
                     alert_name: this.props.selectedAlert.alerts,
                     start_date: this.props.initialDate,
                     end_date: this.props.finalDate,
                     turbines: this.props.selectedAlert.turbine_id,
                     selectedScadaTurbines: this.props.selectedScadaTurbine + ','+ this.props.selectedScadaTurbine2,
                     scadaSelectedVariable: this.props.scadaSelectedVariable,
                     type: 2,
                     user_id: ReactCookie.load('user').user_id,
                     variable: this.props.selectedAlert.variable_name,
                    // selectedTab: this.props.selectedTab,
                     typeOfChart: this.props.typeOfChart
                 }
                 let data1= {
                     alert_name: this.props.selectedAlert.alerts,
                     start_date: this.props.scadaInitialDate,
                     end_date: this.props.scadaFinalDate,
                     turbines: this.props.selectedAlert.turbine_id,
                     selectedScadaTurbines: this.props.selectedScadaTurbine + ','+ this.props.selectedScadaTurbine2,
                     scadaSelectedVariable: this.props.scadaSelectedVariable,
                     type: 2,
                     user_id: ReactCookie.load('user').user_id,
                     variable: this.props.selectedAlert.variable_name,
                     // selectedTab: this.props.selectedTab,
                     typeOfChart: this.props.typeOfChart
                 }
                let nextActionCreators = [getTurbinesList,getDataForAnomalyReport];
                return {nextActionCreators, data, data1}
            case 2: {
                let data = {
                    variable: this.props.selectedVariables,
                    start_date: this.props.initialDate,
                    end_date: this.props.finalDate,
                    turbines: this.props.selectedTurbine + "," + this.props.selectedTurbine2,
                    type: 2,
                    user_id: ReactCookie.load('user').user_id
                }
                let nextActionCreators = [getTurbinesList, getIntraFarmDataForAllCharts];
                return {nextActionCreators, data}
            }
            case 3: {
                let date_identified = moment(this.props.selectedAlert.date_identified).format('YYYY-MM-DD')
                let data = {
                    alerts: this.props.selectedAlert.alerts,
                    date_identified: date_identified,
                    turbine_id: this.props.selectedTurbine
                }
                let nextActionCreators = [getTurbinesList, getAlertsByComponentTurbine_Alerts]
                return {nextActionCreators, data}
            }
            case 4: {
                let data = {
                   variable1: this.props.selectedVariables.selectedVariable1,
                   variable2: this.props.selectedVariables.selectedVariable2,
                   variable3:this.props.selectedVariables.selectedVariable3,
                   variable4: this.props.selectedVariables.selectedVariable4,
                   variable5: this.props.selectedVariables.selectedVariable5,
                   variable6:this.props.selectedVariables.selectedVariable6,
                   start_date: this.props.initialDate,
                   end_date: this.props.finalDate,
                   turbines: this.props.selectedTurbine,
                   type: 2,
                   user_id: ReactCookie.load('user').user_id,
               };
            let nextActionCreators = [getTurbinesList, getTurbineScadaDetails]
            return {nextActionCreators, data}

            }
            case 5: {
                let data = {
                    turbines: this.props.selectedTurbine,
                    start_date: this.props.initialDate,
                    end_date: this.props.finalDate,
                    id: 0
                }
                let nextActionCreators = [getTurbinesList, getTurbineAvailabilityData]
                return {nextActionCreators, data}
            }
            default : {
                let data = {};
                let nextActionCreators = [];
                return {nextActionCreators, data}
            }
        }

    }

    handleFarmChange(farm){
            const {dispatch} = this.props;
            let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
            dispatch(selectFarmAndCallNextAction(farm.value,nextActionCreators,data));
        }

        handleTurbineChange(turbine){
            const {dispatch} = this.props;
            let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
            nextActionCreators.shift();
            if(this.props.selectedTab==2){
                let turbines = data.turbines;
                let turbinelist= turbines.split(",");
                turbinelist[0]=turbine.value;
                turbines=turbinelist.join(",");
                data.turbines=turbines;
            }
            else if(this.props.selectedTab==3){
                data.turbine_id=turbine.value;
            }
            else{
                data.turbines=turbine.value;
            }
            dispatch(setTurbineAndCallNextActions({Turbine1:turbine},nextActionCreators,data));
        }

        handleTurbineChange2(turbine){
            const {dispatch} = this.props;
            let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
            nextActionCreators.shift();
            if(this.props.selectedTab==2){
                let turbines = data.turbines;
                let turbinelist= turbines.split(",");
                turbinelist[1   ]=turbine.value;
                turbines=turbinelist.join(",");
                data.turbines=turbines;
            }
            dispatch(setTurbineAndCallNextActions({Turbine2:turbine},nextActionCreators,data,this.props.selectedTab));
        }

        handleDateChangeInitial(initialDate) {
            this.props.dispatch(setDate({initialDate: initialDate, finalDate: this.props.finalDate}))
        }
        handleDateChangeFinal(finalDate) {
            this.props.dispatch(setDate({initialDate: this.props.initialDate, finalDate: finalDate}));
        }
        handleGo(){
            const {dispatch} = this.props;
            let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
            nextActionCreators.shift();
            dispatch(setDateAndCallNextActions(nextActionCreators,data));
        }

    updateDate(start, end, selectedDate){
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        if(this.props.selectedTab !=3){
            data.start_date = start;
            data.end_date = end;
        }
        nextActionCreators.shift();
        this.props.dispatch(setDateAndCallNextActions(nextActionCreators, data, selectedDate));
    }

    setActive(index) {
        const {dispatch} = this.props;
        dispatch(selectTab(index));
    }


    showPopup() {
        this.refs.globalPopup1.showPopup();
    }

    openCreateServiceOrderPopup() {
        document.body.style.overflow = 'hidden';
        let turbine = this.props.selectedAlert.country_name+","+this.props.selectedAlert.farm_name+","+this.props.selectedAlert.turbine_id
        this.props.dispatch(showHidePopup(true,turbine,this.props.selectedAlert.status, true))
    }

    getChart(){
        let {nextActionCreators, data, data1} = this.getNextActionsCreatorsAndData();
            switch(this.props.selectedTab){
                case 0:this.props.dispatch(setAlert(JSON.parse(localStorage.selectedAlert)))
                    break;
                case 1: return(
                        <AnomalyReport
                            user = {ReactCookie.load('user')}
                            dispatch = {this.props.dispatch}
                            selectedTab = {this.props.selectedTab}
                            selectedAlert = {this.props.selectedAlert}
                            initialDate = {this.props.initialDate}
                            finalDate = {this.props.finalDate}
                            scadaInitialDate = {this.props.scadaInitialDate}
                            scadaFinalDate = {this.props.scadaFinalDate}
                            turbineList = {this.props.turbineList}
                            selectedTurbine={this.props.selectedScadaTurbine}
                            selectedTurbine2={this.props.selectedScadaTurbine2}
                            variables={this.props.scadaVariableList}
                            selectedVariable = {this.props.scadaSelectedVariable}
                            loader1 = {this.props.loadingLPFChart}
                            loader2 = {this.props.loadingScadaDataChart}
                            scadaChartData = {this.props.scadaChartData}
                            typeOfChart = {this.props.typeOfChart}
                            lpfChartData = {this.props.lpfChartData}
                            data = {data}
                            data1 = {data1}
                            nextActionCreators = {nextActionCreators}
                            noDataScada = {this.props.noDataScada}
                            scadaSelectedDate = {this.props.scadaSelectedDate}
                        />
                    )
                case 2: return(
                        <IntraFarm
                            showCountry={true}
                            selectedTab = {this.props.selectedTab}
                            nextActionCreators={nextActionCreators}
                            data={data}
                            plot1={this.props.plot1}
                            plot2={this.props.plot2}
                            plot3={this.props.plot3}
                            plot4={this.props.plot4}
                            variables={this.props.variables}
                            selectedVariables={this.props.selectedVariables}
                            selectedTurbine={this.props.selectedTurbine}
                            selectedTurbine2={this.props.selectedTurbine2}
                            loaderStatusIntraChart1={this.props.loaderStatusIntraChart1}
                            loaderStatusIntraChart2={this.props.loaderStatusIntraChart2}
                            loaderStatusIntraChart3={this.props.loaderStatusIntraChart3}
                            loaderStatusIntraChart4={this.props.loaderStatusIntraChart4}
                            initialDate={this.props.initialDate}
                            finalDate={this.props.finalDate}
                            dispatch={this.props.dispatch}
                            mode = {this.props.mode}
                            noDataPlot1 ={this.props.noDataPlot1}
                            noDataPlot2 ={this.props.noDataPlot2}
                            noDataPlot3 ={this.props.noDataPlot3}
                            noDataPlot4 ={this.props.noDataPlot4}
                        />
                    );
                case 3: return(
                        <AlertHistory
                            selectedAlert={this.props.selectedAlert}
                            showCountry={true}
                            selectedTurbine={this.props.selectedTurbine}
                            noData={this.props.noData}
                            finalDate = {this.props.finalDate}
                            historyofAlerts={this.props.historyofAlerts}
                            plot1={this.props.alertsByComponent}
                            plot2={this.props.alertsByMonth}
                            dispatch={this.props.dispatch}
                            mode = {this.props.mode}
                            alertsByCompNoData = {this.props.alertsByCompNoData}
                            alertsByMonthNoData = {this.props.alertsByMonthNoData}
                            loaderStatusAlertByComp = {this.props.loaderStatusAlertByComp}
                            loaderStatusAlertByMonth = {this.props.loaderStatusAlertByMonth}
                            loaderStatusAlertsHistory = {this.props.loaderStatusAlertsHistory}
                        />
                    );
                case 4: return(
                        <PowerCurve
                            selectedAlert={this.props.selectedAlert}
                            showCountry={true}
                            selectedVariables = {this.props.selectedVariables}
                            mode = "alerts"
                            dispatch = {this.props.dispatch}
                            selectedTurbine={this.props.selectedTurbine}
                            initialDate={this.props.initialDate}
                            finalDate={this.props.finalDate}
                            variables = {this.props.scadaVariableList}
                            powerCurveY1 = {this.props.powerCurveY1}
                            powerCurveY2 = {this.props.powerCurveY2}
                            powerCurveY3 = {this.props.powerCurveY3}
                            powerCurveChart2Y1 = {this.props.powerCurveChart2Y1}
                            powerCurveChart2Y2 = {this.props.powerCurveChart2Y2}
                            powerCurveChart2Y3 = {this.props.powerCurveChart2Y3}
                            powerCurve1NoData = {this.props.powerCurve1NoData}
                            powerCurve2NoData = {this.props.powerCurve2NoData}
                            reqData = {data}
                            loader1 = {this.props.powerCurveChartLoading}
                            loader2 = {this.props.powerCurveChart2Loading}
                            powerCurveMode = {this.props.powerCurveMode}
                        />
                    );
                case 5: return(
                        <Availability
                            selectedAlert={this.props.selectedAlert}
                            showCountry={true}
                            selectedTurbine={this.props.selectedTurbine}
                            initialDate={this.props.initialDate}
                            finalDate={this.props.finalDate}
                            dispatch={this.props.dispatch}
                            plot1={this.props.availabilityplot}
                            plot2={this.props.pbaplot}
                            mode = {this.props.mode}
                            loaderStatusTurbineAvail = {this.props.loaderStatusTurbineAvail}
                            noDataAvail = {this.props.noDataAvail}
                            noDataPba = {this.props.noDataPba}
                        />
                    );
                case 6: return(
                        <TurbineKPI />
                    );
            }
        }
    render() {
        var margins = {
            marginBottom: '10px'
        };
        return (
            <div className="" id="alert-graphs">
                <div className="flex-container margin-top flex-sb-h">
                    <div className="flex-container flex-start-h">
                        <div>
                            <Link onClick={() => this.setActive(0)}
                                  to="/monitor/alerts"
                                  className='btn btn-default'><FaArrowBack/>&nbsp;Back</Link>
                        </div>
                        <div>&nbsp;&nbsp;</div>
                        <div className="level-1-tabs tabs-navigation">
                            <div className="btn-group" role="group">
                                <Link onClick={() => this.setActive(1)}
                                      className={classnames('btn', { 'active': this.props.selectedTab == 1})}>Anomaly Report</Link>
                                <Link onClick={() => this.setActive(2)}
                                      className={classnames('btn', { 'active': this.props.selectedTab == 2})}>Intra Farm</Link>
                                <Link onClick={() => this.setActive(3)}
                                      className={classnames('btn', { 'active': this.props.selectedTab == 3})}>Alerts History</Link>
                                <Link onClick={() => this.setActive(5)}
                                      className={classnames('btn', { 'active': this.props.selectedTab == 5})}>Availability</Link>
                                <Link onClick={() => this.setActive(4)}
                                      className={classnames('btn', { 'active': this.props.selectedTab == 4})}>KPIs</Link>
                                </div>
                        </div>
                    </div>
                    <div className="flex-container">
                                <div className="btn-group create-button" role="group">
                                    <button onClick={this.openCreateServiceOrderPopup} className={classnames("btn btn-sm margin-right-small" ,{'btn-success': this.props.selectedAlert.status !== 2,'label-default': this.props.selectedAlert.status === 2})}>
                                        <FaPlus style={{fontSize: '15px',color : "white"}}/>&nbsp;&nbsp;<span style={{color : "white"}}>Create Service Order</span></button>
                                </div>

                    </div>
                </div>
                <div className="top-buffer-2">
                    <div className="font-12">
                        <div className = "font-12 flex-container-nowrap flex-sb-h">
                            <div style={{position:'relative'}} className="">
                                {this.props.selectedTab === 4 && <Select
                                     style={{width:'150px'}}
                                     name="form-field-name"
                                     value={this.props.powerCurveMode}
                                     options={[{label: "Torque RPM Curve", value: '1'},{label: "Power Curve", value: '2'}]}
                                     onChange={this.handleModeChange}
                                     clearable={false}
                                     autosize={true}
                                 />}
                             </div>
                            <div className="flex-container">
                                {this.props.selectedTab === 3 && <div className="flex-container-nowrap">&nbsp;&nbsp;Farm&nbsp;&nbsp;
                                <Select
                                    style={{width:'150px',height:'25px'}}
                                    name="form-field-name"
                                    value={this.props.selectedFarm}
                                    options={this.props.farmsList}
                                    onChange={this.handleFarmChange}
                                    clearable={false}
                                /></div>}
                                {(this.props.selectedTab === 3 || this.props.selectedTab === 2) && <div className="flex-container"><div>&nbsp;&nbsp;Turbine&nbsp;&nbsp;</div>
                                <Select
                                    style={{width:'150px',height:'25px'}}
                                    name="form-field-name"
                                    value={this.props.selectedTurbine}
                                    options={this.props.turbineList}
                                    onChange={this.handleTurbineChange}
                                    clearable={false}
                                /></div>}
                               {this.props.selectedTab === 2 && <div className="flex-container"><div>&nbsp;compared to&nbsp;</div>
                                <Select
                                    style={{width:'150px',height:'25px'}}
                                    name="form-field-name"
                                    value={this.props.selectedTurbine2}
                                    options={this.props.turbineList}
                                    onChange={this.handleTurbineChange2}
                                    clearable={false}
                                /></div>}


                                {this.props.selectedTab !== 3 && this.props.selectedTab !== 0 && <CustomDatePicker ref = {(datePick) => { this.customDatePicker = datePick}}
                                                  dateChange={this.updateDate}
                                                  startOnChange={this.handleDateChangeInitial}
                                                  endOnChange={this.handleDateChangeFinal}
                                                  initialDate={this.props.initialDate}
                                                  finalDate={this.props.finalDate}
                                                  reloadGraphs={this.handleGo}
                                                  defaultValue= {this.props.selectedDate}
                                    offsetDate={moment(this.props.selectedAlert.date_identified).format('YYYY-MM-DD')}
                                />}
                            </div>
                        </div>
                    </div>
                    {this.getChart()}
                </div>
                <CommentBox/>
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { AlertsDetailsData } = state
    let selectedTab = AlertsDetailsData.get('selectedTab');
    let selectedCountry = AlertsDetailsData.get('selectedCountry');
    let countriesList = AlertsDetailsData.get('countriesList');
    let farmsList = AlertsDetailsData.get('farmsList');
    let selectedFarm = AlertsDetailsData.get('selectedFarm');
    let selectedTurbine=AlertsDetailsData.get('selectedTurbine');
    let selectedTurbine2=AlertsDetailsData.get('selectedTurbine2');
    let turbineList=AlertsDetailsData.get('turbineList');
    let categories = AlertsDetailsData.get('categories');
    let variables = AlertsDetailsData.get('variables');
    let mode = AlertsDetailsData.get('mode');
    let powerCurveMode = AlertsDetailsData.get('powerCurveMode');
    let selectedDate = AlertsDetailsData.get('selectedDate');
    let loadingScadaDataChart = AlertsDetailsData.get('loadingScadaDataChart');
    let loadingLPFChart = AlertsDetailsData.get('loadingLPFChart');
    let selectedScadaTurbine = AlertsDetailsData.get('selectedScadaTurbine');
    let selectedScadaTurbine2 = AlertsDetailsData.get('selectedScadaTurbine2');
    let scadaVariableList = AlertsDetailsData.get('scadaVariableList');
    let scadaChartData = {
        x1: AlertsDetailsData.get('scadaDatax1'),
        y1: AlertsDetailsData.get('scadaDatay1'),
        x2: AlertsDetailsData.get('scadaDatax2'),
        y2: AlertsDetailsData.get('scadaDatay2')
    }
    let lpfChartData = {
        x1: AlertsDetailsData.get('lpfDataX'),
        x2: AlertsDetailsData.get('lpfDataX'),
        y1: AlertsDetailsData.get('lpfDataY'),
        y2: AlertsDetailsData.get('lpfDataY2'),
        markX: AlertsDetailsData.get('markX'),
        markY: AlertsDetailsData.get('markY')
    }
    let selectedVariables = {
        selectedVariable1: AlertsDetailsData.get('selectedVariable1'),
        selectedVariable2: AlertsDetailsData.get('selectedVariable2'),
        selectedVariable3: AlertsDetailsData.get('selectedVariable3'),
        selectedVariable4: AlertsDetailsData.get('selectedVariable4'),
        selectedVariable5: AlertsDetailsData.get('selectedVariable5'),
        selectedVariable6: AlertsDetailsData.get('selectedVariable6'),
    }
    let plot1={
        plot1X1 : AlertsDetailsData.get('plot1X1'),
        plot1Y1 : AlertsDetailsData.get('plot1Y1'),
        plot1X2 : AlertsDetailsData.get('plot1X2'),
        plot1Y2 : AlertsDetailsData.get('plot1Y2'),
    }

    let plot2={
        plot2X1 : AlertsDetailsData.get('plot2X1'),
        plot2Y1 : AlertsDetailsData.get('plot2Y1'),
        plot2X2 : AlertsDetailsData.get('plot2X2'),
        plot2Y2 : AlertsDetailsData.get('plot2Y2') ,
    }

    let plot3={
        plot3X1 : AlertsDetailsData.get('plot3X1'),
        plot3Y1 : AlertsDetailsData.get('plot3Y1'),
        plot3X2 : AlertsDetailsData.get('plot3X2'),
        plot3Y2 : AlertsDetailsData.get('plot3Y2'),
    }

    let plot4={
        plot4X1 : AlertsDetailsData.get('plot4X1'),
        plot4Y1 : AlertsDetailsData.get('plot4Y1'),
        plot4X2 : AlertsDetailsData.get('plot4X2'),
        plot4Y2 : AlertsDetailsData.get('plot4Y2') ,
    }
    let initialDate = AlertsDetailsData.get('initialDate');
    let finalDate=AlertsDetailsData.get('finalDate');
    let selectedAlert = AlertsDetailsData.get('selectedAlert');
    let historyofAlerts = AlertsDetailsData.get('historyofAlerts');
    let noData = AlertsDetailsData.get('noData');
    let alertsByComponent={ x:AlertsDetailsData.get('alertsByComponentX'),
                            y:AlertsDetailsData.get('alertsByComponentY')
                          };
    let alertsByMonth={ x:AlertsDetailsData.get('alertsByMonthX'),
                        y:AlertsDetailsData.get('alertsByMonthY')
                      }
    let availabilityplot={
        x:AlertsDetailsData.get('availabilityX'),
        y:AlertsDetailsData.get('availabilityY')
    };
    let pbaplot={
        x:AlertsDetailsData.get('pbaX'),
        y:AlertsDetailsData.get('pbaY')
    }
    let powerCurveY1 = AlertsDetailsData.get('powerCurveY1');
    let powerCurveY2 = AlertsDetailsData.get('powerCurveY2');
    let powerCurveY3 = AlertsDetailsData.get('powerCurveY3');
    let powerCurveChart2Y1 = AlertsDetailsData.get('powerCurveChart2Y1');
    let powerCurveChart2Y2 = AlertsDetailsData.get('powerCurveChart2Y2');
    let powerCurveChart2Y3 = AlertsDetailsData.get('powerCurveChart2Y3');
    let powerCurveChartLoading = AlertsDetailsData.get('loadingTurbinePowerCurve');
    let powerCurveChart2Loading = AlertsDetailsData.get('loadingTurbinePowerCurveChart2');
    let scadaSelectedVariable = AlertsDetailsData.get('scadaSelectedVariable');
    let typeOfChart = AlertsDetailsData.get('type_of_chart');
    let scadaInitialDate = AlertsDetailsData.get('scadaInitialDate')
    let scadaFinalDate = AlertsDetailsData.get('scadaFinalDate')
    let loaderStatusIntraChart1 = AlertsDetailsData.get('loaderStatusIntraChart1')
    let loaderStatusIntraChart2 = AlertsDetailsData.get('loaderStatusIntraChart2')
    let loaderStatusIntraChart3 = AlertsDetailsData.get('loaderStatusIntraChart3')
    let loaderStatusIntraChart4 = AlertsDetailsData.get('loaderStatusIntraChart4')
    let loaderStatusTurbineAvail = AlertsDetailsData.get('loaderStatusTurbineAvail')
    let noDataAvail = AlertsDetailsData.get('noDataAvail');
    let noDataPba = AlertsDetailsData.get('noDataPba');
    let alertsByCompNoData = AlertsDetailsData.get('alertsByCompNoData');
    let alertsByMonthNoData = AlertsDetailsData.get('alertsByMonthNoData');
    let loaderStatusAlertByComp = AlertsDetailsData.get('loaderStatusAlertByComp');
    let loaderStatusAlertByMonth =  AlertsDetailsData.get('loaderStatusAlertByMonth');
    let powerCurve1NoData = AlertsDetailsData.get('powerCurve1NoData');
    let powerCurve2NoData = AlertsDetailsData.get('powerCurve2NoData');
    let noDataPlot1 = AlertsDetailsData.get('noDataPlot1');
    let noDataPlot2 = AlertsDetailsData.get('noDataPlot2');
    let noDataPlot3 = AlertsDetailsData.get('noDataPlot3');
    let noDataPlot4 = AlertsDetailsData.get('noDataPlot4');
    let loaderStatusAlertsHistory = AlertsDetailsData.get('loaderStatusAlertsHistory');
    let noDataScada = AlertsDetailsData.get('noDataScada');
    let scadaSelectedDate = AlertsDetailsData.get('scadaSelectedDate');
    return {
        typeOfChart,
        loadingScadaDataChart,
        loadingLPFChart,
        scadaFinalDate,
        scadaInitialDate,
        scadaSelectedVariable,
        scadaChartData,
        selectedScadaTurbine,
        selectedScadaTurbine2,
        scadaVariableList,
        lpfChartData,
        selectedTab,
        selectedCountry,
        selectedDate,
        countriesList,
        farmsList,
        selectedFarm,
        turbineList,
        selectedTurbine,
        selectedTurbine2,categories,
        variables,
        plot1,
        plot2,
        plot3,
        plot4,
        selectedVariables,
        initialDate,
        finalDate,
        selectedAlert,
        historyofAlerts,
        noData,
        alertsByComponent,
        alertsByMonth,
        availabilityplot,
        pbaplot,
        mode,
        powerCurveY1,
        powerCurveY2,
        powerCurveY3,
        powerCurveChart2Y1,
        powerCurveChart2Y2,
        powerCurveChart2Y3,
        powerCurveMode,
        powerCurveChartLoading,
        powerCurveChart2Loading,
        loaderStatusIntraChart1,
        loaderStatusIntraChart2,
        loaderStatusIntraChart3,
        loaderStatusIntraChart4,
        loaderStatusTurbineAvail,
        noDataAvail,
        noDataPba,
        loaderStatusAlertByComp,
        loaderStatusAlertByMonth,
        alertsByMonthNoData,
        alertsByCompNoData,
        powerCurve1NoData,
        powerCurve2NoData,
        noDataPlot1,
        noDataPlot2,
        noDataPlot3,
        noDataPlot4,
        loaderStatusAlertsHistory,
        noDataScada,
        scadaSelectedDate
    }
}
export default connect(mapStateToProps)(AlertsDetailsAlerts);
