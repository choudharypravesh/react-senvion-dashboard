import React from 'react'

class TextBox extends React.Component {
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
    }
    onChange(ev){
        this.props.onChange(ev.currentTarget.value, this.props.name)
    }
    render() {
        return(
            <div className="form-group">
                <div className="label-wrapper">
                    <label className="control-label" htmlFor={this.props.name}>{this.props.placeholder}</label>
                </div>
                <div className="input-group-wrapper">
                    <div className="">
                        <input
                            disabled={this.props.isDisabled}
                            className="form-control"
                            value={this.props.value}
                            onChange={this.onChange}
                            onBlur = {this.props.onBlur}
                            placeholder={this.props.placeholder}
                            name={this.props.name}
                            type="text" />
                    </div>
                </div>
            </div>
        )
    }
}


export default TextBox;