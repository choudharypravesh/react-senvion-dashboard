/* global Plotly */

// App.js
import React from 'react';
import { Modal, ButtonGroup, Button, Dropdown, MenuItem, ButtonToolbar, DropdownButton, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import _ from 'underscore'
import DatePicker from 'react-bootstrap-date-picker';
import 'react-dates/lib/css/_datepicker.css';
import Select from 'react-select'
import {Link} from 'react-router';
import TurbineKPICss from '../../../../public/styles/containers/analyze/turbine/TurbineKPI.css'

class Datalabs extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            farms : [
                { value: 'maida1', label: 'Maida1' },
                { value: 'maida2', label: 'Maida2' }
            ],
            turbines : [
                { value: '91653', label: '91653' },
                { value: '91654', label: '91654' }
            ],
            variable : [
                { value: 'Nacelle_temp_2_median', label: 'Nacelle_temp_2_median' },
                { value: 'pressure', label: 'Pressure' }
            ],
            initialDate: localStorage.initialDate ? localStorage.initialDate : '2016-01-01',
            finalDate: localStorage.finalDate ? localStorage.finalDate : '2016-01-02'
        }

    }

    componentDidMount() {

    }

    render() {

        var plotStyles = {
            marginRight: "14px",
            marginBottom: "14px",
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '1%',
            width: window.innerWidth-70
        }

        return (
            <div className="turbinekpis-container body-wrapper" id="turbine-kpis">
                <div className="font-12 flex-end-h flex-container-nowrap">
                    <div className="flex-container flex-end-h">
                        <div>Farm&nbsp;&nbsp;</div>
                        <Select
                            name="form-field-name"
                            value="maida1"
                            options={this.state.farms}
                            onChange={this.logChange}
                            clearable={false}
                        />
                        <div>&nbsp;&nbsp;Turbine&nbsp;&nbsp;</div>
                        <Select
                            name="form-field-name"
                            value="91654"
                            options={this.state.turbines}
                            onChange={this.logChange}
                            clearable={false}
                        />
                    </div>
                    <div className="flex-container-nowrap flex-end-h date-picker">
                        <div>From&nbsp;&nbsp;</div>
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
                        <div className="margin-right-small">
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
                        <div className="date-go-button">
                            <button onClick={this.reloadGraphs} className="btn btn-success">Go</button>
                        </div>
                    </div>
                </div><br/><br/>

                <div className="flex-container-nowrap">
                    <div>
                        <div style={plotStyles} className="scatter-plot-container">
                            <div className="font-12 flex-container flex-end-h">
                                <div>&nbsp;&nbsp;Variable&nbsp;&nbsp;</div>
                                <Select
                                    name="form-field-name"
                                    value="Nacelle_temp_2_median"
                                    options={this.state.variable}
                                    onChange={this.logChange}
                                    clearable={false}
                                />
                                <div>&nbsp;&nbsp;&nbsp;</div>
                                <Select
                                    name="form-field-name"
                                    value="Nacelle_temp_2_median"
                                    options={this.state.variable}
                                    onChange={this.logChange}
                                    clearable={false}
                                />
                                <div>&nbsp;&nbsp;&nbsp;</div>
                                <Select
                                    name="form-field-name"
                                    value="Nacelle_temp_2_median"
                                    options={this.state.variable}
                                    onChange={this.logChange}
                                    clearable={false}
                                />
                            </div>
                            <ScatterPlot name="plot1"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class ScatterPlot extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        var self = this;
        var options = {
            scrollZoom: false, // lets us scroll to zoom in and out - works
            showLink: false, // removes the link to edit on plotly - works
            modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d'],
            //modeBarButtonsToAdd: ['lasso2d'],
            displayLogo: false, // this one also seems to not work
            displayModeBar: false, //this one does work
        };

        var randomX = [];
        var randomY = [];
        var randomC = [];

        for(let i=0; i<500; i++) {
            randomY.push(Math.random() * (3 - (-3)) + (-3));
            randomX.push(Math.floor((Math.random() * 500) + 1))
            randomC.push(Math.random() * (3 - (-3)) + (-3));
        }

        setTimeout(function() {

            Plotly.newPlot(self.props.name, [{
                x: randomX,
                y: randomY,
                mode: 'markers',
                type: 'scatter',
                marker: {
                    color: randomC,
                    size: 5,
                    colorscale:'Viridis',
                    showscale: true
                },
                name: '91654'
            }], {
                displayModeBar: false,
                margin: {
                    t: 80, r: 50, l: 50
                },
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 12,
                    color: '#333333'
                },
                showlegend: true,
                legend : {
                    orientation : "h",
                    xanchor: "center",
                    x: '0.5'
                },
                width: window.innerWidth-100,
                height: window.innerHeight/1.3,
                xaxis: {
                    gridcolor: 'transparent'
                }
            }, options)
        }, 2000)
    }

    render() {
        /*var plotStyles = {
         marginRight: "14px",
         marginBottom: "14px",
         backgroundColor: '#ffffff',
         border: '1px solid #ddd',
         borderRadius: '4px',
         padding: '1%',
         width: window.innerWidth/2.1,
         height: window.innerHeight/4
         }*/
        return(
            <div id={this.props.name}></div>
        )
    }
}

export default Datalabs;
