import React from 'react';
import Loader from '../../../components/Loader/Loader';
import NoData from '../../../components/NoData/NoData'
import SaveChart from "./SaveChart";
import downloadCSV from "../../../Utils/utils";
class LineGraph extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            X: this.props.X,
            Y1: this.props.Y1,
            name1: this.props.name1,
            Y2: this.props.Y2,
            name2: this.props.name2,
            Y3: this.props.Y3,
            name3: this.props.name3,
            Y4: this.props.Y4,
            name4: this.props.name4,
            Y5: this.props.Y5,
            name5: this.props.name5,
            count: this.props.count,
            title: this.props.title,
            width: this.props.width,
            loader: this.props.loader,
            noData: this.props.noData
        }
        this.setSize = this.setSize.bind(this);
        this.changeChart = this.changeChart.bind(this);
        this.renderChart = this.renderChart.bind(this);
        this.setNoData = this.setNoData.bind(this);
        this.downloadData = this.downloadData.bind(this);
    }
    setNoData(status){
        this.setState({
            noData: status
        });
    }
    changeChart(opts){
       this.setState({
              name: opts.name,
              X: opts.X,
              Y1: opts.Y1,
              name1: opts.name1,
              Y2: opts.Y2,
              name2: opts.name2,
              Y3: opts.Y3,
              name3: opts.name3,
              Y4: opts.Y4,
              name4: opts.name4,
              Y5: opts.Y5,
              name5: opts.name5,
              count: opts.count,
              title: opts.title,
              width: opts.width,
              loader: opts.loader
          })
    }

    renderChart(){
        if(!this.props.loader){
            var self = this;
            var trace1 = {
                x: self.props.Y1  && self.props.X,// self.props.X,
                y: self.props.Y1,// self.props.Y1,
                type: 'scatter',
                line: {
                    width: 1,
                    shape: "spline"
                },
                connectgaps: false,
                name: self.props.name1 //self.props.name1
            };

            var trace2 = {
                x: self.props.Y2 && self.props.X,
                y: self.props.Y2,
                type: 'scatter',
                line: {
                    width: 1,
                    shape: "spline"
                },
                connectgaps: false,
                name: self.props.name2
            };

            var trace3 = {
                x: self.props.Y3 && self.props.X,
                y: self.props.Y3,
                type: 'scatter',
                line: {
                    width: 1,
                    shape: "spline"
                },
                connectgaps: false,
                name: self.props.name3
            };

            var trace4 = {
                x: self.props.Y4 && self.props.X,
                y: self.props.Y4,
                type: 'scatter',
                line: {
                    width: 1,
                    shape: "spline"
                },
                connectgaps: false,
                name: self.props.name4
            };

            var trace5 = {
                x: self.props.Y5 && self.props.X,
                y: self.props.Y5,
                type: 'scatter',
                line: {
                    width: 1,
                    shape: "spline"
                },
                connectgaps: false,
                name: self.props.name5
            };

            var data = [];

            if(self.props.count == 1) {
                data = [trace1];
            } else if(self.props.count == 2) {
                data = [trace1, trace2];
            } else if(self.props.count == 3) {
                data = [trace1, trace2, trace3];
            } else if(self.props.count == 4) {
                data = [trace1, trace2, trace3, trace4];
            } else {
                data = [trace1, trace2, trace3, trace4, trace5];
            }
            console.log("chartdata");
            console.log(data);

            var layout = {
                title: self.props.title,
                width: self.props.width-5,
                height: 300,
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
                    y: '-0.1'
                },
                margin: {
                    t: 40, r: 40, l: 40, b: 40
                }
            };
            window.addEventListener("resize", this.setSize);
            Plotly.newPlot(self.props.name, data, layout, {
                displayModeBar: false
            });
        }
    }

    componentDidMount() {
        this.renderChart();
    }
    componentDidUpdate(){
        this.renderChart();
    }
    setSize(){
        var update = {
            width: window.innerWidth-100
        };
        Plotly.relayout(this.props.name, update)
    }

    shouldComponentUpdate(){
        return true;
    }
    renderLoader(state){
        this.setState({
            loader: state,
            noData: false
        });
    }
    downloadData(){
        let data = {};
        data.header = ["Time Stamp", this.state.name1, this.state.name2, this.state.name3, this.state.name4, this.state.name5]
        _.map(this.state.X, (time, index)=>{
            data[time] = [this.state.Y1 && this.state.Y1[index], this.state.Y2 && this.state.Y2[index], this.state.Y3 && this.state.Y3[index], this.state.Y4 && this.state.Y3[index],this.state.Y5 && this.state.Y5[index]]
        });
        let name = this.state.title ? this.state.title : '';
        data.filename = name+this.state.X[0]+"to"+this.state.X[this.state.X.length-1];
        downloadCSV(data)
    }
    render() {
        //this.state.loader.setState({dataLoaded: true})
        var plotMargins = {
            marginBottom: "14px",
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '1px',
        };
        if(!this.props.loader){
            return(
                    <div style={plotMargins} >
                        <div className="graph-heading flex-container flex-ea-h" >
                            <div className="top-buffer">
                                <a style={{color: '#2f75bc', cursor: 'pointer', fontSize:'12'}} onClick={this.downloadData}>CSV</a>
                                <SaveChart
                                    name={this.state.name}
                                    title={this.state.title}
                                />
                            </div>
                        </div>
                        <div  id={this.state.name}></div>
                    </div>
                    )
        }else if(this.props.noData){
            return(
                <NoData height={300} width={this.state.width}/>
                )
        }else{
            return(
                <Loader width={this.state.width} height={300}/>
            )
        }

    }
}

export default LineGraph;