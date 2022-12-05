/* global Plotly */

// App.js
import React from 'react';
import { Modal, ButtonGroup, Button, Dropdown, MenuItem, ButtonToolbar, DropdownButton, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import _ from 'underscore'
import DatePicker from 'react-bootstrap-date-picker';
import 'react-dates/lib/css/_datepicker.css';
import axios from 'axios'
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import {Link} from 'react-router';
import TurbineKPICss from '../../../../../public/styles/containers/analyze/turbine/TurbineKPI.css'
import FaPlus from 'react-icons/lib/fa/plus-circle';
import VirtualModelCss from '../../../../../public/styles/containers/analyze/VirtualModel.css'
import ReactCookie from 'react-cookie';
import CustomDatePicker from '../../../../components/CustomDatePicker/CustomDatePicker';
import moment from  'moment';
import {PowerCurve} from '../../../../components/PlotlyChart/skeleton'
import {changeVariablesAndGetPowerCurveScadaData, getTurbineScadaDetails} from  '../../../analyze/turbine/TurbineActions'
class TurbineKPI extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPopup: false,
            user: ReactCookie.load('user'),
        }

        this.openCreateServiceOrderPopup = this.openCreateServiceOrderPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);

        //this.resizeGraphs = this.resizeGraphs.bind(this);


        this.logChange11 = this.logChange11.bind(this);
        this.logChange12 = this.logChange12.bind(this);
        this.logChange13 = this.logChange13.bind(this);
        this.logChange21 = this.logChange21.bind(this);
        this.logChange22 = this.logChange22.bind(this);
        this.logChange23 = this.logChange23.bind(this);
        this.getGraphData = this.getGraphData.bind(this);
    }

    componentDidMount() {
        var self = this;
        if(this.props.mode === 'turbine'){
            self.props.dispatch(getTurbineScadaDetails(this.props.reqData));
        }
    }
    logChange11(val) {
        this.props.reqData.variable1 = val;
        this.props.dispatch(changeVariablesAndGetPowerCurveScadaData(this.props.reqData, 1))
    }

    logChange12(val) {
        this.props.reqData.variable2 = val;
        this.props.dispatch(changeVariablesAndGetPowerCurveScadaData(this.props.reqData, 2))
    }

    logChange13(val) {
        this.props.reqData.variable3 = val;
        this.props.dispatch(changeVariablesAndGetPowerCurveScadaData, (this.props.reqData.variable2, 3))
    }

    logChange21(val) {
        this.props.reqData.variable4 = val;
        this.props.dispatch(changeVariablesAndGetPowerCurveScadaData(this.props.reqData, 4))
    }

    logChange22(val) {
        this.props.reqData.variable5 = val;
        this.props.dispatch(changeVariablesAndGetPowerCurveScadaData(this.props.reqData, 5))
    }

    logChange23(val) {
        this.props.reqData.variable6 = val;
        this.props.dispatch(changeVariablesAndGetPowerCurveScadaData(this.props.reqData, 6))
    }


    getGraphData() {
        return {
            variable1: this.props.selectedVariables.selectedVariable1,
            variable2: this.props.selectedVariables.selectedVariable2,
            variable3:this.props.selectedVariables.selectedVariable3,
            start_date: this.props.initialDate,
            end_date: this.props.finalDate,
            turbines: this.props.selectedTurbine,
            type: 2,
            user_id: ReactCookie.load('user').user_id,
            //tab:"powerCurve"
        }



    }



    handleDateChangeInitial(initialDate) {
        localStorage.initialDateAlertsKPI = initialDate;
    }


    handleDateChangeFinal(finalDate) {
        localStorage.finalDateAlertsKPI = finalDate;
    }

    openCreateServiceOrderPopup() {
        this.setState({showPopup: true})
    }

    closePopup(e) {
        this.setState({showPopup: false})
    }

    render() {

        var plotStyles = {
            marginRight: "14px",
            marginBottom: "14px",
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '1%',
            /*width: window.innerWidth/2.2*/
        };

        return (
            <div className="turbinekpis-container" id="turbine-kpis">
                <div className="font-12 flex-container flex-sb-h">
                    <div className="heading-title">Torque RPM Curve</div>
                    <div className="flex-container-nowrap margin-left-small">
                        {this.props.showCountry ?
                            <div className="flex-container-nowrap">
                                <div>Country&nbsp;&nbsp;</div>
                                <Select
                                    name="form-field-name"
                                    value={this.state.selectedCountry}
                                    options={this.state.countryDropdown}
                                    onChange={this.logChangeCountry}
                                    clearable={false}
                                    autosize={true}
                                />
                            </div>
                            :
                            <span></span>
                        }
                        <div>&nbsp;&nbsp;Farm&nbsp;&nbsp;</div>
                        <Select
                            name="form-field-name"
                            value={this.state.selectedFarm}
                            options={this.state.farms}
                            onChange={this.logChangeFarm}
                            clearable={false}
                        />
                        <div>&nbsp;&nbsp;Turbine&nbsp;&nbsp;</div>
                        <Select
                            name="form-field-name"
                            value={this.state.selectedTurbine}
                            options={this.state.turbines}
                            onChange={this.logChangeTurbine}
                            clearable={false}
                        />
                        <div className="flex-container-nowrap">
                            <CustomDatePicker ref = {(datePick) => { this.customDatePicker = datePick}}
                                dateChange={this.updateDate}
                                startOnChange={this.handleDateChangeInitial}
                                endOnChange={this.handleDateChangeFinal}
                                initialDate={this.state.initialDate}
                                finalDate={this.state.finalDate}
                                reloadGraphs={this.reloadGraphs}
                                offsetDate={moment(this.state.selectedAlert.date_identified).format('YYYY-MM-DD')}
                                disabled={5}//to disable 360 days link
                             />
                        </div>
                    </div>
                </div>

                <div className="top-buffer-2">
                    <div>
                        <div className="flex-container-nowrap flex-sb-h">
                            <div style={plotStyles} className="scatter-plot-container">
                                <div className="font-12 flex-container-nowrap flex-end-h">
                                    <div>&nbsp;&nbsp;Variable&nbsp;&nbsp;</div>
                                    <Select
                                        name="form-field-name"
                                        value={this.props.selectedVariables.selectedVariable1}
                                        options={this.props.variables}
                                        onChange={this.logChange11}
                                        clearable={false}
                                    />
                                    <div>&nbsp;&nbsp;&nbsp;</div>
                                    <Select
                                        name="form-field-name"
                                        value={this.props.selectedVariables.selectedVariable2}
                                        options={this.props.variables}
                                        onChange={this.logChange12}
                                        clearable={false}
                                    />
                                    <div>&nbsp;&nbsp;&nbsp;</div>
                                    <Select
                                        name="form-field-name"
                                        value={this.props.selectedVariables.selectedVariable3}
                                        options={this.props.variables}
                                        onChange={this.logChange13}
                                        clearable={false}
                                    />
                                </div>
                                <PowerCurve
                                    var1={this.props.selectedVariables.selectedVariable1.label}
                                    var2={this.props.selectedVariables.selectedVariable2.label}
                                    var3={this.props.selectedVariables.selectedVariable3.label}
                                    width={window.innerWidth/2.3}
                                    height= {window.innerHeight/2}
                                    name="plot1"
                                    x = {this.props.powerCurveY1}
                                    y = {this.props.powerCurveY2}
                                    color = {this.props.powerCurveY3}
                                />
                            </div>
                            <div style={plotStyles} className="scatter-plot-container">
                                <div className="font-12 flex-container-nowrap flex-end-h">
                                    <div>&nbsp;&nbsp;Variable&nbsp;&nbsp;</div>
                                    <Select
                                            name="form-field-name"
                                            value={this.props.selectedVariables.selectedVariable4}
                                            options={this.props.variables}
                                            onChange={this.logChange21}
                                            clearable={false}
                                    />
                                    <div>&nbsp;&nbsp;&nbsp;</div>
                                    <Select
                                        name="form-field-name"
                                        value={this.props.selectedVariables.selectedVariable5}
                                        options={this.props.variables}
                                        onChange={this.logChange22}
                                        clearable={false}
                                    />
                                    <div>&nbsp;&nbsp;&nbsp;</div>
                                    <Select
                                        name="form-field-name"
                                        value={this.props.selectedVariables.selectedVariable6}
                                        options={this.props.variables}
                                        onChange={this.logChange23}
                                        clearable={false}
                                    />
                                </div>
                                <PowerCurve
                                    var1={this.props.selectedVariables.selectedVariable4}
                                    var2={this.props.selectedVariables.selectedVariable5}
                                    var3={this.props.selectedVariables.selectedVariable6}
                                    powercurve="true"
                                    mode="markers"
                                    markercolorscale="Viridis"
                                    width={window.innerWidth/2.3}
                                    height= {window.innerHeight/2}
                                    type="scatter"
                                    name="plot2"
                                    x = {this.props.powerCurveChart2Y1}
                                    y = {this.props.powerCurveChart2Y2}
                                    color = {this.props.powerCurveChart2Y3}
                                />
                            </div>
                        </div>
                    </div><br/>
                </div>
            </div>
        );
    }
}

export default TurbineKPI;
