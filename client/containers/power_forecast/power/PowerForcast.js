// App.js
import React from 'react';
import xhr from 'xhr';
import PowerforecastCss from '../../../../public/styles/containers/power_forecast/PowerForcast.css';
import _ from 'underscore';
import Select from 'react-virtualized-select'
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import moment from 'moment'
import axios from 'axios'
import classnames from 'classnames'
import Chart from '../../../components/PlotlyChart/skeleton'
import { connect } from 'react-redux'
import { setDate, selectTab, getCountriesList, changeCountryAndGetFarms, selectFarmAndCallNextAction, setDateAndCallNextActions, getTurbinesList} from '../../../actions/AppActions'
import { getPowerForecastData, setForecastTurbineAndCallNextActions } from './PowerForecastActions'

class Powerforecast extends React.Component {
    constructor(props) {
        super(props)
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleFarmChange = this.handleFarmChange.bind(this);
        this.handleTurbineChange = this.handleTurbineChange.bind(this);
        this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this);
        this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this);
        this.reloadGraphs = this.reloadGraphs.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.getNextActionsCreatorsAndData = this.getNextActionsCreatorsAndData.bind(this);
    }
    getNextActionsCreatorsAndData(){
        let data = {
                    start_date: this.props.initialDate,
                    end_date: this.props.finalDate,
                    numberOfTurbinesToSend : 1,
                    turbines: this.props.selectedTurbine
                }
        let nextActionCreators = [getTurbinesList, getPowerForecastData]
        return {nextActionCreators, data}
    }
    componentDidMount() {
        const {dispatch} = this.props;
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        dispatch(getCountriesList(nextActionCreators, data));
    }


   handleCountryChange(country){
        const {dispatch, countriesList} = this.props;
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        dispatch(changeCountryAndGetFarms(country.value,nextActionCreators,data));
    }

    handleFarmChange(farm){
        const {dispatch, countriesList} = this.props;
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        dispatch(selectFarmAndCallNextAction(farm.value,nextActionCreators,data));
    }

     handleTurbineChange(turbine){
         const {dispatch, countriesList} = this.props;
         let {data} = this.getNextActionsCreatorsAndData();
         data.turbines = turbine.value;
         dispatch(setForecastTurbineAndCallNextActions([getPowerForecastData],data));
     }

    handleDateChangeInitial(initialDate) {
        this.props.dispatch(setDate({initialDate: initialDate, finalDate: this.props.finalDate}))
    }

    handleDateChangeFinal(finalDate) {
        this.props.dispatch(setDate({initialDate: this.props.initialDate, finalDate: finalDate}));
    }

    updateDate(start,end, selectedDate) {
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        data.start_date = start;
        data.end_date = end;
        this.props.dispatch(setDateAndCallNextActions([getPowerForecastData], data, selectedDate))
    }

    reloadGraphs() {
        let self = this;
        let {nextActionCreators, data} = this.getNextActionsCreatorsAndData();
        this.props.dispatch(getPowerForecastData(data));
    }


    render() {
        var plotMargins = {
            marginBottom: "14px",
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '1px',
        }
        return (

            <div className="power-forecast-container" id="power-forecast"><br/>
                <div className="flex-container flex-sb-h">
                    <div className="heading-title">Power Forecast</div>
                    <div className="font-12">
                        <div className="flex-container-nowrap flex-end-h">
                            <div className="flex-container-nowrap">
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
                            &nbsp;&nbsp;Turbine&nbsp;&nbsp;
                            <Select
                                name="form-field-name"
                                value={this.props.selectedTurbine}
                                options={this.props.turbineList}
                                onChange={this.handleTurbineChange}
                                clearable={false}
                            />

                            <CustomDatePicker ref = {(datePick) => { this.customDatePicker = datePick}}
                                              dateChange={this.updateDate}
                                              startOnChange={this.handleDateChangeInitial}
                                              endOnChange={this.handleDateChangeFinal}
                                              initialDate={this.props.initialDate}
                                              finalDate={this.props.finalDate}
                                              reloadGraphs={this.reloadGraphs}
                                              defaultValue={this.props.selectedDate}
                            />
                        </div>
                    </div>
                </div>
                <div className="top-buffer-2">
                    <div>
                        <div style={plotMargins} >
                            <Chart
                                title= "Power Forecast"
                                x1= {this.props.Xaxis}
                                y1= {this.props.forecast1y}
                                x2= {this.props.Xaxis}
                                y2= {this.props.forecast2y}
                                name= "Power Forecast"
                                type= "scatter"
                                name1= "Actual"
                                name2= "Predicted"
                                width= {window.innerWidth-120}
                                height= {window.innerHeight/3}
                                noData = {this.props.noDataPower}
                                noDataMessage = "No Power Forecast available for this turbine"
                                loader = {this.props.loaderStatus}
                                ref = {(chart) => {this.powerChart = chart}}
                                saveChart={true}
                            />
                        </div>
                        <div style={plotMargins} >
                            <Chart
                                title= "Windspeed"
                                x1= {this.props.Xaxis}
                                y1= {this.props.windspeed1y}
                                x2= {this.props.Xaxis}
                                y2= {this.props.windspeed2y}
                                name= "Windspeed"
                                type= "scatter"
                                name1= "Actual"
                                name2= "Predicted"
                                width= {window.innerWidth-120}
                                height= {window.innerHeight/3}
                                finalDate={this.props.finalDate}
                                noData = {this.props.noDataWindSpeed}
                                noDataMessage = "No Windspeed forecast data available for this turbine"
                                loader = {this.props.loaderStatus}
                                ref = {(chart) => {this.windChart = chart}}
                                saveChart={true}
                            />
                        </div>
                        <div style={plotMargins} >
                            <Chart
                                title= "Wind-Direction"
                                x1= {this.props.Xaxis}
                                y1= {this.props.winddirection1y}
                                name= "Wind-Direction"
                                type= "scatter"
                                name1= "Wind Direction"
                                width= {window.innerWidth-120}
                                height= {window.innerHeight/3}
                                finalDate={this.props.finalDate}
                                noData = {this.props.noDataWindDirection}
                                noDataMessage = "No Wind-Direction forecast data available for this turbine"
                                loader = {this.props.loaderStatus}
                                ref = {(chart) => {this.directionChart = chart}}
                                saveChart={true}
                            />
                        </div>
                        <div style={plotMargins} >
                            <Chart
                                title= "Scheduled Downtime "
                                x1= {this.props.Xaxis}
                                y1= {this.props.scheduledtime1y}
                                name= "Scheduled Downtime"
                                type= "scatter"
                                name1= "Scheduled Downtime"
                                width= {window.innerWidth-120}
                                height= {window.innerHeight/3}
                                finalDate={this.props.finalDate}
                                noData = {this.props.noDataDownTime}
                                noDataMessage = "No Scheduled Downtime data available for this turbine"
                                loader = {this.props.loaderStatus}
                                ref = {(chart) => {this.downtimeChart = chart}}
                                saveChart={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  const { Forecast } = state
  return {
        initialDate: Forecast.get('initialDate'),
        finalDate: Forecast.get('finalDate'),
        selectedTurbine: Forecast.get('selectedTurbine'),
        selectedCountry: Forecast.get('selectedCountry'),
        countriesList: Forecast.get('countriesList'),
        selectedFarm: Forecast.get('selectedFarm'),
        farmsList: Forecast.get('farmsList'),
        turbineList: Forecast.get('turbineList'),
        selectedDate: Forecast.get('selectedDate'),
        Xaxis: Forecast.get('Xaxis'),
        forecast1y: Forecast.get('forecast1y'),
        noDataPower: Forecast.get('noDataPower'),
        loaderStatus: Forecast.get('loaderStatus'),
        windspeed1y: Forecast.get('windspeed1y'),
        windspeed2y: Forecast.get('windspeed2y'),
        noDataWindSpeed: Forecast.get('noDataWindSpeed'),
        winddirection1y: Forecast.get('winddirection1y'),
        noDataWindDirection: Forecast.get('noDataWindDirection'),
        scheduledtime1y: Forecast.get('scheduledtime1y'),
        noDataDownTime: Forecast.get('noDataDownTime')
  }
}

export default connect(mapStateToProps)(Powerforecast);
