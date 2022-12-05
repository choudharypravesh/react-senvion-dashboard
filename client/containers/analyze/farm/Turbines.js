/* global Plotly */

import React from 'react';
import { FormGroup } from 'react-bootstrap';
import _ from 'underscore'
import TurbineCss from '../../../../public/styles/containers/analyze/farm/Turbines.css'
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import axios from 'axios'
import DatePicker from 'react-bootstrap-date-picker';
import 'react-dates/lib/css/_datepicker.css';
import { Link } from 'react-router'



class Turbines extends React.Component {
    constructor(props) {
        super(props)


        let focusedInput, focusedInput1 = null;
        if (props.autoFocus) {
            focusedInput = 'startDate';
            focusedInput1 = 'startDate';
        } else if (props.autoFocusEndDate) {
            focusedInput = 'endDate';
            focusedInput1 = 'endDate';
        }

        this.state = {
            focusedInput,
            focusedInput1,
            data: [],
            farms : [
                { value: 'maida1', label: 'Maida1' },
                { value: 'maida2', label: 'Maida2' }
            ],
            alarms : [
                { value: 'Number of Alarms', label: 'Number of Alarms' },
                { value: 'Number of Alarms', label: 'Number of Alarms' }
            ],
            availability : [
                { value: 'Availability', label: 'Availability' },
                { value: 'Availability1', label: 'Availability1' }
            ],
            production : [
                { value: 'Power Production', label: 'Power Production' },
                { value: 'Power Production', label: 'Power Production' }
            ],
            turbines : [
                { value: '91653', label: '91653' },
                { value: '91654', label: '91654' }
            ],
            variable : [
                { value: 'Nacelle_temp_2_median', label: 'Nacelle_temp_2_median' },
                { value: 'pressure', label: 'Pressure' }
            ],
            initialDate: '2016-01-01',
            finalDate: "2016-01-02",
            turbine1: 91654,
            turbine2: 91653
        };


        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onFocusChange1 = this.onFocusChange1.bind(this);
        this.handleDateChangeFinal = this.handleDateChangeFinal.bind(this);
        this.handleDateChangeInitial = this.handleDateChangeInitial.bind(this);


    }

    componentDidMount() {

        var self = this;

        var layout = {
            margin: {
                t: 80, r: 0, l: 100
            },
            showlegend: true,
            legend : {
                "orientation" : "h"
            },
            yaxis: {
                autotick: true,
                ticklen: 7,
                tickwidth: 1
            },
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 12,
                color: '#333333'
            },
            title: 'Farm Analysis- Heat Map view',
            height: window.innerHeight/1.3,
            width: window.innerWidth-100
        };

        var options = {
            scrollZoom: false, // lets us scroll to zoom in and out - works
            showLink: false, // removes the link to edit on plotly - works
            modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d'],
            //modeBarButtonsToAdd: ['lasso2d'],
            displayLogo: false, // this one also seems to not work
            displayModeBar: false, //this one does work
        };


        Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function(err, rows) {
            var YEAR = 2007;
            var continents = ['Asia', 'Europe', 'Africa', 'Oceania', 'Americas'];
            var POP_TO_PX_SIZE = 2e5;
            function unpack(rows, key) {
                return rows.map(function(row) { return row[key]; });
            }
            var leg = {
                'Asia': 92477 , 'Europe': 92478, 'Africa': 92479, 'Oceania': 92480, 'Americas': 92481
            }
            var data = continents.map(function(continent) {
                var rowsFiltered = rows.filter(function(row) {
                    return (row.continent === continent) && (+row.year === YEAR);
                });
                return {
                    mode: 'markers',
                    name: leg[continent],
                    x: unpack(rowsFiltered, 'lifeExp'),
                    y: unpack(rowsFiltered, 'gdpPercap'),
                    text: unpack(rowsFiltered, 'country'),
                    marker: {
                        sizemode: 'area',
                        size: unpack(rowsFiltered, 'pop'),
                        sizeref: POP_TO_PX_SIZE
                    }
                };
            });
            var layout = {
                xaxis: {title: 'Availability - Time based'},
                yaxis: {title: 'Number of Alarms', type: 'log'},
                hovermode: 'closest',
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 12,
                    color: '#333333'
                },
                showlegend: true,
                title: [92477,92478,92479,92480,92481],
                height: window.innerHeight/1.5,
                width: window.innerWidth-120
            };
            Plotly.plot('plot1', data, layout, {showLink: false, displayModeBar: false});
        });

    }


    onSelectMenuItem(index) {

    }

    logChange(val) {
        console.log("Selected: " + val);

    }

    onDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    onFocusChange1(focusedInput1) {
        this.setState({ focusedInput1 });
    }


    handleDateChangeInitial(initialDate) {
        localStorage.initialDate = initialDate;
    }


    handleDateChangeFinal(finalDate) {
        localStorage.finalDate = finalDate;
    }





    render() {

        var plotStyle= {
            border: '1px solid #ddd',

            backgroundColor: '#ffffff',
            borderRadius: '4px',

        }

        const { focusedInput, focusedInput1, startDate, endDate } = this.state;

        return (

            <div className="">
                <div className="margin-bottom margin-top flex-container flex-end-h">
                    <div className="font-12 flex-container-nowrap flex-end-h">
                        <div>Farm&nbsp;&nbsp;</div>
                        <Select
                            name="form-field-name"
                            value="maida1"
                            options={this.state.farms}
                            onChange={this.logChange}
                            clearable={false}
                        />
                        <div>&nbsp;&nbsp;</div>
                        <Select
                            name="form-field-name"
                            value="Number of Alarms"
                            options={this.state.alarms}
                            onChange={this.logChange}
                            clearable={false}
                        />
                        <div>&nbsp;&nbsp;</div>
                        <Select
                            name="form-field-name"
                            value="Availability"
                            options={this.state.availability}
                            onChange={this.logChange}
                            clearable={false}
                        />
                        <div>&nbsp;&nbsp;</div>
                        <Select
                            name="form-field-name"
                            value="Power Production"
                            options={this.state.production}
                            onChange={this.logChange}
                            clearable={false}
                        />
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;Month&nbsp;&nbsp;</div>
                        <div className="">
                            <FormGroup>
                                <DatePicker
                                    id="example-datepicker"
                                    value={this.state.initialDate}
                                    onChange={this.handleDateChangeInitial}
                                    showClearButton={false}/>
                            </FormGroup>
                        </div>
                        <div className="date-go-button">
                            <button onClick={this.reloadGraphs} className="btn btn-success">Go</button>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div style={plotStyle} id='plot1'></div>
                </div>
            </div>
        );
    }
}

export default Turbines
