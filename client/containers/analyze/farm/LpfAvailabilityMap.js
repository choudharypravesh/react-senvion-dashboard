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

class LpfAvailabilityMap extends React.Component{
    componentDidMount(){
        let {nextActionCreators, data} = this.props.getNextActionsCreatorsAndData();
        this.props.dispatch(selectFarmAndCallNextAction(this.props.farmForDropDown, nextActionCreators, data));
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
                        title= "Availability-Time"
                        x1= {this.props.availabilityX}
                        y1= {this.props.availabilityY}
                        name= "plot-availability"
                        type= "scatter"
                        name1= "Availability"
                        decription = "this is decription"
                        overlaying="y"
                        side="right"
                        noData={this.props.noData}
                        width= {window.innerWidth-120}
                        height= {window.innerHeight/2.8}
                        loader = {this.props.availLoaderStatus}
                        saveChart={true}
                    />
               </div>
                <div className="top-buffer-2" style={plotStyles}>
                    <Chart
                        title= "Availability-PBA"
                        x1= {this.props.farmPbaX}
                        y1= {this.props.farmPbaY}
                        name= "plot-availability-pba"
                        type= "scatter"
                        name1= "Pba"
                        decription = "this is decription"
                        overlaying="y"
                        side="right"
                        noData={this.props.pbaNoData}
                        width= {window.innerWidth-120}
                        height= {window.innerHeight/2.8}
                        loader = {this.props.availLoaderStatus}
                        saveChart={true}
                    />
                </div>
            </div>
        )
    }
}
export default LpfAvailabilityMap;
