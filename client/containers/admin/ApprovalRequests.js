import React from 'react';
import ApprovalRequestsCss from '../../../public/styles/containers/admin/ApprovalRequests.css';
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';

import axios from 'axios';

import FaList from 'react-icons/lib/fa/list'
import FaCalender from 'react-icons/lib/fa/calendar'
import FaMap from 'react-icons/lib/fa/map-marker'
import ReactCookie from 'react-cookie';

class ApprovalRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            crossImage: require('../../../public/images/icons/cross-red-circular-button.svg'),
            tickImage: require('../../../public/images/icons/checked.svg')

        }

    }


    componentDidMount() {
        var self = this;
        axios.get('/api/admin/get/serviceOrderApprovals')
            .then(function(response) {
                var data = response.data.data;
                console.log("this is the original data");
                console.log(data);
                self.setState({tableData: response.data.data});
            }).catch(function(err) {
            console.log(err);
            window.alert("Faliure "+err);
        });
    }

    actionOnSolution(row, index) {
        let user = ReactCookie.load('user');
        var self = this;
        let data = {
            approval_status: null,
            approved_by: user.user_id,
            order_id: row.order_id
        }
        console.log("this is user data: ",user);
        console.log(data);
        if(index == 1) {
            data.approval_status = true;
            axios.post('/api/admin/updateStatus/serviceOrderApprovals', 'data='+JSON.stringify(data))
                .then(function(response) {
                    console.log(response.data.data);
                    self.setState({tableData: response.data.data});
                }).catch(function(err) {
                console.log(err);
                window.alert("Faliure "+err);
            });
        } else {
            data.approval_status = false;
            axios.post('/api/admin/updateStatus/serviceOrderApprovals', 'data='+JSON.stringify(data))
                .then(function(response) {
                    console.log(response.data.data);
                    self.setState({tableData: response.data.data});
                }).catch(function(err) {
                console.log(err);
                window.alert("Faliure "+err);
            });
        }
    }

    changeChatButtonsMouseIn() {

    }

    buttonFunction(cell, row) {
        if(row.approval_status == null & row.order_status == 3) {
            return <div className="text-center">
                <div className="flex-container">
                    <div onClick={() => {this.actionOnSolution(row, 1)}}>
                        {/* <FaCheck className="confirm-icons tick"/>*/}
                        <img onMouseEnter={() => this.changeChatButtonsMouseIn('tick')} src={this.state.tickImage} width='20px'/>
                    </div>&nbsp;&nbsp;
                    <div onClick={() => {this.actionOnSolution(row, 2)}}>
                        <img onMouseEnter={() => this.changeChatButtonsMouseIn('cross')} src={this.state.crossImage} width='20px'/>
                    </div>
                </div>
            </div>
        }
    }




    render() {

        function priceFormatter(cell, row){
            return ""+cell;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }

        function statusFormatter(cell, row) {
            console.log(cell);
            if(cell == null) {
                return '<span class="label label-default">Pending</span>';
            } else if(cell == true) {
                return '<span class="label label-success">Approved</span>'
            } else if(cell == false) {
                return '<span class="label label-danger">Rejected</span>'
            } else {
                return '<span class="label label-default">Pending</span>';
            }
        }

        function orderStatusFormatter(order_status, row) {
            if(order_status == null) {
                return '<span class="label label-default">Pending</span>';
            } else if(order_status == 1) {
                return '<span class="label label-success">Approved</span>'
            } else if(order_status == 2) {
                return '<span class="label label-danger">Rejected</span>'
            } else if(order_status == 3) {
                return '<span class="label label-primary">Completed</span>'
            }
        }


        return(
            <div className="approval-container body-wrapper" id="approve-request"><br/>
                <div className="flex-container flex-sb-h">
                    <div className="heading-title"></div>
                    <div className="btn-group" role="group">

                    </div>
                </div>
              <div className="table-container">
                <BootstrapTable data={this.state.tableData} striped={false} hover={true}>
                  <TableHeaderColumn dataField="order_id" isKey={true} dataAlign="center" dataSort={true}>Order No.</TableHeaderColumn>
                  <TableHeaderColumn dataField="turbine_id" dataSort={true}>Turbine No.</TableHeaderColumn>
                  <TableHeaderColumn dataField="model" dataFormat={priceFormatter}>Model</TableHeaderColumn>
                  <TableHeaderColumn dataField="farm_name" dataFormat={priceFormatter}>Farm</TableHeaderColumn>
                  <TableHeaderColumn dataField="description" dataFormat={priceFormatter}>Description</TableHeaderColumn>
                  <TableHeaderColumn dataField="assigned_to" dataFormat={priceFormatter}>Assiged To</TableHeaderColumn>
                  <TableHeaderColumn dataField="order_status" dataFormat={orderStatusFormatter}>Order Status</TableHeaderColumn>
                  <TableHeaderColumn dataField="approval_status" dataFormat={statusFormatter}>Status</TableHeaderColumn>
                  <TableHeaderColumn dataField="approval" dataFormat={this.buttonFunction.bind(this)}>Action</TableHeaderColumn>

                </BootstrapTable>
              </div>
            </div>
        )
    }
}

export default ApprovalRequests