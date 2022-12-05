import React from 'react';
import TechnicianCss from '../../../../public/styles/containers/technician/OrdersListView.css';
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import classnames from 'classnames';
import { Link } from 'react-router'
import ReactCookie from 'react-cookie';
import FaList from 'react-icons/lib/fa/list';
import FaCalender from 'react-icons/lib/fa/calendar';
import FaMarker from 'react-icons/lib/fa/map-marker'
import FaCheck from 'react-icons/lib/fa/check-circle-o'
import FaTimes from 'react-icons/lib/fa/times-circle-o'
import ToggleDisplay from 'react-toggle-display';
import _ from 'underscore'
import { connect } from 'react-redux'
import { getOrdersForTechnician, updateOrdersForTechnician } from './OrderListActions'

class Troubleshoot extends React.Component {
    constructor(props) {
        super(props);
        this.getOrdersForTechnician = this.getOrdersForTechnician.bind(this);
        this.getOrdersForTechnician();
        this.changeChatButtonsMouseIn = this.changeChatButtonsMouseIn.bind(this);
        this.actionOnSolution = this.actionOnSolution.bind(this);
    }


    actionOnSolution(row, index) {
        const { dispatch } = this.props;
        let data = {
            order_status: 0,
            submission_status: false,
            approval_status: null,
            order_id: row.order_id
        }

        if(index == 1) {
            data.order_status = 1;
            dispatch(updateOrdersForTechnician(data))
        } else if(index == 2) {
            data.order_status = 2;
            dispatch(updateOrdersForTechnician(data))
        } else {
            localStorage.playOrderNumber = row.order_id
            localStorage.orderSelected = JSON.stringify(row);
            window.open("/service_assist/order/troubleshoot", '_blank');
        }
    }

    buttonFunction(cell, row) {
        return <div className="text-center">
            {/*<button type="button"
             id="approve-steps"
             onClick={() => {this.actionOnSolution(row, 1)}}
             className="btn-sm btn-success border-0">
             </button>*/}
            <div className="flex-container flex-start-h">
                <div>
                    <ToggleDisplay show={row.order_status == 0}>
                        <div className="flex-container">
                            <div onClick={() => {this.actionOnSolution(row, 1)}}>
                                {/* <FaCheck className="confirm-icons tick"/>*/}
                                <img onMouseEnter={() => this.changeChatButtonsMouseIn('tick')} src={this.props.tickImage} width='20px'/>
                            </div>&nbsp;&nbsp;
                            <div onClick={() => {this.actionOnSolution(row, 2)}}>
                                <img onMouseEnter={() => this.changeChatButtonsMouseIn('cross')} src={this.props.crossImage} width='20px'/>
                            </div>
                        </div>
                    </ToggleDisplay>
                </div>
                <div>
                    <ToggleDisplay show={row.order_status == 1}>
                        <div onClick={() => {this.actionOnSolution(row, 3)}}>
                            <img onMouseEnter={() => this.changeChatButtonsMouseIn('play')} src={this.props.playImage} width='20px'/>
                        </div>
                    </ToggleDisplay>
                </div>
            </div>
        </div>
    }

    getOrdersForTechnician() {
        const { dispatch } = this.props;

        dispatch(getOrdersForTechnician());
    }


    changeChatButtonsMouseIn(buttonType) {

    }




    render() {

        function priceFormatter(cell, row){
            return ""+cell;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }

        function statusFormatter(order_status, row) {
            if(order_status == 0) {
                return '<span class="label label-default">Pending</span>';
            } else if(order_status == 1) {
                return '<span class="label label-success">Accepted</span>'
            } else if(order_status == 2) {
                return '<span class="label label-danger">Rejected</span>'
            } else if(order_status == 3) {
                return '<span class="label label-primary">Completed</span>'
            }
        }

        function startDateFormatter(cell, row) {
            console.log(cell)
            if(cell == null) {
                return "8/3/2017"
            } else {
                return ""+cell;
            }
        }

        function endDateFormatter(cell, row) {
            if(cell == null) {
                return "10/3/2017"
            } else {
                return ""+cell;
            }
        }

        function startTimeFormatter(cell, row) {
            if(cell == null) {
                return "09:00 AM"
            } else {
                return ""+cell+" AM";
            }
        }

        function endTimeFormatter(cell, row) {
            if(cell == null) {
                return "05:00 PM"
            } else {
                return ""+cell+" PM";
            }
        }


        return(
            <div className="troubleshoot-container body-wrapper" id="start-troubleshoot">
                <div className="flex-container flex-sb-h content-heading-margins">
                    <div className="margin-top heading-title"></div>
                    <div className="btn-group" role="group">
                        <Link to="/service-assist/orders-list-view" className="btn btn-default active"><FaList/></Link>
                        <Link to="/calender-view" className="btn btn-default"><FaCalender/></Link>
                        <Link to="/service-assist/map-view" className="btn btn-default"><FaMarker/></Link>
                    </div>
                </div>
                <div className="table-container">
                    <BootstrapTable data={this.props.orders} pagination={true} striped={false} hover={true} options={ this.props.options }>
                        <TableHeaderColumn dataField="order_id" isKey={true} dataAlign="center" dataSort={true}>Order No.</TableHeaderColumn>
                        <TableHeaderColumn dataField="turbine_id" dataFormat={priceFormatter}>Turbine Number</TableHeaderColumn>
                        <TableHeaderColumn dataField="model" dataSort={true}>Model</TableHeaderColumn>
                        <TableHeaderColumn dataField="farm_name" dataFormat={priceFormatter}>Farm</TableHeaderColumn>
                        <TableHeaderColumn dataField="description" dataFormat={priceFormatter}>Description</TableHeaderColumn>
                        <TableHeaderColumn dataField="start_date" dataFormat={startDateFormatter}>Start Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="end_date" dataFormat={endDateFormatter}>End Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="start_time" dataFormat={startTimeFormatter}>Start Time</TableHeaderColumn>
                        <TableHeaderColumn dataField="end_time" dataFormat={endTimeFormatter}>End Time</TableHeaderColumn>
                        <TableHeaderColumn dataField="order_status" dataFormat={statusFormatter}>Status</TableHeaderColumn>
                        <TableHeaderColumn dataField="approval" dataFormat={this.buttonFunction.bind(this)}>Actions</TableHeaderColumn>
                        <TableHeaderColumn hidden={true} dataField="recommended_observations" dataFormat={priceFormatter}></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    const { OrderListData } = state
    let orderList = {
      orders: OrderListData.get('orders'),
      playImage:  OrderListData.get('playImage'),
      crossImage:  OrderListData.get('crossImage'),
      tickImage:  OrderListData.get('tickImage'),
      options :  OrderListData.get('options')
    }
    return orderList
};


export default connect(mapStateToProps)(Troubleshoot);
