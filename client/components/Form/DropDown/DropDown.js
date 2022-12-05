import React from 'react'
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css'



class DropDown extends React.Component {
    constructor(props){
        super(props),
            this.changeEvent=this.changeEvent.bind(this);
    }
    changeEvent(val){
        this.props.onChange(val.value, this.props.name);
    }

    render(){
        return (
            <div className="form-group">
                <div className="label-wrapper">
                    <label className="control-label" htmlFor="c_parc">{this.props.placeholder}</label>
                </div>
                <div className="input-group">
                    <Select
                        name={this.props.name}
                        value={this.props.value}
                        options={this.props.options}
                        onChange={this.changeEvent}
                        placeholder={this.props.placeholder}
                    />
                </div>
            </div>
        );
    }
}

export default DropDown;