import React from 'react'
import ChartSkeleton from '../../../components/PlotlyChart/skeleton';
import '../../../../public/styles/containers/analyze/farm/Compare.css'
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import {setVariableAndGetData, getCompareChartData} from './FarmActions'

class Compare extends React.Component {

    componentDidMount() {
        let {data} = this.props.getNextActionsCreatorsAndData();
        this.props.dispatch(getCompareChartData(data))
    }

    render() {
        var graphContainer = {
           marginBottom: "14px",
           paddingTop: "14px",
           backgroundColor: '#ffffff',
           border: '1px solid #ddd',
           borderRadius: '4px',
        }
        let selectedVariable = {
            label : "Metalscan_particl_",
            value : "1523"
        };
        return(
            <div className="compare-container">
                <div style={graphContainer} className="heatmap-graph-container">
                    <div className="flex-container flex-start-h">
                        <div className="font-12 flex-container">
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <Select
                                name="form-field-name"
                                value={selectedVariable}
                                options={this.props.variablesList}
                                onChange={this.logChange1}
                                disabled = {true}
                                clearable={false}
                            />
                        </div>
                    </div>
                    <ChartSkeleton
                        name="plot1"
                        type="scatter"
                        width={window.innerWidth-150}
                        height={window.innerHeight/1.5}
                        decription = "this is decription"
                        shape='spline'
                        multiTrace = {true}
                        traces = {this.props.allChartData}
                        names = {this.props.selectedTurbine}
                        loader={this.props.loader}
                        noData={this.props.noData}
                        fileName="Metalscan_particl_"
                        addMarkerValue = {this.props.addMarkerValue}
                        saveChart={true}
                    />

                </div>
            </div>
        )
    }
}

export default Compare