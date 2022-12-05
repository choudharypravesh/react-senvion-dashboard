import React from 'react'
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from'react-bootstrap-table';
import DatePicker from 'react-bootstrap-date-picker';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Select from 'react-select'
import { FormGroup } from 'react-bootstrap';
import TimeManagementCss from '../../../../public/styles/containers/technician/TimeManagement.css'
import LogHoursPopup from './LogHoursPopup'


class TimeManagement extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tableData: [
                {
                    week: 1,
                    activity_type: "Training",
                    order_no: "HILBERT TRAINING",
                    start_date: "Feb 5, 2017",
                    start_time: "14:35",
                    end_time: "15:40",
                    duration: "2 hours",
                    travel_time: "3 hours",
                    KMs: "2"
                },
                {
                    week: 2,
                    activity_type: "Arrival",
                    order_no: "00003022675",
                    start_date: "Feb 5, 2017",
                    start_time: "16:35",
                    end_time: "18:40",
                    duration: "2 hours",
                    travel_time: "3 hours",
                    KMs: "2"
                },
                {
                    week: 1,
                    activity_type: "Working time",
                    order_no: "00003022889",
                    start_date: "Feb 5, 2017",
                    start_time: "19:35",
                    end_time: "23:40",
                    duration: "2 hours",
                    travel_time: "1 hours",
                    KMs: "2"
                },
                {
                    week: 1,
                    activity_type: "Preparation",
                    order_no: "00003025489",
                    start_date: "Feb 5, 2017",
                    start_time: "14:35",
                    end_time: "15:40",
                    duration: "5 hours",
                    travel_time: "3 hours",
                    KMs: "2"
                }
            ],
            week: [
                {value: "1", label: "1"}
                ],
            initialDate: localStorage.initialDate ? localStorage.initialDate : '2016-01-01',
            finalDate: localStorage.finalDate ? localStorage.finalDate : '2016-01-02',
            showPopup: false
        }

        this.closePopup = this.closePopup.bind(this);
        this.openLogHoursPopup = this.openLogHoursPopup.bind(this);
    }

    closePopup(e) {
        this.setState({showPopup: false})
    }

    openLogHoursPopup() {
        this.setState({showPopup: true})
    }


    render() {

        function priceFormatter(cell, row) {
            return ""+cell;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }

        function dateFormatter(cell, row) {
            var date = new Date(cell);
            return date.toDateString();
        }

        return(
            <div className="time-container body-wrapper"><br/><br/><br/>
                <div className="flex-container flex-sb-h">
                    <div className="green-buttons flex-container">
                        <div>
                            <button onClick={this.openLogHoursPopup} className="btn btn-success">Log Hours</button>
                        </div>
                        <div>&nbsp;&nbsp;
                            <button className="btn btn-success">Over Time</button>
                        </div>
                    </div>
                    <div className="filters flex-container">
                        <div className="font-12 flex-container-nowrap flex-end-h">
                            <div>Week&nbsp;&nbsp;</div>
                            <div className="">
                                <Select
                                    name="form-field-name"
                                    value="1"
                                    options={this.state.week}
                                    onChange={this.logChangeTurbine1}
                                    clearable={false}
                                />
                            </div>
                            <div>&nbsp;&nbsp;From&nbsp;&nbsp;</div>
                            <div className="">
                                <FormGroup>
                                    <DatePicker
                                        id="example-datepicker"
                                        value={this.state.initialDate}
                                        onChange={this.handleDateChangeInitial}
                                        showClearButton={false}
                                        dateFormat="DD/MM/YYYY"/>
                                    {/* <HelpBlock>Help</HelpBlock>*/}
                                </FormGroup>
                            </div>
                            <div>&nbsp;&nbsp;To&nbsp;&nbsp;</div>
                            <div className="">
                                <FormGroup>
                                    <DatePicker
                                        id="example-datepicker"
                                        value={this.state.finalDate}
                                        onChange={this.handleDateChangeFinal}
                                        showClearButton={false}
                                        dateFormat="DD/MM/YYYY"/>
                                    {/*<HelpBlock>Help</HelpBlock>*/}
                                </FormGroup>
                            </div>
                        </div>
                    </div>

                    <div className="table-container">
                        <BootstrapTable data={this.state.tableData} pagination={false} striped={false} hover={true} options={ this.options }>
                            <TableHeaderColumn width='70' dataField="week" isKey={true} dataAlign="center" dataSort={true}>Week No.</TableHeaderColumn>
                            <TableHeaderColumn width='70' dataField="activity_type" dataAlign="center" dataSort={true}>Activity type</TableHeaderColumn>
                            <TableHeaderColumn width='150' dataField="order_no" dataAlign="center" dataSort={true}>Service Order Number/Description</TableHeaderColumn>
                            <TableHeaderColumn width='70' dataField="start_date" dataSort={true}>Start Date</TableHeaderColumn>
                            <TableHeaderColumn width='70' dataField="start_time" dataFormat={priceFormatter}>Start Time</TableHeaderColumn>
                            <TableHeaderColumn width='70' dataField="end_time" dataFormat={priceFormatter}>End Time</TableHeaderColumn>
                            <TableHeaderColumn width='90' dataField="duration" dataFormat={priceFormatter}>Duration</TableHeaderColumn>
                            <TableHeaderColumn width='130' dataField="travel_time" dataFormat={priceFormatter}>Travel Time</TableHeaderColumn>
                            <TableHeaderColumn width='130' dataField="KMs" dataFormat={priceFormatter}>KMs</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
                <LogHoursPopup closePopup={this.closePopup} show={this.state.showPopup}/>
            </div>
        )
    }
}






export default TimeManagement