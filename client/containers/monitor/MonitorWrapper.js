import React from 'react'

class MonitorWrapper extends React.Component {
    render() {
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default MonitorWrapper