// App.js
import React from 'react';
import xhr from 'xhr';
import { FormGroup } from 'react-bootstrap';
import AlertCss from '../../../../../public/styles/containers/analyze/Alerts.css'
import Anamoly from '../../../technician/analyze/anomalies/AnalyzeAnamolies'
import DatePicker from 'react-bootstrap-date-picker';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import {Link} from 'react-router';
import FaPlus from 'react-icons/lib/fa/plus-circle';
import axios from 'axios'
import _ from 'underscore'
import ReactCookie from 'react-cookie';
import CustomDatePicker from '../../../../components/CustomDatePicker/CustomDatePicker';
import { connect } from 'react-redux'
import AppConstants from "../../../../constants/AppConstants"

import Chart from '../../../../components/PlotlyChart/skeleton'
import {changeVariablesAndGetIntraFarmsData, getVariablesAndCallIntraFarmsData, getIntraFarmData} from  '../../../analyze/turbine/TurbineActions'
import {getTurbinesOfSameFarms,changeVariablesAndGetIntraFarmsDataOfAlerts} from '../AlertsDetailsActions'


class IntraFarm extends React.Component {
    constructor(props) {
        super(props)
        let selectedAlert = this.props.selectedAlert ? this.props.selectedAlert : localStorage.selectedAlert ? JSON.parse(localStorage.selectedAlert) : "90983";
        this.openCreateServiceOrderPopup = this.openCreateServiceOrderPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        //this.getFarmLevelData = this.getFarmLevelData.bind(this);
        this.logChange1 = this.logChange1.bind(this);
        this.logChange2 = this.logChange2.bind(this);
        this.logChange3 = this.logChange3.bind(this);
        this.logChange4 = this.logChange4.bind(this);
        this.getGraphData=this.getGraphData.bind(this);

    }


    componentDidMount() {
        var self = this;
        //this.getFarmLevelData();
        // if(this.props.showCountry){
        //     this.getCountry();
        // }
        let data = self.getGraphData();

        if(this.props.mode === 'alerts'){
            this.props.dispatch(getTurbinesOfSameFarms(this.props.selectedTurbine, this.props.selectedTab, data))
        }else{
            self.props.dispatch(getVariablesAndCallIntraFarmsData(data, [getIntraFarmData], 4))
        }
    };


    componentWillUnmount(){
        if(this.props.mode === 'alerts') {
            this.props.dispatch({type:AppConstants.ALERTS_LOADING_INTRA_CHART1,
                payload:{loaderStatus:true}})
            this.props.dispatch({type:AppConstants.ALERTS_LOADING_INTRA_CHART2,
                payload:{loaderStatus:true}})
            this.props.dispatch({type:AppConstants.ALERTS_LOADING_INTRA_CHART3,
                payload:{loaderStatus:true}})
            this.props.dispatch({type:AppConstants.ALERTS_LOADING_INTRA_CHART4,
                payload:{loaderStatus:true}})
        }else {
            this.props.dispatch({
                type: AppConstants.LOADING_INTRA_CHART1,
                payload: {loaderStatus: true}
            })
            this.props.dispatch({
                type: AppConstants.LOADING_INTRA_CHART2,
                payload: {loaderStatus: true}
            })
            this.props.dispatch({
                type: AppConstants.LOADING_INTRA_CHART3,
                payload: {loaderStatus: true}
            })
            this.props.dispatch({
                type: AppConstants.LOADING_INTRA_CHART4,
                payload: {loaderStatus: true}
            })
        }
    }

    getGraphData() {
        var self = this;
        let turbine2 =self.props.selectedTurbine2 && self.props.selectedTurbine2? ","+self.props.selectedTurbine2:"";
        var data = {
            variable: self.props.selectedVariable,
            start_date: self.props.initialDate,
            end_date: self.props.finalDate,
            turbines: self.props.selectedTurbine+turbine2,
            type: 2,
            user_id: ReactCookie.load('user')
        }
        return data;
    }

    logChange1(val) {
        let data = this.getGraphData();
        data.variable = val;
        if (this.props.mode === 'alerts') {
            this.props.dispatch(changeVariablesAndGetIntraFarmsDataOfAlerts(data,1))
        } else {
        this.props.dispatch(changeVariablesAndGetIntraFarmsData(data, 1))
    }
    }

    logChange2(val) {
        let data = this.getGraphData();
        data.variable=val;
        if (this.props.mode === 'alerts') {
            this.props.dispatch(changeVariablesAndGetIntraFarmsDataOfAlerts(data,2))
        } else {
            this.props.dispatch(changeVariablesAndGetIntraFarmsData(data, 2))
        }
    }

    logChange3(val) {
        let data = this.getGraphData();
        data.variable=val;
        if (this.props.mode === 'alerts') {
            this.props.dispatch(changeVariablesAndGetIntraFarmsDataOfAlerts(data,3))
        } else {
            this.props.dispatch(changeVariablesAndGetIntraFarmsData(data, 3))
        }
    }

    logChange4(val) {
        let data = this.getGraphData();
        data.variable=val;
        if (this.props.mode === 'alerts') {
            this.props.dispatch(changeVariablesAndGetIntraFarmsDataOfAlerts(data,4))
        } else {
            this.props.dispatch(changeVariablesAndGetIntraFarmsData(data, 4))
        }
    }




    openCreateServiceOrderPopup() {
        this.setState({showPopup: true})
    }

    closePopup(e) {
        this.setState({showPopup: false})
    }






    render() {
        var margins = {
            marginBottom: '10px'
        };

        return (
            <div className="alerts-graphs-container">
                <div>
                    <div className="font-12 wrapper charts-wrapper">
                        <div className="" id="analyze-anomalies">
                            <div className="flex-container-nowrap flex-sb-h top-buffer-2">
                                <div className="charts-container" style={margins}>
                                    <div className="graph-heading flex-container flex-sb-h">
                                        <div>
                                            <Select
                                                name="form-field-name1"
                                                value={this.props.selectedVariables.selectedVariable1}
                                                options={this.props.variables}
                                                onChange={this.logChange1}
                                                clearable={false}
                                            />
                                        </div>
                                        <div></div>
                                    </div>
                                    <Chart ref="plot1Component"
                                           x1= {this.props.plot1.plot1X1}
                                           y1= {this.props.plot1.plot1Y1}
                                           x2= {this.props.plot1.plot1X2}
                                           y2= {this.props.plot1.plot1Y2}
                                           margins={{t: 0, r: 60, l: 60, b:0}}
                                           name= 'plot1'
                                           loader = {this.props.loaderStatusIntraChart1}
                                           decription = "this is decription"
                                           initialDate= {this.props.initialDate}
                                           finalDate= {this.props.finalDate}
                                            noData = {this.props.noDataPlot1}
                                           type="scatter"
                                           name1={this.props.selectedTurbine}
                                           name2={this.props.selectedTurbine2}
                                           width={window.innerWidth/2.2}
                                           height={window.innerHeight/4}
                                           saveChart={true}
                                    />
                                </div>
                                <div className="charts-container"  style={margins}>
                                    <div className="graph-heading flex-container flex-sb-h">
                                        <div>
                                            <Select
                                                name="form-field-name2"
                                                value={this.props.selectedVariables.selectedVariable2}
                                                options={this.props.variables}
                                                onChange={this.logChange2}
                                                clearable={false}
                                            />
                                        </div>
                                        <div></div>
                                    </div>
                                    <Chart ref="plot2Component"
                                           x1= {this.props.plot2.plot2X1}
                                           y1= {this.props.plot2.plot2Y1}
                                           x2= {this.props.plot2.plot2X2}
                                           y2= {this.props.plot2.plot2Y2}
                                           margins={{t: 0, r: 60, l: 60, b:0}}
                                           name= 'plot2'
                                           loader = {this.props.loaderStatusIntraChart2}
                                           decription = "this is decription"
                                           initialDate= {this.props.initialDate}
                                           finalDate= {this.props.finalDate}
                                           noData = {this.props.noDataPlot2}
                                           type="scatter"
                                           name1={this.props.selectedTurbine}
                                           name2={this.props.selectedTurbine2}
                                           width={window.innerWidth/2.2}
                                           height={window.innerHeight/4}
                                           saveChart={true}
                                    />
                                </div>
                            </div>
                            <div className="flex-container-nowrap flex-sb-h">
                                <div className="charts-container" style={margins}>
                                    <div className="graph-heading flex-container flex-sb-h">
                                        <div>
                                            <Select
                                                name="form-field-name3"
                                                value={this.props.selectedVariables.selectedVariable3}
                                                options={this.props.variables}
                                                onChange={this.logChange3}
                                                clearable={false}
                                            />
                                        </div>
                                        <div></div>
                                    </div>
                                    <Chart ref="plot3Component"
                                           x1= {this.props.plot3.plot3X1}
                                           y1= {this.props.plot3.plot3Y1}
                                           x2= {this.props.plot3.plot3X2}
                                           y2= {this.props.plot3.plot3Y2}
                                           margins={{t: 0, r: 60, l: 60, b:0}}
                                           name= 'plot3'
                                           loader = {this.props.loaderStatusIntraChart3}
                                           decription = "this is decription"
                                           initialDate= {this.props.initialDate}
                                           finalDate= {this.props.finalDate}
                                           noData = {this.props.noDataPlot3}
                                           type="scatter"
                                           name1={this.props.selectedTurbine}
                                           name2={this.props.selectedTurbine2}
                                           width={window.innerWidth/2.2}
                                           height={window.innerHeight/4}
                                           saveChart={true}
                                    />
                                </div>
                                <div className="charts-container" style={margins}>
                                    <div className="graph-heading flex-container flex-sb-h">
                                        <div>
                                            <Select
                                                name="form-field-name4"
                                                value={this.props.selectedVariables.selectedVariable4}
                                                options={this.props.variables}
                                                onChange={this.logChange4}
                                                clearable={false}
                                            />
                                        </div>
                                        <div></div>
                                    </div>
                                    <Chart ref="plot4Component"
                                           x1= {this.props.plot4.plot4X1}
                                           y1= {this.props.plot4.plot4Y1}
                                           x2= {this.props.plot4.plot4X2}
                                           y2= {this.props.plot4.plot4Y2}
                                           margins={{t: 0, r: 60, l: 60, b:0}}
                                           name= 'plot4'
                                           loader = {this.props.loaderStatusIntraChart4}
                                           decription = "this is decription"
                                           initialDate= {this.props.initialDate}
                                           finalDate= {this.props.finalDate}
                                           noData = {this.props.noDataPlot4}
                                           type="scatter"
                                           name1={this.props.selectedTurbine}
                                           name2={this.props.selectedTurbine2}
                                           width={window.innerWidth/2.2}
                                           height={window.innerHeight/4}
                                           saveChart={true}
                                    />
                                </div>
                            </div>
                        </div><br/><br/><br/>
                    </div>
                </div>
            </div>
        );
    }
}


export default IntraFarm;
