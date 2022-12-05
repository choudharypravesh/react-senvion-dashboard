import React from 'react';
import xhr from 'xhr';
import { FormGroup } from 'react-bootstrap';
import AlertCss from '../../../../public/styles/containers/portfolio/Portfolio.css'
import PortfolioGraph from './PortfolioGraphs'
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import FaPlus from 'react-icons/lib/fa/plus-circle';
import axios from 'axios';
import _ from 'underscore';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import classnames from 'classnames';
import AppActions from '../../../actions/AppActions';
import Chart from '../../../components/PlotlyChart/skeleton';
import { Link } from 'react-router';
import {getFleetData} from './FleetActions'

function getTitle(selectedChart){
    switch(selectedChart){
        case 8: return "Offshore";
        case 7: return "Onshore";
        case 1: return "Americas";
        case 2: return "Australia";
        case 5: return "EU South East"
        case 3: return "EU Central"
        case 4: return "EU North"
        case 6: return "EU South West"
    }
}
class AvailabilityTime extends React.Component{
    constructor(props) {
            super(props)
            this.allData = this.allData.bind(this);
            this.selectChart = this.selectChart.bind(this)
        }

    componentDidMount() {

        this.allData();
        this.selectChart(this.props.selectedChart);
    }

    allData() {
        let dataAll = {
                start_date: this.props.initialDate,
                end_date: this.props.finalDate,
                id:9
            };
        let selectedTab = this.props.selectedTab;
        this.props.dispatch(getFleetData(dataAll,selectedTab))
    }


    selectChart(selected){
        let data = {
            start_date: this.props.initialDate,
            end_date: this.props.finalDate,
            id: selected ? selected:this.props.selectedChart
        };
        let selectedTab=this.props.selectedTab;
        this.props.dispatch(getFleetData(data,selectedTab));
    }

    render(){
        return(
            <div className="fleet-graphs">
                <div style={{width: window.innerWidth - 100}} className="top-buffer-2">
                        <Chart
                            name="plot1"
                            type="scatter"
                            width={window.innerWidth-100}
                            height={300}
                            traceCount={5}
                            decription = "this is decription"
                            shape='spline'
                            x1={this.props.allChartData.X}
                            x2={this.props.allChartData.X}
                            x3={this.props.allChartData.X}
                            x4={this.props.allChartData.X}
                            x5={this.props.allChartData.X}
                            y1={this.props.allChartData.Y1}
                            y2={this.props.allChartData.Y2}
                            y3={this.props.allChartData.Y3}
                            y4={this.props.allChartData.Y4}
                            y5={this.props.allChartData.Y5}
                            name1={this.props.allChartData.name1}
                            name2={this.props.allChartData.name2}
                            name3={this.props.allChartData.name3}
                            name4={this.props.allChartData.name4}
                            name5={this.props.allChartData.name5}
                            loader={this.props.allDataLoader}
                            noData={this.props.allNoData}
                            saveChart={true}
                            />
                </div>
                { //country and ID reference
                    // ID            HUB
                    // 1              america
                    // 3              eu_central
                    // 4              eu_north
                    // 5              eu_south_east
                    // 6              eu_south_west
                    // 2              australia
                    // 7              onshore
                    // 8              offshore
                    // 9              all
                }
                <div className="btn-group top-buffer-2" role="group">
                    <Link to="" className={classnames('btn btn-default', { 'active':  this.props.selectedChart === 8})}  onClick={() => {this.selectChart(8)}}>Offshore</Link>
                    <Link to="" className={classnames('btn btn-default', { 'active':  this.props.selectedChart === 7})} onClick={() => {this.selectChart(7)}}>Onshore</Link>
                    <Link to="" className={classnames('btn btn-default', { 'active':  this.props.selectedChart === 1})} onClick={() => {this.selectChart(1)}}>Americas</Link>
                    <Link to="" className={classnames('btn btn-default', { 'active':  this.props.selectedChart === 2})} onClick={() => {this.selectChart(2)}}>Australia</Link>
                    <Link to="" className={classnames('btn btn-default', { 'active':  this.props.selectedChart === 5})} onClick={() => {this.selectChart(5)}}>EU South East</Link>
                    <Link to="" className={classnames('btn btn-default', { 'active':  this.props.selectedChart === 3})} onClick={() => {this.selectChart(3)}}>EU Central</Link>
                    <Link to="" className={classnames('btn btn-default', { 'active':  this.props.selectedChart === 4})} onClick={() => {this.selectChart(4)}}>EU North</Link>
                    <Link to="" className={classnames('btn btn-default', { 'active':  this.props.selectedChart === 6})} onClick={() => {this.selectChart(6)}}>EU South West</Link>
                </div>
                <div style={{width: window.innerWidth - 100}} className="top-buffer-2">

                        <Chart
                            name="plot2"
                            type='scatter'
                            title={getTitle(this.props.selectedChart)}
                            width={window.innerWidth-100}
                            height={300}
                            traceCount={5}
                            decription = "this is decription"
                            shape='spline'
                            x1={this.props.hubChartData.Y1 && this.props.hubChartData.X}
                            x2={this.props.hubChartData.Y2 && this.props.hubChartData.X}
                            x3={this.props.hubChartData.Y3 && this.props.hubChartData.X}
                            x4={this.props.hubChartData.Y4 && this.props.hubChartData.X}
                            x5={this.props.hubChartData.Y5 && this.props.hubChartData.X}
                            y1={this.props.hubChartData.Y1}
                            y2={this.props.hubChartData.Y2}
                            y3={this.props.hubChartData.Y3}
                            y4={this.props.hubChartData.Y4}
                            y5={this.props.hubChartData.Y5}
                            name1={this.props.hubChartData.name1}
                            name2={this.props.hubChartData.name2}
                            name3={this.props.hubChartData.name3}
                            name4={this.props.hubChartData.name4}
                            name5={this.props.hubChartData.name5}
                            loader={this.props.hubDataLoader}
                            noData={this.props.hubNoData}
                            saveChart={true}
                        />

                </div><br/><br/>
            </div>
        );
    }
}

export default AvailabilityTime;
