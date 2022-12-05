import React from 'react';
import {Link} from 'react-router';
import AnomaliesCss from '../../../../../public/styles/containers/technician/analyze/Anomalies.css'
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import axios from 'axios';

class ApprovalRequests extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        var anomalies = [{
            alert_id: 1,
            alert: " Gearbox failure",
            priority: "High",
            turbine_location: "Maida1",
            turbine_number: 90249,
            date: "13th March 2017",
            status: 2
        },{
            alert_id: 2,
            alert: "Yaw Misalign",
            priority: "High",
            turbine_location: "Maida1",
            turbine_number: 90249,
            date: "13th March 2017",
            status: 2
        },{
            alert_id: 3,
            alert: "Pitch Error",
            priority: "High",
            turbine_location: "Maida1",
            turbine_number: 90249,
            date: "13th March 2017",
            status: 3
        },{
            alert_id: 4,
            alert: "Generator failure",
            priority: "High",
            turbine_location: "Maida1",
            turbine_number: 90249,
            date: "13th March 2017",
            status: 1
        }];

        function priceFormatter(cell, row){
            return ""+cell;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }

        function buttonFormatter(cell, row){
            return '<a href="/chart" class="btn btn-sm btn-default">View</a>'
        }


        function statusFormatter(status, row) {
            if(status == null) {
                return '<span class="label label-default">Pending</span>';
            } else if(status == 1) {
                return '<span class="label label-danger">Critical</span>'
            } else if(status == 2) {
                return '<span class="label label-success">Minor</span>'
            } else if(status == 3) {
                return '<span class="label label-warning">Major</span>'
            }
        }


        return(
            <div className="approval-container body-wrapper" id="approve-request"><br/>
                <div className="flex-container flex-sb-h content-heading-margins">
                    <div className="heading-title">Alerts</div>
                    <div className="btn-group" role="group">

                    </div>
                </div>
                <div className="table-container">
                    <BootstrapTable data={anomalies} striped={false} hover={true}>
                        <TableHeaderColumn dataField="alert_id" isKey={true} dataAlign="center" dataSort={true}>Alert ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="alert" dataAlign="center" dataSort={true}>Alerts</TableHeaderColumn>
                        <TableHeaderColumn dataField="priority" dataSort={true}>Priority</TableHeaderColumn>
                        <TableHeaderColumn dataField="turbine_location" dataFormat={priceFormatter}>Turbine Location</TableHeaderColumn>
                        <TableHeaderColumn dataField="turbine_number" dataFormat={priceFormatter}>Turbine Number</TableHeaderColumn>
                        <TableHeaderColumn dataField="date" dataFormat={priceFormatter}>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="status" dataFormat={statusFormatter}>Severity</TableHeaderColumn>
                        <TableHeaderColumn dataField="approval" dataFormat={buttonFormatter}>Reports</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
}

export default ApprovalRequests
