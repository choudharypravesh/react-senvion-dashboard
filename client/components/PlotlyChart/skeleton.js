/* global Plotly */

import React from 'react';
import Loader from '../Loader/Loader';
import NoData from '../NoData/NoData'
import SaveChart from "./SaveChart";
import {downloadCSV} from "../../Utils/utils";
import moment from 'moment'
import _ from 'underscore'
//TODO:: need to add doc for usage
class ChartSkeleton extends React.Component {
    constructor(props) {
        super(props)
        let layout = {
             margin: this.props.margins ? this.props.margins : {
                 t: 40, r: 60, l: 60, b:0
             },
             font: {
                 family: 'Arial, Helvetica, sans-serif',
                 size: 12,
                 color: '#333333'
             },
             showlegend: this.props.showlegend ? this.props.showlegend : true,
             legend : {
                 orientation : "h",
                 xanchor: "center",
                 x: '0.5',
                 y: '-0.2'
             },
             title: this.props.title,
             width: this.props.width,
             height: this.props.height || console.error("height is not specified for chart: "+ this.props.name),
             xaxis: {
                 type: 'date',
                 gridcolor: 'transparent'
             },
             yaxis:{}
        };
        if (this.props.type=="heatmap"){
            layout.margin.b=40;
            layout.margin.l=150;
        }
        if(this.props.isTwoAxisChart){
            layout.yaxis = {title: this.props.legendName1};
            layout.yaxis2 = {
                title: this.props.yAxis2Title,
                titlefont: {color: this.props.titlefont ? this.props.titlefont : 'rgb(0, 0, 0)'},
                tickfont: {color: this.props.tickfont ? this.props.tickfont : 'rgb(0, 0, 0)'},
                overlaying: this.props.overlaying ? this.props.overlaying : 'y',
                side: this.props.side ? this.props.side : 'right'
            }
        }
        if (this.props.type=="heatmap"){
            layout.height= this.props.height ? this.props.height : 300,
            layout.ticklen= this.props.ticklen ? this.props.ticklen : 5,
            layout.tickwidth= 1
        }

        this.state = {
            layout: layout,
             options: {
                displayModeBar: false
            },
            loader: this.props.loader,
            isTwoAxisChart: this.props.isTwoAxisChart,
            noData: false
        };

        this.loadGraph = this.loadGraph.bind(this);
        this.resizeChart = this.resizeChart.bind(this);
        this.plotGraph = this.plotGraph.bind(this);
        this.renderLoader = this.renderLoader.bind(this);
        this.setNoData = this.setNoData.bind(this);
        this.downloadData = this.downloadData.bind(this);
        this.plotPowerCurve = this.plotPowerCurve.bind(this);
        this.barChart = this.barChart.bind(this);
        this.multiTrace = this.multiTrace.bind(this);
    }
    setNoData(status){
        this.setState({
            noData: status
        });
    }
    downloadData(){
        let data = {};
        if(this.props.multiTrace){
            data.header = ["Date"].concat(this.props.names)
            _.map(this.props.traces.x0,(time,index)=>{
                data[time] = _.map(this.props.names,(item,index1)=>{
                    return this.props.traces["y"+index1] ? this.props.traces["y"+index1][index] : ''
                })
            })
            let name = this.props.title ? this.props.title : '';
            data.filename = this.props.fileName || name +this.props.traces.x0[0]+ this.props.traces.x0[this.props.traces.x0.length-1]
        }
        else if(this.props.type === "heatmap"){
            data.header = ["Date"].concat(this.props.y1);
            _.map(this.props.x1,(time,index)=>{
                data[time]=_.map(this.props.y1,(item,index1)=>{
                    return this.props.z1[index1] ? this.props.z1[index1][index]:""
                })
            })
            let name = this.props.title ? this.props.title : '';
            data.filename = name + this.props.x1[0]+"to"+this.props.x1[this.props.x1.length-1];
        }

        else {
            if(this.props.powerCurve){
                data.header = [this.props.var1,this.props.var2,this.props.var3]
            }else{
                data.header = ["Date", this.props.name1, this.props.name2, this.props.name3, this.props.name4, this.props.name5];
            }

            _.map(this.props.x1, (time, index)=>{
                data[time] = [this.props.y1 && this.props.y1[index], this.props.y2 && this.props.y2[index], this.props.y3 && this.props.y3[index], this.props.y4 && this.props.y3[index],this.props.y5 && this.props.y5[index]]
            });
            let name = this.props.title ? this.props.title : '';
            data.filename = name + this.props.x1[0]+"to"+this.props.x1[this.props.x1.length-1];
        }



        downloadCSV(data, "chart");//data, type
    }

    loadGraph() {

    }


    resizeChart(width, height) {
        var update = {
            width: width,
            height: height
        };
        Plotly.relayout(this.props.name, update)
    }

    plotGraph(coordinates,var1,var2,var3) {
        let self = this;
        if (!this.props.loader && !this.props.noData) {
            let trace1 = {
                x: this.props.x1 ? this.props.x1 : coordinates ? coordinates.x1:"",
                y: this.props.y1 ? this.props.y1 : coordinates ? coordinates.y1:"",
                type: this.props.type,
                fill: self.props.fill ? self.props.fill : "none",
                line: {
                    color: this.props.color ? this.props.color : 'rgb(95, 177, 253)',
                    width: 1,
                    shape: this.props.shape ? this.props.shape : 'none'
                },
                marker: {
                    color: this.props.color ? this.props.color : "",
                    size: this.props.size,
                    symbol: this.props.symbol ? [this.props.symbol] : ["circle"],
                    colorscale: this.props.markercolorscale ? this.props.markercolorscale : 'YIOrRD',
                    showscale: this.props.showscale?this.props.showscale:false
                },
                colorscale: this.props.colorscale ? this.props.colorscale : 'YIOrRD',
                name: this.props.name1
            };
            let trace2 = {
                x: this.props.x2 ? this.props.x2 : coordinates ? coordinates.x2:"",
                y: this.props.y2 ? this.props.y2 : coordinates ? coordinates.y2:"",
                type: this.props.type,
                fill: self.props.fill ? self.props.fill : "none",
                line: {
                    color: this.props.color ? this.props.color : 'rgb(192, 80, 78)',
                    width: 1,
                    shape: this.props.shape ? this.props.shape : 'none'
                },
                marker: {
                    symbol: this.props.symbol ? [this.props.symbol] : ["circle"],
                    colorscale: this.props.markercolorscale ? this.props.markercolorscale : 'YIOrRD',
                    showscale: this.props.showscale?this.props.showscale:false
                },
                colorscale: this.props.colorscale ? this.props.colorscale : 'YIOrRD',
                name: this.props.name2
            }
            var trace3 = {
                x: self.props.y3 && self.props.x3,
                y: self.props.y3,
                type: this.props.type,
                line: {
                    width: 1,
                    shape: this.props.shape ? this.props.shape : 'none'
                },
                connectgaps: false,
                name: this.props.name3
            };

            var trace4 = {
                x: this.props.y4 && this.props.x4,
                y: this.props.y4,
                type: this.props.type,
                line: {
                    width: 1,
                    shape: this.props.shape ? this.props.shape : 'none'
                },
                connectgaps: false,
                name: self.props.name4
            };

            var trace5 = {
                x: this.props.y5 && this.props.x5,
                y: this.props.y5,
                type: this.props.type,
                line: {
                    width: 1,
                    shape: this.props.shape ? this.props.shape : 'none'
                },
                connectgaps: false,
                name: self.props.name5
            };

            if (this.state.isTwoAxisChart) {
                trace2.yaxis = this.props.yaxis;
            }
            if (this.props.type == "heatmap") {

                trace1.z = this.props.z1;
            }

            let data = [trace1, trace2];
            switch(this.props.traceCount) {
                case 3 : data = [trace1, trace2, trace3];
                         break
                case 4: data = [trace1, trace2, trace3, trace4];
                        break
                case 5: data = [trace1, trace2, trace3, trace4, trace5];
                        break;
            }
            let layout = Object.assign({}, self.state.layout);
            layout.title = this.props.title;
            Plotly.newPlot(this.props.name, data, layout, self.state.options);
        }
    }

    plotPowerCurve(){
        if (!this.props.loader && !this.props.noData) {
            let options = {
                                          scrollZoom: false, // lets us scroll to zoom in and out - works
                                          showLink: false, // removes the link to edit on plotly - works
                                          modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d'],
                                          //modeBarButtonsToAdd: ['lasso2d'],
                                          displayLogo: false, // this one also seems to not work
                                          displayModeBar: false, //this one does work
                                      };
            let layout = {
                                              displayModeBar: false,
                                              margin: {
                                                  t: 40, r: 10, l: 70, b:50
                                              },
                                              font: {
                                                  family: 'Arial, Helvetica, sans-serif',
                                                  size: 12,
                                                  color: '#333333'
                                              },
                                              showlegend: false,
                                              width: this.props.width,
                                              height: this.props.height,
                                              xaxis: {
                                                  gridcolor: 'transparent',
                                                  title: this.props.var1
                                              },
                                              yaxis: {
                                                  title: this.props.var2
                                              }
                                          }
            let data_update = [{
                                      x: this.props.x1,
                                      y: this.props.y1,
                                      mode: 'markers',
                                      type: 'scatter',
                                      marker: {
                                          color: this.props.y2,
                                          size: 5,
                                          colorscale:'Viridis',
                                          showscale: true
                                      },
                                      name: this.props.var3
                                  }]
            layout.xaxis.title = this.props.var1;
            layout.yaxis.title = this.props.var2;
            Plotly.newPlot(this.props.name, data_update, layout, options);

        }
    }

    barChart() {
        let self = this;
        if (!this.props.loader && !this.props.noData) {
            var data1 = [{
                type: 'bar',
                x: self.props.x1,
                y: self.props.y1 ? self.props.y1 : ["."],
                orientation: self.props.orientation?self.props.orientation:""
            }];

        var layout1 = {
            title: self.props.title,
            displayModeBar: false,
            margin: {
                t: 60, r: 0, l: 50
            },
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 12,
                color: '#333333'
            },
            width: self.props.width,
            height: self.props.height,
            xaxis: {
                tickfont: {
                    size: 14,
                    color: 'rgb(107, 107, 107)',
                    type: self.props.xaxisType,
                    range: self.props.xaxisType ? [moment().toString(), moment().subtract(180, 'days').toString()] : ""
                }
            },
            yaxis: {
                title: self.props.yaxisTitle,
                titlefont: {
                    size: 16,
                    color: 'rgb(107, 107, 107)'
                },
                tickfont: {
                    size: 14,
                    color: 'rgb(107, 107, 107)'
                }
            },
            legend: {
                orientation: "h",
                xanchor: "center",
                x: '0.5',
                y : '-0.2'
            },
            bargap: 0.8
        }

        var options = {
            scrollZoom: false, // lets us scroll to zoom in and out - works
            showLink: false, // removes the link to edit on plotly - works
            modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d'],
            //modeBarButtonsToAdd: ['lasso2d'],
            displayLogo: false, // this one also seems to not work
            displayModeBar: false, //this one does work
        };

        if(this.props.name === 'alertsbycomp') {
            data1[0].width = 0.1;
        }

        Plotly.newPlot(this.props.name, data1, layout1, options);
    }
    }

    multiTrace(){
        let self = this;
        if (!this.props.loader && !this.props.noData) {
        let data = []
            _.map(this.props.names,(item,index)=>{
            data[index] = {
                    x: this.props.traces["y"+index.toString()] && this.props.traces["x"+index],
                    y: this.props.traces["y"+index.toString()],
                    type: this.props.type,
                    fill: self.props.fill ? self.props.fill : "none",
                    line: {
                        width: 1,
                        shape: this.props.shape ? this.props.shape : 'none'
                    },
                    marker: {
                        color: this.props.color ? this.props.color : "",
                        size: this.props.size,
                        symbol: this.props.symbol ? [this.props.symbol] : ["circle"],
                        showscale: this.props.showscale ? this.props.showscale : false
                    },
                    name: item
            }
        });
            if(this.props.addMarkerValue){
                _.map(this.props.names,(item,index)=>{
                    data[this.props.names.length+index] = {
                        x: this.props.traces["z"+index] && this.props.traces["x"+index],
                        y: this.props.traces["z"+index],
                        type: this.props.type,
                        mode:"markers",
                        connectgaps:false,
                        fill: self.props.fill ? self.props.fill : "none",
                        line: {
                            width: 1,
                            shape: this.props.shape ? this.props.shape : 'none'
                        },
                        marker: {
                            color: this.props.color ? this.props.color : "",
                            size: this.props.size,
                            symbol: this.props.symbol ? [this.props.symbol] : ["circle"],
                            showscale: this.props.showscale ? this.props.showscale : false
                        },
                        name: item+"_failure"
                    }
                })
            }
            let layout = Object.assign({}, self.state.layout);
            layout.title = this.props.title;
            Plotly.newPlot(this.props.name, data, layout, self.state.options);
        }
    }

    componentDidMount() {
        this.props.powerCurve ? this.plotPowerCurve() :(this.props.type === "barchart")? this.barChart():this.props.multiTrace?this.multiTrace():this.plotGraph();
        window.addEventListener("resize", () => {
            this.resizeChart();
        });
    }

    componentDidUpdate() {
        this.props.powerCurve ? this.plotPowerCurve() :(this.props.type=="barchart")? this.barChart():this.props.multiTrace?this.multiTrace():this.plotGraph();
    }

    renderLoader(loader){
        this.setState({
            loader: loader
        });
    }
    render() {

        if(this.props.noData){
            return (<NoData width={this.props.width} height={this.props.height ? this.props.height : 300} message={this.props.noDataMessage}/>);
        }
        if(!this.props.loader){
            return (
                    <div>
                        <div style={{position:'relative'}} id={this.props.name}>
                            <div style={{position:'absolute',top:'1%',right:'1.5%'}} title = {this.props.decription} >

                                {(this.props.description==undefined) ? <span/> : <img style={{height:'12px'}} src={require('../../../public/images/icons8-Info.svg')} title = {this.props.description}/> }
                            </div>
                            {this.props.saveChart && <div className="download-chart" >
                                <a style={{color: '#2f75bc', cursor: 'pointer', fontSize:'12'}} onClick={this.downloadData}>CSV</a>
                                <SaveChart
                                    name={this.props.name}
                                    title={this.props.title}
                                    width={this.props.width}
                                    height={this.props.height ? this.props.height : 300}
                                />
                            </div>}
                        </div>
                    </div>
            );
        }else{
             return(<Loader width={this.props.width} height={this.props.height ? this.props.height : 300}/>)
        }

    }
}

export default ChartSkeleton;
