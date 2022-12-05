import React from 'react';
import { FormGroup } from 'react-bootstrap';
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import Map from '../../../components/Map/Map';
import 'react-dates/lib/css/_datepicker.css';
import '../../../../public/styles/containers/analyze/farm/FarmMap.css'

function FarmMap(props){
        let cardStyle={
            width: '100%',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        }
        return(
            <div className="farmmap-container">
                <div>
                    <div className="row">
                        <div className="col-xs-8 top-buffer-2">
                            {props.selectedFarm ? <Map width='100%' farm={props.selectedFarm} height={(window.innerHeight - 200) + 'px' }/>
                                :""
                            }

                        </div>
                        <div className="col-xs-4 top-buffer-2">
                            <div className="statistics card" style={cardStyle}>
                                <div className="">
                                    <table style={{marginBottom:0}} className="table table-responsive table-striped">
                                        <tbody>
                                            <tr style={{height: '40px'}}>
                                                <td>Production</td>
                                                <td>{props.power ? props.power : "--"} GWh</td>
                                            </tr>
                                            <tr style={{height: '40px'}}>
                                                <td>Availability<span className="helper-text">&nbsp;(Time based)</span></td>
                                                <td>{props.availTime ? props.availTime : "--"}%</td>
                                            </tr>
                                            <tr style={{height: '40px'}}>
                                                <td>Availability<span className="helper-text">&nbsp;(Gen. based)</span></td>
                                                <td>{props.availGen ? props.availGen : "--"}%</td>
                                            </tr>
                                            <tr style={{height: '40px'}}>
                                                <td>Lost Production Factor</td>
                                                <td>{props.lpf ? props.lpf : "--"}%</td>
                                            </tr>
                                            <tr style={{height: '40px'}}>
                                                <td>Wind Speed</td>
                                                <td>{(props.windSpeed ? props.windSpeed : "--")} m/s</td>
                                            </tr>
                                            <tr style={{height: '40px'}}>
                                                <td>Total Number of Alerts</td>
                                                <td>{props.numberOfAlerts}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }





export default FarmMap;
