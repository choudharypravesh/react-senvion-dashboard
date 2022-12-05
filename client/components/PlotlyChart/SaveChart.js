import React from 'react';
import FaDownload from 'react-icons/lib/fa/download'


class SaveChart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:this.props.name
        }
        this.downloadChart=this.downloadChart.bind(this)
    }

    downloadChart(){
        let ele=document.getElementById(this.state.name);
        let width = this.props.width > 800 ?  this.props.width : 800;
        let height = this.props.width > 800 ?  this.props.height : 400;
        Plotly.downloadImage(ele, {format: 'png', width: width , height: height, filename: this.props.title});
    }
    render(){
        return(
            <span onClick={this.downloadChart} style={{cursor:'pointer', color:'#2f75bc', fontSize:'12'}}>
                &nbsp;&nbsp;PNG
            </span>


        );
    }
}

export default SaveChart;