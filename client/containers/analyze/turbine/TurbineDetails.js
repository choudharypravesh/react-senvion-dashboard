// App.js
import React from 'react';
import '../../../../public/styles/containers/analyze/turbine/turbine.css'
import 'react-dates/lib/css/_datepicker.css';
import {Link} from 'react-router';
import FaPlus from 'react-icons/lib/fa/plus-circle';
import FaArrowBack from 'react-icons/lib/fa/arrow-left'
import classnames from 'classnames'
import FaArrowRight from 'react-icons/lib/fa/arrow-right'
import AlertHistory from '../../monitor/alerts/subcomponents/AlertsHistory';
import Availability from '../../monitor/alerts/subcomponents/Availability'
import IntraFarm from '../../monitor/alerts/subcomponents/IntraFarm'
import PowerCurve from '../../monitor/alerts/subcomponents/PowerCurve'
import TurbineKPI from '../../monitor/alerts/subcomponents/TurbineKPI'
import Select  from 'react-virtualized-select'
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import ReactCookie from 'react-cookie';


import { connect } from 'react-redux'
import { setDate, selectTab, getCountriesList, changeCountryAndGetFarms, selectFarm, getTurbinesList} from './TurbineActions'
import { selectFarmAndCallNextAction,
         setTurbineAndCallNextActions,
         setDateAndCallNextActions,
         getIntraFarmDataForAllCharts,
         getVariables,getIntraFarmData,
         getTurbineScadaDetails,
         changeModeAndGetScadaTurbineData} from './TurbineActions'
import {getAlertsByComponentTurbine,getTurbineAvailabilityData} from './TurbineActions';
class TurbineDetails extends React.Component {
    constructor(props) {
        super(props)
        this.setSelectedTab = this.setSelectedTab.bind(this);
        this.openCreateServiceOrderPopup = this.openCreateServiceOrderPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.getSelectedTab = this.getSelectedTab.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleFarmChange = this.handleFarmChange.bind(this);
        this.handleTurbineChange = this.handleTurbineChange.bind(this);
        this.handleTurbineChange2 = this.handleTurbineChange2.bind(this);
        this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this)
        this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this)
        this.handleGo = this.handleGo.bind(this)
        this.updateDate = this.updateDate.bind(this);
        this.getNextActionsCreatorsAndData = this.getNextActionsCreatorsAndData.bind(this)
        this.handleModeChange = this.handleModeChange.bind(this)
        this.setSelectedTab(1)
    }


    componentWillMount(){
        const {dispatch} = this.props;
        let nextActionCreators=[getTurbinesList]
        dispatch(getCountriesList(nextActionCreators));
    }

    getNextActionsCreatorsAndData(){
        switch(this.props.selectedTab) {
            case 1: {
                let data = {
                    variable: this.props.selectedVariables,
                    start_date: this.props.initialDate,
                    end_date: this.props.finalDate,
                    turbines: this.props.selectedTurbine + "," + this.props.selectedTurbine2,
                    type: 2,
                    user_id: ReactCookie.load('user')
                };
                let nextActionCreators = [getTurbinesList, getIntraFarmDataForAllCharts];
                return {nextActionCreators, data}
            }
            case 2: {
                let data = {
                    date_identified: this.props.finalDate,
                    turbine_id: this.props.selectedTurbine
                }
                let nextActionCreators = [getTurbinesList, getAlertsByComponentTurbine]
                return {nextActionCreators, data}
            }
            case 3: {
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
            case 4: {
                let data = {
                    turbines: this.props.selectedTurbine,
                    start_date: this.props.initialDate,
                    end_date: this.props.finalDate,
                    id: 0
                }
                let nextActionCreators = [getTurbinesList, getTurbineAvailabilityData]
                return {nextActionCreators, data}
            }
        }

    }

    setSelectedTab(id) {
        let self = this;
        const {dispatch} = this.props;
        dispatch(selectTab(id));
    }

    handleCountryChange(country){
        const {dispatch, countriesList} = this.props;
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        dispatch(changeCountryAndGetFarms(country.value,nextActionCreators,data));
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
        if(this.props.selectedTab==1){
            let turbines = data.turbines;
            let turbinelist= turbines.split(",");
            turbinelist[0]=turbine.value;
            turbines=turbinelist.join(",");
            data.turbines=turbines;
        }
        else if (this.props.selectedTab==2){
            data.turbine_id=turbine.value;
        }
        else {
            data.turbines=turbine.value
        }

        dispatch(setTurbineAndCallNextActions({Turbine1:turbine},nextActionCreators,data));
    }

    handleTurbineChange2(turbine){
        const {dispatch} = this.props;
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        nextActionCreators.shift();
        if(this.props.selectedTab==1){
            let turbines = data.turbines;
            let turbinelist= turbines.split(",");
            turbinelist[1]=turbine.value;
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

    updateDate(start, end, selectedDate) {
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        data.start_date = start;
        data.end_date = end;
        nextActionCreators.shift();
        this.props.dispatch(setDateAndCallNextActions(nextActionCreators, data, selectedDate));
    }

    handleModeChange(mode){//mode 2: power curve , mode 1: torque rpm curve
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();

        this.props.dispatch(changeModeAndGetScadaTurbineData(mode.value,data))
    }

    openCreateServiceOrderPopup() {
        this.setState({showPopup: true});
    }


    closePopup(e) {
        this.setState({showPopup: false});
    }


    getSelectedTab(){
        switch(this.props.selectedTab){
            case 1:
                let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
                return(
                    <IntraFarm
                    //    selectedAlert={this.state.selectedAlert}
                        showCountry={true}
                        nextActionCreators={nextActionCreators}
                        data={data}
                        plot1={this.props.plot1}
                        plot2={this.props.plot2}
                        plot3={this.props.plot3}
                        plot4={this.props.plot4}
                        variables={this.props.variables}
                        loaderStatusIntraChart1={this.props.loaderStatusIntraChart1}
                        loaderStatusIntraChart2={this.props.loaderStatusIntraChart2}
                        loaderStatusIntraChart3={this.props.loaderStatusIntraChart3}
                        loaderStatusIntraChart4={this.props.loaderStatusIntraChart4}
                        selectedVariables={this.props.selectedVariables}
                        selectedTurbine={this.props.selectedTurbine}
                        selectedTurbine2={this.props.selectedTurbine2}
                        initialDate={this.props.initialDate}
                        finalDate={this.props.finalDate}
                        dispatch={this.props.dispatch}
                        noDataPlot1 ={this.props.noDataPlot1}
                        noDataPlot2 ={this.props.noDataPlot2}
                        noDataPlot3 ={this.props.noDataPlot3}
                        noDataPlot4 ={this.props.noDataPlot4}
                    />
                );
            case 2:
                return(
                    <AlertHistory
                        selectedAlert={this.props.selectedAlert}
                        showCountry={true}
                        finalDate={this.props.finalDate}
                        selectedTurbine={this.props.selectedTurbine}
                        noData={this.props.noData}
                        historyofAlerts={this.props.historyofAlerts}
                        plot1={this.props.alertsByComponent}
                        plot2={this.props.alertsByMonth}
                        dispatch={this.props.dispatch}
                        alertsByCompNoData = {this.props.alertsByCompNoData}
                        alertsByMonthNoData = {this.props.alertsByMonthNoData}
                        loaderStatusAlertByComp = {this.props.loaderStatusAlertByComp}
                        loaderStatusAlertByMonth = {this.props.loaderStatusAlertByMonth}
                        loaderStatusAlertsHistory = {this.props.loaderStatusAlertsHistory}
                    />
                );
            case 3:
                  let reqData = this.getNextActionsCreatorsAndData().data
                  return(
                    <PowerCurve
                        selectedAlert={this.props.selectedAlert}
                        showCountry={true}
                        selectedVariables = {this.props.selectedVariables}
                        mode = "turbine"
                        dispatch = {this.props.dispatch}
                        selectedTurbine={this.props.selectedTurbine}
                        initialDate={this.props.initialDate}
                        finalDate={this.props.finalDate}
                        variables = {this.props.variables}
                        powerCurveY1 = {this.props.powerCurveY1}
                        powerCurveY2 = {this.props.powerCurveY2}
                        powerCurveY3 = {this.props.powerCurveY3}
                        powerCurveChart2Y1 = {this.props.powerCurveChart2Y1}
                        powerCurveChart2Y2 = {this.props.powerCurveChart2Y2}
                        powerCurveChart2Y3 = {this.props.powerCurveChart2Y3}
                        powerCurve1NoData = {this.props.powerCurve1NoData}
                        powerCurve2NoData = {this.props.powerCurve2NoData}
                        reqData = {reqData}
                        loader1 = {this.props.powerCurveChartLoading}
                        loader2 = {this.props.powerCurveChart2Loading}
                        powerCurveMode = {this.props.powerCurveMode}
                    />
                );
            case 4: return(
                    <Availability
                        selectedAlert={this.props.selectedAlert}
                        showCountry={true}
                        selectedTurbine={this.props.selectedTurbine}
                        initialDate={this.props.initialDate}
                        finalDate={this.props.finalDate}
                        dispatch={this.props.dispatch}
                        plot1={this.props.availabilityplot}
                        plot2={this.props.pbaplot}
                        loaderStatusTurbineAvail={this.props.loaderStatusTurbineAvail}
                        noDataAvail = {this.props.noDataAvail}
                        noDataPba = {this.props.noDataPba}
                    />
                );
        }
    }

    render() {
        var margins = {
            marginBottom: '10px'
        }

        return (
            <div className="turbine-container" id="alert-graphs">
                <div className="flex-container margin-top flex-sb-h">
                    <div className="flex-container flex-start-h">
                        <div className="level-1-tabs tabs-navigation">
                            <div className="btn-group" role="group">
                                <Link onClick={() => this.setSelectedTab(1)}
                                      className={classnames('btn', { 'active': this.props.selectedTab == 1})} >Intra Farm</Link>
                                <Link onClick={() => this.setSelectedTab(2)}
                                      className={classnames('btn', { 'active': this.props.selectedTab == 2})}>Alerts History</Link>
                                <Link onClick={() => this.setSelectedTab(4)}
                                      className={classnames('btn', { 'active': this.props.selectedTab == 4})}>Availability</Link>
                                <Link onClick={() => this.setSelectedTab(3)}
                                      className={classnames('btn', { 'active': this.props.selectedTab == 3})}>KPIs</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="alerts-graphs-container">
                    <div className="" id="analyze-anomalies">
                        <div className="font-12">
                            <div className="font-12 flex-container-nowrap flex-sb-h">
                                <div style={{position:'relative'}} className="type-dropdown">
                                    {this.props.selectedTab === 3 && <Select
                                         name="form-field-name"
                                         value={this.props.powerCurveMode}
                                         options={[{label: "Torque RPM Curve", value: '1'},{label: "Power Curve", value: '2'}]}
                                         onChange={this.handleModeChange}
                                         clearable={false}
                                         autosize={true}
                                     />}
                                 </div>
                                <div className="flex-container-nowrap">
                                    <div className="flex-container-nowrap farm-country">
                                        <div>Country&nbsp;&nbsp;</div>
                                        <Select
                                            name="form-field-name"
                                            value={this.props.selectedCountry}
                                            options={this.props.countriesList}
                                            onChange={this.handleCountryChange}
                                            clearable={false}
                                            autosize={true}
                                        />
                                        <div>&nbsp;&nbsp;Farm&nbsp;&nbsp;</div>
                                        <Select
                                            name="form-field-name"
                                            value={this.props.selectedFarm}
                                            options={this.props.farmsList}
                                            onChange={this.handleFarmChange}
                                            clearable={false}
                                        />
                                    </div>
                                    <span></span>
                                    &nbsp;&nbsp;Turbine&nbsp;&nbsp;
                                    <Select
                                        name="form-field-name"
                                        value={this.props.selectedTurbine}
                                        options={this.props.turbineList}
                                        onChange={this.handleTurbineChange}
                                        clearable={false}
                                    />
                                    {(this.props.selectedTab==1)?<span>&nbsp;compared to&nbsp;</span>:""}
                                    {(this.props.selectedTab==1)?

                                            <Select
                                                name="form-field-name"
                                                value={this.props.selectedTurbine2}
                                                options={this.props.turbineList}
                                                onChange={this.handleTurbineChange2}
                                                clearable={false}
                                            />
                                        :
                                        ""}

                                    <CustomDatePicker ref = {(datePick) => { this.customDatePicker = datePick}}
                                                      dateChange={this.updateDate}
                                                      startOnChange={this.handleDateChangeInitial}
                                                      endOnChange={this.handleDateChangeFinal}
                                                      initialDate={this.props.initialDate}
                                                      finalDate={this.props.finalDate}
                                                      reloadGraphs={this.handleGo}
                                                      defaultValue= {this.props.selectedDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {this.getSelectedTab()
                     }
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { Turbine } = state
    let selectedTab = Turbine.get('selectedTab');
    let powerCurveMode = Turbine.get('powerCurveMode');
    let selectedCountry = Turbine.get('selectedCountry');
    let countriesList = Turbine.get('countriesList');
    let farmsList = Turbine.get('farmsList');
    let selectedFarm = Turbine.get('selectedFarm');
    let selectedTurbine=Turbine.get('selectedTurbine');
    let selectedTurbine2=Turbine.get('selectedTurbine2');
    let turbineList=Turbine.get('turbineList');
    let categories = Turbine.get('categories');
    let variables = Turbine.get('variables');
    let selectedVariables = {
        selectedVariable1: Turbine.get('selectedVariable1'),
        selectedVariable2: Turbine.get('selectedVariable2'),
        selectedVariable3: Turbine.get('selectedVariable3'),
        selectedVariable4: Turbine.get('selectedVariable4'),
        selectedVariable5: Turbine.get('selectedVariable5'),
        selectedVariable6: Turbine.get('selectedVariable6'),
    }
    let plot1={
        plot1X1 : Turbine.get('plot1X1'),
        plot1Y1 : Turbine.get('plot1Y1'),
        plot1X2 : Turbine.get('plot1X2'),
        plot1Y2 : Turbine.get('plot1Y2'),
    }

    let plot2={
        plot2X1 : Turbine.get('plot2X1'),
        plot2Y1 : Turbine.get('plot2Y1'),
        plot2X2 : Turbine.get('plot2X2'),
        plot2Y2 : Turbine.get('plot2Y2'),
    }

    let plot3={
        plot3X1 : Turbine.get('plot3X1'),
        plot3Y1 : Turbine.get('plot3Y1'),
        plot3X2 : Turbine.get('plot3X2'),
        plot3Y2 : Turbine.get('plot3Y2'),
    }

    let plot4={
        plot4X1 : Turbine.get('plot4X1'),
        plot4Y1 : Turbine.get('plot4Y1'),
        plot4X2 : Turbine.get('plot4X2'),
        plot4Y2 : Turbine.get('plot4Y2') ,
    }
    let initialDate = Turbine.get('initialDate');
    let finalDate=Turbine.get('finalDate');
    let selectedDate = Turbine.get('selectedDate');
    let selectedAlert = Turbine.get('selectedAlert');
    let historyofAlerts = Turbine.get('historyofAlerts');
    let noData = Turbine.get('noData');
    let alertsByComponent={x:Turbine.get('alertsByComponentX'),y:Turbine.get('alertsByComponentY')};
    let alertsByMonth={x:Turbine.get('alertsByMonthX'),y:Turbine.get('alertsByMonthY')}
    let availabilityplot={
        x:Turbine.get('availabilityX'),
        y:Turbine.get('availabilityY')
    };
    let pbaplot={
        x:Turbine.get('pbaX'),
        y:Turbine.get('pbaY')
    }
    let loaderStatusIntraChart1 = Turbine.get('loaderStatusIntraChart1')
    let loaderStatusIntraChart2 = Turbine.get('loaderStatusIntraChart2')
    let loaderStatusIntraChart3 = Turbine.get('loaderStatusIntraChart3')
    let loaderStatusIntraChart4 = Turbine.get('loaderStatusIntraChart4')
    let loaderStatusTurbineAvail = Turbine.get('loaderStatusTurbineAvail')
    let powerCurveY1 = Turbine.get('powerCurveY1');
    let powerCurveY2 = Turbine.get('powerCurveY2');
    let powerCurveY3 = Turbine.get('powerCurveY3');
    let powerCurveChart2Y1 = Turbine.get('powerCurveChart2Y1');
    let powerCurveChart2Y2 = Turbine.get('powerCurveChart2Y2');
    let powerCurveChart2Y3 = Turbine.get('powerCurveChart2Y3');
    let powerCurveChartLoading = Turbine.get('loadingTurbinePowerCurve');
    let powerCurveChart2Loading = Turbine.get('loadingTurbinePowerCurveChart2');
    let noDataPlot1 = Turbine.get('noDataPlot1');
    let noDataPlot2 = Turbine.get('noDataPlot2');
    let noDataPlot3 = Turbine.get('noDataPlot3');
    let noDataPlot4 = Turbine.get('noDataPlot4');
    let alertsByCompNoData = Turbine.get('alertsByCompNoData');
    let alertsByMonthNoData = Turbine.get('alertsByMonthNoData');
    let noDataAvail = Turbine.get('noDataAvail');
    let noDataPba = Turbine.get('noDataPba');
    let loaderStatusAlertByComp = Turbine.get('loaderStatusAlertByComp');
    let loaderStatusAlertByMonth =  Turbine.get('loaderStatusAlertByMonth');
    let powerCurve1NoData = Turbine.get('powerCurve1NoData');
    let powerCurve2NoData = Turbine.get('powerCurve2NoData');
    let loaderStatusAlertsHistory  =Turbine.get('loaderStatusAlertsHistory');
    return {
        selectedTab,
        selectedCountry,
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
        selectedDate,
        selectedAlert,
        historyofAlerts,
        noData,
        alertsByComponent,
        alertsByMonth,
        availabilityplot,
        pbaplot,
        loaderStatusIntraChart1,
        loaderStatusIntraChart2,
        loaderStatusIntraChart3,
        loaderStatusIntraChart4,
        loaderStatusTurbineAvail,
        powerCurveY1,
        powerCurveY2,
        powerCurveY3,
        powerCurveChart2Y1,
        powerCurveChart2Y2,
        powerCurveChart2Y3,
        powerCurveMode,
        powerCurveChartLoading,
        powerCurveChart2Loading,
        noDataPlot1,
        noDataPlot2,
        noDataPlot3,
        noDataPlot4,
        alertsByMonthNoData,
        alertsByCompNoData,
        noDataAvail,
        noDataPba,
        loaderStatusAlertByComp,
        loaderStatusAlertByMonth,
        powerCurve1NoData,
        powerCurve2NoData,
        loaderStatusAlertsHistory
    }
}
export default connect(mapStateToProps)(TurbineDetails);

