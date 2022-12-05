/* global Plotly */

import React from 'react';
import _ from 'underscore'
import WeatherCss from '../../../../public/styles/containers/power_forecast/Weather.css'
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import axios from 'axios'
import 'react-dates/lib/css/_datepicker.css';
import { Link } from 'react-router'
import classnames from 'classnames';
import moment from 'moment';
import Map from '../../../components/Map/Map';
import ChartSkeleton from "../../../components/PlotlyChart/skeleton";
import {getWeatherOverviewChartData,
    setDuration1,
    setDuration2, selectChart} from './WeatherActions'
import Loader from '../../../components/Loader/Loader'

class WeatherOverview extends React.Component {
    constructor(props) {
        super(props)
        this.logChangeDuration1 = this.logChangeDuration1.bind(this);
        this.logChangeDuration2 = this.logChangeDuration2.bind(this);
    }

    logChangeDuration1(val) {
        var self = this;
        const { dispatcher } = this.props;
        dispatcher(setDuration1({selectedDuration1: val.value}));
        dispatcher(getWeatherOverviewChartData({selectedChart: this.props.selectedChart,
            duration: val.value,
            dropdown: 1,
            chart: this.refs.weatherChart1,
            selectedFarm: self.props.selectedFarm,
            start: self.props.initialDate,
            end: self.props.finalDate}));
    }

    logChangeDuration2(val) {
        var self = this;
        const { dispatcher } = this.props;
        dispatcher(setDuration2({selectedDuration2: val.value}));
        dispatcher(getWeatherOverviewChartData({selectedChart: this.props.selectedChart,
            duration: val.value,
            dropdown: 2,
            chart: this.refs.weatherChart2,
            selectedFarm: self.props.selectedFarm,
            start: self.props.initialDate,
            end: self.props.finalDate}));
    }

    selectChart(option) {
        let self = this;
        const { dispatcher } = this.props;
        dispatcher(selectChart(option));
        dispatcher(getWeatherOverviewChartData({selectedChart: option,
            chart: self.refs.weatherChart1,
            dropdown: 1,
            duration: self.props.selectedDuration1,
            selectedFarm: self.props.selectedFarm,
            start: self.props.initialDate,
            end: self.props.finalDate}));
        dispatcher(getWeatherOverviewChartData({selectedChart: option,
            chart: this.refs.weatherChart2,
            dropdown: 2,
            duration: this.props.selectedDuration2,
            selectedFarm: self.props.selectedFarm,
            start: self.props.initialDate,
            end: self.props.finalDate}));
    }

    render() {

        let plotStyle= {
            border: '1px solid #ddd',
            marginBottom: '14px'
        }

        let emptyBox = {
            marginBottom: "14px",
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '1px',
            height: innerHeight/2.6,
            width: innerWidth/2.1,
            marginLeft : "5px"

        };
        let plotMargins = {
            width: window.innerWidth-100,
            background: "#ffffff",
            border: '1px solid #ddd',
            marginBottom: '14px',
            marginRight: "14px",
            backgroundColor: '#ffffff',
            borderRadius: '4px'
        };

        return (

            <div className="weather-container">
                <div className="blocks-container top-buffer">
                    <div className="flex-container-nowrap flex-sb-h">
                        {
                            this.props.selectedFarm ?
                                <Map farm={this.props.selectedFarm} ref={(map) => {this.map = map}}  height={innerHeight/2.6} width={innerWidth/0.9}/>
                                :<Loader height={innerHeight/2.6} width={innerWidth/1.5} />
                        }

                        <div style={emptyBox} className="flex-container" >
                            <div className="col-xs-12">
                                <h4> Weather Data Summary</h4>
                                <div>
                                    <table style={{marginBottom:0}} className="table table-responsive">
                                        <tbody>
                                            <tr>
                                                <th></th>
                                                <td>All</td>
                                                <td>Day Time</td>
                                                <td>Night Time</td>
                                            </tr>
                                            <tr>
                                                <td>Wind Speed (m/s)</td>
                                                <td>{this.props.summary.all.ws}</td>
                                                <td>{this.props.summary.day.ws}</td>
                                                <td>{this.props.summary.night.ws}</td>
                                            </tr>
                                            <tr>
                                                <td>Turbulence (m/s)</td>
                                                <td>{this.props.summary.all.tb}</td>
                                                <td>{this.props.summary.day.tb}</td>
                                                <td>{this.props.summary.night.tb}</td>
                                            </tr>
                                            <tr>
                                                <td>Outdoor Temperature (&#8451;)</td>
                                                <td>{this.props.summary.all.ot}</td>
                                                <td>{this.props.summary.day.ot}</td>
                                                <td>{this.props.summary.night.ot}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="btn-group top-buffer-2" role="group">
                            <Link to="" className={classnames('btn btn-default', { 'active': this.props.selectedChart === 1})}  onClick={() => {this.selectChart(1)}}>Wind Speed</Link>
                            <Link to="" className={classnames('btn btn-default', { 'active': this.props.selectedChart === 2})} onClick={() => {this.selectChart(2)}}>Turbulence</Link>
                            <Link to="" className={classnames('btn btn-default', { 'active': this.props.selectedChart === 3})} onClick={() => {this.selectChart(3)}}>Outdoor Temperature</Link>
                        </div>
                        <div style={plotMargins} className="charts-container top-buffer-2">
                             <div className="graph-heading flex-container flex-end-h">
                                 <Select
                                    name="duration"
                                    value={this.props.selectedDuration1}
                                    options={this.props.durations}
                                    onChange={this.logChangeDuration1}
                                    clearable={false}
                                />
                             </div>
                            <ChartSkeleton
                                title= {this.props.title}
                                x1= {this.props.xaxis}
                                y1= {this.props.yaxis}
                                z1= {this.props.zaxis1}
                                name = 'Heatmap'
                                type= "heatmap"
                                noData={this.props.noData1}
                                loader={this.props.loader}
                                decription = "this is decription"
                                colorscale={this.props.colorScale}
                                width= {window.innerWidth-150}
                                height= '300'
                                ref = {(chart) => {this.weatherChart1 = chart}}
                                saveChart={true}
                            />
                        </div>
                        <div style={plotMargins} className="charts-container top-buffer-2">
                             <div className="graph-heading flex-container flex-end-h">
                                 <Select
                                    name="duration"
                                    value={this.props.selectedDuration2}
                                    options={this.props.durations}
                                    onChange={this.logChangeDuration2}
                                    clearable={false}
                                />
                             </div>
                            <ChartSkeleton
                                title= {this.props.title2}
                                x1= {this.props.xaxis2}
                                y1= {this.props.yaxis2}
                                z1= {this.props.zaxis2}
                                noData={this.props.noData2}
                                name = 'Heatmap2'
                                loader={this.props.loader}
                                type= "heatmap"
                                legendName1='date'
                                decription = "this is decription"
                                colorscale={this.props.colorScale2}
                                width= {window.innerWidth-150}
                                height= '300'
                                ref = {(chart) => {this.weatherChart2 = chart}}
                            />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default WeatherOverview
