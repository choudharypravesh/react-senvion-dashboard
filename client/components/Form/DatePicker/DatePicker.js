import React from 'react'
import DatePicker from 'react-bootstrap-date-picker'



class DatePick extends React.Component {
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this);
    }
    onChange(date){
        this.props.onChange(date, this.props.id);
    }
    render(){
        return (
            <div className="form-group">
                <div className="label-wrapper ">
                    <label className="control-label" htmlFor="datepicker">{this.props.name}</label>
                </div>
                <div className="input-group-wrapper ">
                    <div className="input-group contract-form">
                        <DatePicker
                          dropdownMode="select"
                          value={this.props.value}
                          onChange={this.onChange}
                          dateFormat="DD/MM/YYYY"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DatePick;