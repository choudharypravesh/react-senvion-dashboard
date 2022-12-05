/* global Plotly */

import React from 'react';
import {Link} from 'react-router';
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ButtonGroup, Button, Dropdown, MenuItem, ButtonToolbar, DropdownButton, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import _ from 'underscore'


class PortfolioGraphs extends React.Component {
    constructor(props) {
        super(props)

        this.changeofGraphCoordinates = this.changeofGraphCoordinates.bind(this);
    }

    changeofGraphCoordinates() {
        console.log("change of graph coordinates");
        Plotly.redraw('plot1');
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
                color: 'rgb(196,17,17)',
                width: 1
            },
            name: this.props.legendName2
        }], {
            margin: {
                t: 60, r: 10, l: 60, b:0
            },
            showlegend: true,
            legend : {
                orientation : "h",
                xanchor: "center",
                x: '0.5',
                y: '-0.2'
            },
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 12,
                color: '#333333'
            },
            title: this.props.title,
            width: window.innerWidth/3.5,
            height: 300,
            xaxis: {
                type: 'date',
                gridcolor: 'transparent'
            }
        }, {
            displayModeBar: false
        });

        window.onresize = function() {
            Plotly.Plots.resize(self.props.name);
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

export default PortfolioGraphs