import React from 'react'
import MonitorCss from '../../../public/styles/containers/monitor/Monitor.css'
import {Link} from 'react-router';
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ProgressBar } from 'react-bootstrap';
import Example from './scada_monitor/Example';
import Clock from './scada_monitor/clock'
import Popup from './scada_monitor/popup'

import CustomPaginationTable from './scada_monitor/ScadaMonitor'

class Monitor extends React.Component {
    getContainerHeight() {
        if(window.screen.availHeight > 1000) {
            return {height: '100vh', minHeight: '100vh'}
        } else {
            return {height: 'inherit', minHeight: '100vh'}
        }
    }

    render() {
        const scadaContainer = this.getContainerHeight();

        return(
            <div style={scadaContainer} className="monitor-container" id="monitor">
                <div className="monitor">
                    <div>
                        <div style={{color:'white',fontSize:'11px'}}><br/><br/>
                            <CustomPaginationTable/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Monitor;