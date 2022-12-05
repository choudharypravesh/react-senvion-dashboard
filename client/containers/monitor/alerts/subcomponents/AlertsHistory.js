/* global Plotly */

// App.js
import React from 'react';
import axios from 'axios';
import AlertCss from '../../../../../public/styles/containers/analyze/Alerts.css'
import _ from 'underscore'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-dates/lib/css/_datepicker.css';
import {Link} from 'react-router';
import FaPlus from 'react-icons/lib/fa/plus-circle';
import FaList from 'react-icons/lib/fa/list';
import FaAreaChart from 'react-icons/lib/fa/area-chart'
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css'
import VirtualModelCss from '../../../../../public/styles/containers/analyze/VirtualModel.css'
import CreateServiceOrderPopup from '../../../../components/CreateServiceOrder/CreateServiceOrderModal'
import {getAlertsByComponentTurbine} from '../../../analyze/turbine/TurbineActions'
import {getAlertsByComponentTurbine_Alerts} from '../AlertsDetailsActions'
import Chart from "../../../../components/PlotlyChart/skeleton";
import AppConstants from "../../../../constants/AppConstants"
import moment from 'moment';
import Loader from '../../../../components/Loader/Loader'

class AlertHistory extends React.Component {
    constructor(props) {
        super(props)


        this.options = {
            onPageChange: this.onPageChange.bind(this),

            page: 1,  // which page you want to show as default

            sizePerPage: 4,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: false,  // Accept bool or function
            paginationPosition: 'top'  // default is bottom, top and both is all available

        };
        this.resizeGraphs = this.resizeGraphs.bind(this);

        this.onPageChange = this.onPageChange.bind(this);


    }

    getData(){
        let data = {
            date_identified: this.props.finalDate,
            turbine_id: this.props.selectedTurbine
        }
        let date_identified = moment(this.props.selectedAlert.date_identified).format('YYYY-MM-DD')
        let data1 = {
                    alerts: this.props.selectedAlert && this.props.selectedAlert.alerts?this.props.selectedAlert.alerts:"",
                    date_identified: date_identified,
                    turbine_id: this.props.selectedTurbine
                }
        return {data,data1};
    }

    componentDidMount() {
        var self = this;
        let {data,data1}=this.getData();
        if(this.props.mode === 'alerts'){
            self.props.dispatch(getAlertsByComponentTurbine_Alerts(data1))
        }else{
            self.props.dispatch(getAlertsByComponentTurbine(data))
        }
        window.addEventListener("resize", function() {
            self.resizeGraphs();
        });
    };

    componentWillUnmount(){
        if(this.props.mode === 'alerts'){
            this.props.dispatch({
                type:AppConstants.ALERTS_LOADING_TURBINE_ALERTS_COMP,
                payload:{loaderStatus:true}
            })
            this.props.dispatch({
                type:AppConstants.ALERTS_LOADING_TURBINE_ALERTS_MONTH,
                payload:{loaderStatus:true}
            })
            this.props.dispatch({
                type:AppConstants.ALERTS_LOADING_TURBINE_ALERTS_HISTORY,
                payload:{loaderStatus:true}
            })
        }else {
            this.props.dispatch({
                type:AppConstants.LOADING_TURBINE_ALERTS_COMP,
                payload:{loaderStatus:true}
            })
            this.props.dispatch({
                type:AppConstants.LOADING_TURBINE_ALERTS_MONTH,
                payload:{loaderStatus:true}
            })
        }
    }

    onPageChange(page, sizePerPage) {
        /*alert(`page: ${page}, sizePerPage: ${sizePerPage}`);*/
    }
    resizeGraphs() {
        var self = this;
        let width = window.innerWidth/2.2
        let height = window.innerHeight/3
        console.log("resize");

        var update = {
            width: width,
            height: height
        };
        Plotly.relayout('time-taken', update)
        Plotly.relayout('myDiv', update)
    }


    render() {

        function priceFormatter(cell, row){
            return ""+cell;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }

        function dateFormatter(cell, row) {
            var date = new Date(cell);
            return date.toDateString();
        }

        function plotHeights() {
            if(window.innerHeight > 800) {
                return window.innerHeight/3
            } else {
                return window.innerHeight/2
            }
        }

        function statusFormatter(status, row) {
            if(status == 'Pending') {
                return '<span class="label label-default">Pending</span>';
            } else if(status == 'Ignored') {
                return '<span class="label label-danger">Critical</span>'
            } else if(status == 'Closed') {
                return '<span class="label label-success">Minor</span>'
            } else if(status == 3) {
                return '<span class="label label-warning">Major</span>'
            }
        }

        var plotStyles = {
            marginBottom: "14px",
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '1px',
        };

        return (
            <div className="alerts-history-container" id="virtual-model-graphs">
                <div className="flex-container-nowrap flex-sb-h top-buffer-2">
                    <div>
                        <div style={plotStyles}>
                            <Chart
                                x1={this.props.plot2.x}
                                y1={this.props.plot2.y}
                                margins={{t: 0, r: 60, l: 60, b:0}}
                                title = "Alerts By Date Last 1 Year"
                                type="barchart"
                                name="alertsbymonth"
                                width = {window.innerWidth/2.2}
                                height = {plotHeights()}
                                xaxisType="date"
                                loader={this.props.loaderStatusAlertByMonth}
                                noData = {this.props.alertsByMonthNoData}
                                saveChart={true}
                            />
                        </div>

                    </div>
                        <div style={plotStyles}>
                            <Chart
                                x1={this.props.plot1.x}
                                yaxisTitle = {this.props.selectedAlert && this.props.selectedAlert.component_name?this.props.selectedAlert.component_name:""}
                                title="Alerts by Component"
                                orientation="h"
                                type="barchart"
                                name="alertsbycomp"
                                width = {window.innerWidth/2.2}
                                margins={{t: 0, r: 60, l: 60, b:0}}
                                height = {plotHeights()}
                                xaxisType="-"
                                loader={this.props.loaderStatusAlertByComp}
                                noData = {this.props.alertsByCompNoData}
                                saveChart={true}
                            />
                        </div>
                </div>
                {
                    <div className="top-buffer-2">
                        <div className="font-12 wrapper charts-wrapper">
                            <div className="details-table"><br/><br/>
                                <div className="table-container">
                                    <br/><br/>
                                    {!this.props.loaderStatusAlertsHistory ?
                                        <BootstrapTable data={this.props.historyofAlerts}  pagination={false} striped={false} hover={true} options={ this.options }>
                                            <TableHeaderColumn width='70' dataField="id" isKey={true} dataAlign="center" dataSort={true}>Alert ID</TableHeaderColumn>
                                            <TableHeaderColumn width='150' dataField="alerts" dataAlign="center" dataSort={true}>Alerts</TableHeaderColumn>
                                            <TableHeaderColumn width='70' dataField="priority" dataSort={true}>Priority</TableHeaderColumn>
                                            <TableHeaderColumn width='70' dataField="farm_name" dataFormat={priceFormatter}>Farm</TableHeaderColumn>
                                            <TableHeaderColumn width='70' dataField="turbine_id" dataFormat={priceFormatter}>Turbine ID</TableHeaderColumn>
                                            <TableHeaderColumn width='90' dataField="model" dataFormat={priceFormatter}>Turbine Type</TableHeaderColumn>
                                            <TableHeaderColumn width='130' dataField="date_identified" dataFormat={dateFormatter}>Date Identified</TableHeaderColumn>
                                            <TableHeaderColumn width='90' dataField="category" dataFormat={priceFormatter}>Category</TableHeaderColumn>
                                            <TableHeaderColumn width='120' dataField="source" dataFormat={priceFormatter}>Source</TableHeaderColumn>
                                        </BootstrapTable>
                                    :
                                        <Loader height={300}/>
                                    }
                                </div>
                            </div><br/><br/>
                        </div>
                    </div>

                }

            </div>
        );
    }
}




export default AlertHistory;


