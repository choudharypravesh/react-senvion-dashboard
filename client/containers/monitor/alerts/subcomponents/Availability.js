import React from 'react'
import axios from 'axios'
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import {FormGroup } from 'react-bootstrap';
import CustomDatePicker from '../../../../components/CustomDatePicker/CustomDatePicker';
import moment from  'moment';
import _ from 'underscore';
import Chart from '../../../../components/PlotlyChart/skeleton';
import {getTurbineAvailabilityData} from '../../../analyze/turbine/TurbineActions'
import {getTurbineAvailabilityData_Alerts} from '../AlertsDetailsActions'

class Availability extends React.Component {
    constructor(props) {
        super(props)
     this.getData = this.getData.bind(this);
    }

    componentDidMount() {


        let data=this.getData();
        if(this.props.mode === 'alerts'){
            this.props.dispatch(getTurbineAvailabilityData_Alerts(data));
        }else{
            this.props.dispatch(getTurbineAvailabilityData(data));
        }

    }

    getData(){
        let data = {
            turbines: this.props.selectedTurbine,
            start_date: this.props.initialDate,
            end_date: this.props.finalDate,
            id: 0
        }
        return data;
    }


    render() {
        var plotStyles = {
            /*marginRight: "14px",*/
            marginBottom: "14px",
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '4px',
        }

        return(
            <div className="turbinekpis-container">
                <div className="font-12 flex-end-h flex-container-nowrap">
                    <div className="flex-container-nowrap">
                    </div>
                </div>

                <div className="top-buffer-2" style={plotStyles}>
                    <Chart
                        title= "Availability (time)"
                        x1= {this.props.plot1.x}
                        y1= {this.props.plot1.y}
                        name= "plot-availability"
                        type= "scatter"
                        name1= "Availability(time)"
                        overlaying="y"
                        side="right"
                        width= {window.innerWidth-120}
                        height= {window.innerHeight/3}
                        finalDate={this.props.finalDate}
                        loader={this.props.loaderStatusTurbineAvail}
                        noData = {this.props.noDataAvail}
                        ref = {(chart) => {this.chart = chart}}
                        saveChart={true}
                    />
                </div>
                <div className="top-buffer-2" style={plotStyles}>
                    <Chart
                        title= "Availability (production)"
                        x1= {this.props.plot2.x}
                        y1= {this.props.plot2.y}
                        name= "plot-availability-pba"
                        type= "scatter"
                        name1= "Pba"
                        overlaying="y"
                        side="right"
                        width= {window.innerWidth-120}
                        height= {window.innerHeight/3}
                        finalDate={this.props.finalDate}
                        loader={this.props.loaderStatusTurbineAvail}
                        noData = {this.props.noDataPba}
                        saveChart={true}
                    />
                </div>
            </div>
        )
    }
}



export default Availability;
