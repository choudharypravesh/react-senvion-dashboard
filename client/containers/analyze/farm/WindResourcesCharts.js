import React from 'react';
import axios from 'axios'
import 'react-dates/lib/css/_datepicker.css';
import { FormGroup } from 'react-bootstrap';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import 'react-dates/lib/css/_datepicker.css';
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import moment from 'moment';
import Chart from '../../../components/PlotlyChart/skeleton';
import _ from 'underscore';
import {selectFarmAndCallNextAction} from '../../../actions/AppActions'
import AppConstants from '../../../constants/AppConstants'

class WindResourcesCharts extends React.Component{
    componentDidMount(){
        let {nextActionCreators, data} = this.props.getNextActionsCreatorsAndData();
        this.props.dispatch(selectFarmAndCallNextAction(this.props.farmForDropDown, nextActionCreators, data));
    }
    componentWillUnmount(){
        this.props.dispatch({
            type: AppConstants.LOADING_WIND_DATA,
            payload: {loaderStatus: true}
        })
    }

    render(){
        var plotStyles = {
            /*marginRight: "14px",*/
            marginBottom: "14px",
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '4px',
        }
        return(
            <div>
                <div className="top-buffer-2" style={plotStyles}>
                    <Chart
                        title= "Wind Speed (Farm Level Mean)"
                        x1= {this.props.wsX}
                        y1= {this.props.wsY}
                        name= "plot-wind-speed"
                        type= "scatter"
                        decription = "this is decription"
                        name1= {this.props.selectedFarm}
                        width= {window.innerWidth-120}
                        height= {window.innerHeight/2.5}
                        loader = {this.props.loader}
                        noData = {this.props.noDataSpeed}
                        saveChart={true}
                    />
                </div>
                <div className="top-buffer-2" style={plotStyles}>
                    <Chart
                        title= "Wind Direction (Farm Level Mean)"
                        x1= {this.props.wdX}
                        y1= {this.props.wdY}
                        name= "plot-wind-direction"
                        type= "scatter"
                        decription = "this is decription"
                        name1= {this.props.selectedFarm}
                        width= {window.innerWidth-120}
                        height= {window.innerHeight/2.5}
                        color= "rgb(192, 80, 78)"
                        loader = {this.props.loader}
                        noData = {this.props.noDataDirection}
                        saveChart={true}
                    />
                </div>

            </div>
        )
    }
}
export default WindResourcesCharts;