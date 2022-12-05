import React from 'react';
import ReactDOM from 'react-dom';
import noDataImage from '../../../public/images/cloud-computing.svg'


class NoData extends React.Component{
    constructor(props){
        super(props);
        this.getMessage = this.getMessage.bind(this);
    }
    getMessage(){

            let woopsStyle = {fontSize:'30px'}
            let msgStyle = {fontSize:'20px'}
            let descStyle = {fontSize:'15px'}
            let mapDivOutter ={width: this.props.width, height: this.props.height,paddingTop:'4%'}

            return(
                <div style={mapDivOutter}>
                    <span><img className="img-responsive center-block No-data-image" src={noDataImage}/></span>
                    <div className="no-data-card">
                        <span style={woopsStyle}> Whoops! </span><span style={msgStyle}> Looks like there's no data.</span>
                        <div style={descStyle} className="top-buffer">
                            {this.props.message ?
                                <span> this.props.message</span>
                            :
                                <span> Try  selecting  a  different  time  period  or  different  value.</span>
                            }
                        </div>
                    </div>
                </div>
            )

    }
    render(){
        return(
            <div>
                { this.getMessage() }
            </div>
        )
    }
}

export default NoData;