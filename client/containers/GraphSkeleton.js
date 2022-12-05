
/* global Plotly */

import React from 'react';
import {Link} from 'react-router';
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ButtonGroup, Button, Dropdown, MenuItem, ButtonToolbar, DropdownButton, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import _ from 'underscore'


class GraphSkeleton extends React.Component {
    componentDidMount() {
        var self = this;

        setTimeout(function() {
            Plotly.newPlot(self.props.name, [{
                x: self.props.x1,
                y: self.props.y1,
                type: self.props.type,
                marker: {
                    color: self.props.color1,
                    line: {
                        color: self.props.color1,
                        width: 0.3
                    }
                },
                name: self.props.legendName1
            }, {
                x: self.props.x2,
                y: self.props.y2,
                marker: {
                    color: self.props.color2,
                    line: {
                        color: self.props.color2,
                        width: 0.3
                    }
                },
                type: self.props.type,
                name: self.props.legendName2
            }], {
                title: self.props.title,
                titlefont:{
                  family: 'Arial, Helvetica, sans-serif',
                  size: 20
                },
                margin: {
                    t: 50, r: 10, l: 60, b:0
                },
                showlegend: true,
                legend : {
                    orientation : "h",
                    xanchor: "center",
                    x: '0.5',
                    y: '-0.2'
                },
                yaxis: {
                    zeroline: false,
                    gridwidth: 1
                },
                bargap :0.5,
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 12,
                    color: '#333333'
                },
                barmode: 'group',
                width: self.props.width,
                height: self.props.height,
            }, {
                displayModeBar: false
            });
        }, 2000)

        window.onresize = function() {
            Plotly.Plots.resize(self.props.name);
        };

    }


    onSelectMenuItem(index) {

    }




    render() {

        var plotStyle= {

        }

        var graphSkeleton = {
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            padding: '1px',
            width: this.props.width,
            height: this.props.height,
            marginBottom: "14px",
            marginRight: "14px"
        }
        return (
        <div style={plotStyle} className="graph-skeleton-container">
            <div style={graphSkeleton} id={this.props.name}></div>
        </div>
        );
    }
}

export default GraphSkeleton
