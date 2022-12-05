// App.js
import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import CustomDatePicker from '../../../../components/CustomDatePicker/CustomDatePicker';
import Loader from '../../../../components/Loader/Loader';
import {setScadaDateAndGetScadaData, setScadaInitialDate, setScadaFinalDate, setVariableAndGetScadaData, setTurbineAndGetScadaData, setSelectedScadaTurbine, setSelectedScadaTurbine2, getScadaDataForVar, getTurbinesOfSameFarms, getFarmLevelTurbineDataForAnomaly, getType2ChartForAnomalyReport} from '../AlertsDetailsActions'
import Chart from '../../../../components/PlotlyChart/skeleton'
import AppConstants from '../../../../constants/AppConstants';

class AnomalyReport extends React.Component {
    constructor(props) {
        super(props);
        this.logChangeTurbine1 = this.logChangeTurbine1.bind(this);
        this.logChangeTurbine2 = this.logChangeTurbine2.bind(this);
        this.logChange1 = this.logChange1.bind(this);
        this.handleScadaDateChangeInitial = this.handleScadaDateChangeInitial.bind(this);
        this.handleScadaDateChangeFinal = this.handleScadaDateChangeFinal.bind(this);
        this.updateScadaDate = this.updateScadaDate.bind(this);
        this.reloadScadaGraphs = this.reloadScadaGraphs.bind(this);
        this.getChart = this.getChart.bind(this);
    }
    componentDidMount() {
        this.props.nextActionCreators.shift();
        this.props.nextActionCreators.map(actionCreator => this.props.dispatch(actionCreator(this.props.data)))
        this.props.dispatch(getTurbinesOfSameFarms(this.props.selectedAlert.turbine_id, this.props.selectedTab, this.props.data1));
    };
    componentWillUnmount(){
        this.props.dispatch({
            type: AppConstants.LOADING_ALERTS_SCADA_DATA_VALUES,
            payload: {}
        })
    }
    handleScadaDateChangeInitial(initialDate) {
        this.props.dispatch(setScadaInitialDate(initialDate))
    }



    handleScadaDateChangeFinal(finalDate) {
        this.props.dispatch(setScadaFinalDate(finalDate))
    }



    reloadScadaGraphs(){
        let data = this.props.data1;
        data.turbines = this.props.data.selectedScadaTurbines
        data.variable = data.scadaSelectedVariable.label;
        this.props.dispatch(getScadaDataForVar(data));
    }


    //DROPDOWNS

    logChangeTurbine1(val) {
        this.props.dispatch(setTurbineAndGetScadaData(val.value, 1, this.props.data1));
    }

    logChangeTurbine2(val) {
         this.props.dispatch(setTurbineAndGetScadaData(val.value, 2, this.props.data1));
    }

    logChange1(val) {
        this.props.dispatch(setVariableAndGetScadaData(val, this.props.data1))
    }

    updateScadaDate(start, end, scadaSelectedDate) {
        this.props.dispatch(setScadaDateAndGetScadaData({start,end,scadaSelectedDate},this.props.data1));
    }
    getChart(){
        if(this.props.typeOfChart == '2'){
            return(
                <Chart ref="plot2Component"
                   x1= {this.props.lpfChartData && this.props.lpfChartData.x1}
                   y1= {this.props.lpfChartData && this.props.lpfChartData.y1}
                   x2= {this.props.lpfChartData && this.props.lpfChartData.x2}
                   y2= {this.props.lpfChartData && this.props.lpfChartData.y2}
                   name= 'plot2'
                   type="scatter"
                   width={window.innerWidth-120}
                   height={300}
                   name1={this.props.selectedAlert.turbine_id}
                   name2='Farm Mean'
                   markX={this.props.lpfChartData.markX}
                   markY={this.props.lpfChartData.markY}
                   loader = {this.props.loader1}
                   saveChart = {true}
                />
            )
        }else{
            return(
                <Chart ref="plot2Component"
                   x1= {this.props.lpfChartData && this.props.lpfChartData.x1}
                   y1= {this.props.lpfChartData && this.props.lpfChartData.y1}
                   x2= {this.props.lpfChartData && this.props.lpfChartData.x2}
                   y2= {this.props.lpfChartData && this.props.lpfChartData.y2}
                   name= 'plot2'
                   height={300}
                   type="scatter"
                   width={window.innerWidth-120}
                   name1={this.props.selectedAlert.turbine_id}
                   name2='Farm Mean'
                   loader = {this.props.loader1}
                   saveChart={true}
                />
            )
        }
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
                            <div className="charts-container top-buffer-2" style={margins}>
                                {this.getChart()}
                            </div>
                            <div className="flex-container flex-sb-h top-buffer-2">
                                <div className="heading-title">Nearest Turbine</div>
                                <div className="font-12 flex-end-h flex-container-nowrap">
                                    <div className="flex-container flex-end-h">
                                        <div>Turbine&nbsp;&nbsp;</div>
                                        <Select
                                            name="form-field-name"
                                            value={this.props.selectedTurbine}
                                            options={this.props.turbineList}
                                            onChange={this.logChangeTurbine1}
                                            clearable={false}
                                        />
                                        <div>&nbsp;&nbsp;compared to Turbine&nbsp;&nbsp;</div>
                                        <Select
                                            name="form-field-name"
                                            value={this.props.selectedTurbine2}
                                            options={this.props.turbineList}
                                            onChange={this.logChangeTurbine2}
                                            clearable={false}
                                        />
                                    </div>
                                    <div className="flex-container-nowrap flex-end-h">
                                        <CustomDatePicker ref = {(datePick) => { this.customDatePicker = datePick}}
                                              dateChange={this.updateScadaDate}
                                              startOnChange={this.handleScadaDateChangeInitial}
                                              endOnChange={this.handleScadaDateChangeFinal}
                                              initialDate={this.props.scadaInitialDate}
                                              finalDate={this.props.scadaFinalDate}
                                              reloadGraphs={this.reloadScadaGraphs}
                                              defaultValue={this.props.scadaSelectedDate}
                                              offsetDate={moment(this.props.selectedAlert.date_identified).format('YYYY-MM-DD')}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="charts-container top-buffer-2" style={margins}>
                                <div className="graph-heading flex-container flex-sb-h">
                                    <div>
                                        <Select
                                            name="form-field-name1"
                                            value={this.props.selectedVariable}
                                            options={this.props.variables}
                                            onChange={this.logChange1}
                                            clearable={false}
                                        />
                                    </div>
                                    <div></div>
                                </div>
                                <Chart ref="plot1Component"
                                       x1= {this.props.scadaChartData && this.props.scadaChartData.x1}
                                       y1= {this.props.scadaChartData && this.props.scadaChartData.y1}
                                       x2= {this.props.scadaChartData && this.props.scadaChartData.x2}
                                       y2= {this.props.scadaChartData && this.props.scadaChartData.y2}
                                       name= 'plot1'
                                       type="scatter"
                                       height={300}
                                       name1={this.props.selectedTurbine}
                                       name2={this.props.selectedTurbine2}
                                       width={window.innerWidth-120}
                                       loader = {this.props.loader2}
                                       noData = {this.props.noDataScada}
                                       noDataMessage = "No Scada data available for the selected variable or date range"
                                       saveChart = {true}
                                />
                            </div>
                        </div><br/><br/><br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AnomalyReport;