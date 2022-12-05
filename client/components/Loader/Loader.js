import React from 'react';
import ReactDOM from 'react-dom';
import "./loader.css";

class Loader extends React.Component{
    render(){
        let height = this.props.height - 20;
        let width = this.props.width - 70;
        let style = {
            paddingLeft: (width/2)+'px',
            paddingRight: (width/2)+'px',
            paddingTop: (height/2)+'px',
            paddingBottom: (height/2)+'px'
        }
        return(
            <div className="loading" style={style}>
                    <svg width="70" height="20">
                      <circle cx="10" cy="10" r="0">
                        <animate attributeName="r" from="0" to="3" values="0;3;3;3;0" dur="1000ms" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="25" cy="10" r="0">
                        <animate attributeName="r" from="0" to="3" values="0;3;3;3;0" begin="200ms" dur="1000ms" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="40" cy="10" r="0">
                        <animate attributeName="r" from="0" to="3" values="0;3;3;3;0" begin="400ms" dur="1000ms" repeatCount="indefinite"/>
                      </circle>
                    </svg>
            </div>
        )
    }
}

export default Loader;