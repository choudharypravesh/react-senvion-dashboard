/* global Plotly */

import React from 'react';
import ReactCss from '../../../public/styles/containers/admin/Reports.css'
import { FormGroup } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import Select from 'react-select'
import DatePicker from 'react-bootstrap-date-picker';


class Reports extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            initialDate: '2016-01-01',
            finalDate: "2016-01-02",
            farms : [
                { value: 'Germany', label: 'Germany' },
                { value: 'Canada', label: 'Canada' }
            ],
            turbines : [
                { value: 'Service hub 1', label: 'Service hub 1' },
                { value: 'Service hub 2', label: 'Service hub 2' }
            ],
            errors: [
                {
                    error_code: 8000,
                    cause: "Maintenance",
                    occurrences: 13,
                    duration: 34.1
                },
                {
                    error_code: 8001,
                    cause: "Cable Twisted : Right(2-3 Turns)",
                    occurrences: 22,
                    duration: 12.7
                },
                {
                    error_code: 8002,
                    cause: "Cable Twisted : Left(2-3 Turns)",
                    occurrences: 5,
                    duration: 15
                },
                {
                    error_code: 8003,
                    cause: "Generator Heating",
                    occurrences: 1,
                    duration: 40
                },
                {
                    error_code: 8004,
                    cause: "Test Security System",
                    occurrences: 9,
                    duration: 84.1
                }
            ]
        }
    }


    componentDidMount() {
        let xValues = [1.36, 2.26,4.98,6.51, 7.48, 7.51, 15.21, 17.52]
        let yValues = ['1023&nbsp;', '1024&nbsp;', '2234&nbsp;', '2321&nbsp;', '2333&nbsp;', '2224&nbsp;', '6443&nbsp;', '2252&nbsp;', '2244&nbsp;', '7544&nbsp;']

        var data1 = [{
            type: 'bar',
            x: xValues,
            y: yValues,
            orientation: 'h',
            marker: {
                color: 'rgba(10,171,96,0.9)',
                line: {
                    color: 'rgba(50,171,96,1.0)',
                    width: 1
                }
            }
        }];

        var layout1 = {
            title: "Time to Resolve (Hours) - Mean",
            displayModeBar: false,
            margin: {
                t: 50, r: 0, l: 50
            },
            width: window.innerWidth/2.2,
            height: 400,
            annotations: [
            ]
        }

        var data2 = [{
            type: 'bar',
            x: xValues,
            y: yValues,
            orientation: 'h',
            marker: {
                color: 'rgba(10,171,96,0.9)',
                line: {
                    color: 'rgba(50,171,96,1.0)',
                    width: 1
                }
            }
        }];

        var layout2 = {
            title: "Time to Resolve (Hours) - Standard Deviation",
            displayModeBar: false,
            margin: {
                t: 50, r: 0, l: 60
            },
            width: window.innerWidth/2.2,
            height: 400,
            annotations: []
        }


        var options = {
            scrollZoom: false, // lets us scroll to zoom in and out - works
            showLink: false, // removes the link to edit on plotly - works
            modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d'],
            //modeBarButtonsToAdd: ['lasso2d'],
            displayLogo: false, // this one also seems to not work
            displayModeBar: false, //this one does work
        };


        /*for ( var i = 0 ; i < xValues.length ; i++ ) {
            var result = {
                xref: 'x1',
                yref: 'y1',
                x: xValues[i]+2.3,
                y: yValues[i],
                text: xValues[i] + '%',
                font: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(50, 171, 96)'
                },
                showarrow: false
            };

            layout1.annotations.push(result);
            layout2.annotations.push(result);
        }*/

        Plotly.newPlot('time-taken', data1, layout1, options);
        Plotly.newPlot('standard-deviation', data2, layout2, options);

    }


    logChange(val) {
        console.log("Selected: " + val);

    }


    handleDateChangeInitial(initialDate) {

    }


    handleDateChangeFinal(finalDate) {

    }



    render() {

        function priceFormatter(cell, row){
            return ""+cell;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }

        function progressFormatter(cell, row) {
            const now = Math.floor((Math.random() * 100) + 1);
            return <div className="flex-container">
                <span className="data-text">{cell}</span>
                <ProgressBar now={cell}/>
            </div>;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }

        return(
            <div className="reports-container"><br/><br/>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="font-12 flex-container-nowrap flex-end-h">
                            <div className="flex-container-nowrap row">
                                <div>&nbsp;&nbsp;Duration&nbsp;&nbsp;</div>
                                <div className=" col-sm-4">
                                    <FormGroup>
                                        {/*<ControlLabel>From</ControlLabel>*/}
                                        <DatePicker
                                            id="example-datepicker"
                                            value={this.state.initialDate}
                                            onChange={this.handleDateChangeInitial}
                                            showClearButton={false}/>
                                        {/* <HelpBlock>Help</HelpBlock>*/}
                                    </FormGroup>
                                </div>
                                <div>To</div>
                                <div className="col-sm-4">
                                    <FormGroup>
                                        {/*<ControlLabel>To</ControlLabel>*/}
                                        <DatePicker
                                            id="example-datepicker"
                                            value={this.state.finalDate}
                                            onChange={this.handleDateChangeFinal}
                                            showClearButton={false}/>
                                        {/*<HelpBlock>Help</HelpBlock>*/}
                                    </FormGroup>
                                </div>
                            </div>
                            <div>Country&nbsp;&nbsp;</div>
                            <Select
                                name="form-field-name"
                                value="Germany"
                                options={this.state.farms}
                                onChange={this.logChange}
                            />
                            <div>&nbsp;&nbsp;Service Hub&nbsp;&nbsp;</div>
                            <Select
                                name="form-field-name"
                                value="Service hub 1"
                                options={this.state.turbines}
                                onChange={this.logChange}
                            />
                            <div className="date-go-button">
                                <button onClick={this.reloadGraphs} className="btn btn-success">Go</button>
                            </div>
                        </div>
                    </div>
                </div><br/><br/><br/>
                <div className="row">
                    <div className="col-lg-6">
                        <div id="time-taken"></div>
                    </div>
                    <div className="col-lg-6">
                        <div id="standard-deviation"></div>
                    </div>
                </div><br/><br/><br/><br/>

                <div className="row">
                    <div className="col-lg-12"><br/><br/>
                        <div className="heading-title">Status Code/Error Code Breakdown</div>
                        <div className="table-container">
                            <BootstrapTable data={this.state.errors} striped={false} hover={true}>
                                <TableHeaderColumn dataField="error_code" isKey={true} dataAlign="center" dataSort={true}>Error Code</TableHeaderColumn>
                                <TableHeaderColumn dataField="cause" dataFormat={priceFormatter}>Observation/Cause</TableHeaderColumn>
                                <TableHeaderColumn dataField="occurrences" dataFormat={progressFormatter}>Number of Occurrences</TableHeaderColumn>
                                <TableHeaderColumn dataField="duration" dataFormat={progressFormatter}>Duration</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reports;