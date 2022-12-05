/* global Plotly */

import React from 'react';
import {Link} from 'react-router';
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ButtonGroup, Button, Dropdown, MenuItem, ButtonToolbar, DropdownButton, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import _ from 'underscore'

class Anamoly extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            layout: {
                margin: {
                    t: 0, r: 0, l: 40, b:0
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
                    x: '0.5',
                    y: '-0.2'
                },
                title: this.props.title,

                width: window.innerWidth-120,
                height: 150,

                xaxis: {
                    type: 'date',
                    gridcolor: 'transparent'
                }
            },
            options: {
                displayModeBar: false
            }
        }

        this.changeofGraphCoordinates = this.changeofGraphCoordinates.bind(this);
    }

    changeofGraphCoordinates(index, coordinates) {
        console.log(index);
        var self = this;
        console.log("change of graph coordinates");
        console.log(this.props.name);

        let data_update = [{
            x: coordinates.x1,
            y: coordinates.y1,
            type: self.props.type,
            line: {
                color: 'rgb(95, 177, 253)',
                width: 1
            },
            name: self.props.legendName1
        }, {
            x: coordinates.x2,
            y: coordinates.y2,
            type: self.props.type,
            line: {
                color: 'rgb(192, 80, 78)',
                width: 1
            },
            name: self.props.legendName2
        }]

        console.log('plot'+index);

        Plotly.newPlot('plot'+index, data_update, this.state.layout, this.state.options);
    }


    componentDidMount() {
        var self = this;

            Plotly.newPlot(this.props.name, [{
                x: this.props.x1,
                y: this.props.y1,
                type: this.props.type,
                line: {
                    color: 'rgb(95, 177, 253)',
                    width: 1
                },
                name: this.props.legendName1
            }, {
                x: this.props.x2,
                y: this.props.y2,
                type: this.props.type,
                line: {
                    color: 'rgb(160, 16, 16)',
                    width: 0.5
                },
                name: this.props.legendName2
            }], self.state.layout, self.state.options);

        window.onresize = function() {
            Plotly.newPlot(this.props.name, [{
                x: this.props.x1,
                y: this.props.y1,
                type: this.props.type,
                line: {
                    color: 'rgb(95, 177, 253)',
                    width: 0.5
                },
                name: this.props.legendName1
            }, {
                x: this.props.x2,
                y: this.props.y2,
                type: this.props.type,
                line: {
                    color: 'rgb(160, 16, 16)',
                    width: 1
                },
                name: this.props.legendName2
            }], self.state.layout, self.state.options);
        };

    }


    onSelectMenuItem(index) {

    }




    render() {

        var plotStyle= {
            /*boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
            border: '1px solid #ddd',
            borderRadius: "0px 0px 4px 4px",
            borderWidth: '0px 1px 1px 1px'*/
        }
        return (
            <div style={plotStyle} id={this.props.name}></div>
        );
    }
}

export default Anamoly
