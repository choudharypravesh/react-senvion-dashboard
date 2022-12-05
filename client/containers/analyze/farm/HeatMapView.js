/* global Plotly */

import React from 'react';
import { FormGroup } from 'react-bootstrap';
import _ from 'underscore'
import Portfolio from '../../../../public/styles/containers/analyze/Farm.css'
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import axios from 'axios'
import { Link } from 'react-router';
import moment from 'moment';
import Loader from '../../../components/Loader/Loader';
import ChartSkeleton from '../../../components/PlotlyChart/skeleton'
import {selectFarmAndCallNextAction} from '../../../actions/AppActions'
import {setVariableAndGetData, getVariablesForFarmsHeatMap} from './FarmActions'
import AppConstants from '../../../constants/AppConstants'
class Farm extends React.Component {
    constructor(props) {
        super(props)
        this.logChange1 = this.logChange1.bind(this)
        this.logChange2 = this.logChange2.bind(this)
    }

    componentDidMount() {
       let {nextActionCreators, data} = this.props.getNextActionsCreatorsAndData();
       this.props.dispatch(getVariablesForFarmsHeatMap(data))
    }

    componentWillUnmount(){
        this.props.dispatch({
            type: AppConstants.LOADING_TURBINE_HEAT_MAP_DATA,
            payload: {loaderStatus: true, chart: 1}
        })
        this.props.dispatch({
            type: AppConstants.LOADING_TURBINE_HEAT_MAP_DATA,
            payload: {loaderStatus: true, chart: 2}
        })
    }
    logChange1(val){
        let data = {
                        wind_farm: this.props.selectedFarm,
                        variable: this.props.selectedVariable1,
                        start_date: this.props.initialDate,
                        end_date: this.props.finalDate,
                        type: 2,
                        chart: 1
                    };
        this.props.dispatch(setVariableAndGetData(val.value, data))
    }

    logChange2(val){

        let data = {
                        wind_farm: this.props.selectedFarm,
                        variable: this.props.selectedVariable2,
                        start_date: this.props.initialDate,
                        end_date: this.props.finalDate,
                        type: 2,
                        chart: 2
                    };
        this.props.dispatch(setVariableAndGetData(val.value, data))
    }



    render() {

        var plotStyle= {
            border: '1px solid #ddd',
            marginBottom: '14px'
        }

        var graphContainer = {
            background: "#ffffff",
            padding: "1%",
            border: '1px solid #ddd',
            marginBottom: '14px',
            marginRight: "14px",
            backgroundColor: '#ffffff',
            borderRadius: '4px'
        }

        return (
            <div className="blocks-container">
                    <div className="top-buffer-2">
                        <div style={graphContainer} className="heatmap-graph-container">
                            <div className="flex-container flex-sb-h">
                                <div className="heading-title"></div>
                                <div className="font-12 flex-container">
                                    <div>&nbsp;&nbsp;Variable&nbsp;&nbsp;</div>
                                    <Select
                                        name="form-field-name"
                                        value={this.props.selectedVariable1}
                                        options={this.props.variablesList}
                                        onChange={this.logChange1}
                                        clearable={false}
                                    />
                                </div>
                            </div>
                            <ChartSkeleton
                                title= {this.props.title}
                                x1= {this.props.heatMapX}
                                y1= {this.props.heatMapY}
                                z1= {this.props.heatMapZ}
                                name = 'heat1'
                                type= "heatmap"
                                legendName1='date'
                                width= {window.innerWidth-150}
                                height= '300'
                                colorscale="Viridis"
                                loader= {this.props.heatMapLoader}
                                noData={this.props.heatMapNoData}
                                ref={(chart) => { this.map1 =  chart}}
                                saveChart={true}
                            />

                        </div>
                        <div style={graphContainer} className="heatmap-graph-container">
                            <div className="flex-container flex-sb-h">
                                <div className="heading-title"></div>
                                <div className="font-12 flex-container">
                                    <div>&nbsp;&nbsp;Variable&nbsp;&nbsp;</div>
                                    <Select
                                        name="form-field-name"
                                        value={this.props.selectedVariable2}
                                        options={this.props.variablesList}
                                        onChange={this.logChange2}
                                        clearable={false}
                                    />
                                </div>
                            </div>
                            <ChartSkeleton
                                title= {this.props.title}
                                x1= {this.props.heatMap2X}
                                y1= {this.props.heatMap2Y}
                                z1= {this.props.heatMap2Z}
                                name = 'heat2'
                                type= "heatmap"
                                colorscale="Viridis"
                                legendName1='date'
                                width= {window.innerWidth-150}
                                height= '300'
                                loader= {this.props.heatMap2Loader}
                                noData={this.props.heatMap2NoData}
                                ref={(chart) => { this.map2 =  chart}}
                                saveChart={true}
                            />

                        </div>
                    </div>
            </div>


        );
    }
}





export default Farm