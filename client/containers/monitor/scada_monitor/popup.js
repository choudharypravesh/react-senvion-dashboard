import React from 'react';
import reactDom from 'react-dom';
export default class Popup extends React.Component{

render(){
 		return(
    <div>
        <div className="secondrow" style={{display:'flex'}}>
          <p style={{color:'#aba836',paddingLeft:'10px', margin: '5px' ,position:'absolute',left:'-15',top:'-5'}} className="ion-alert"></p>
          <span className="warning" style={{paddingLeft:'10px', marginRight: '20px'}}> Warnings :1 </span>
          <p style={{color:'#EA7258',paddingLeft:'10px',position:'absolute',left:'80',top:'0'}} className="ion-radio-waves"></p>
          <span className="warning" style={{paddingLeft:'10px', marginRight: '20px'}}> Alarms : 5 </span>
          <p style={{color:'#82b38e',paddingLeft:'10px',position:'absolute',left:'174',top:'0'}} className="ion-ios-location"></p>
          <span className="warning" style={{paddingLeft:'10px', marginRight: '20px'}}> Site Access :6 </span>
        </div>
  </div>
 			);
 	}
 }
