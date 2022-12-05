import React from 'react';
import StatusCodeCss from '../../../public/styles/containers/admin/GenerateStatuscodeSolutions.css'
import { Modal, Popover, Tooltip, Button, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import Select from 'react-select';
import ReactCookie from 'react-cookie';
import 'react-select/dist/react-select.css';
import { Creatable } from 'react-select';
import classnames from 'classnames';
import validateInput from '../../validations/GenerateStatusCodeSolutionValidation'



class Step extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            step: ""
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        console.log(e.target.value);
        console.log(e.target.name);
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        return(
            <div id={"step-"+this.props.number} className="step-container entry input-group">

                <span className="input-group-btn">
                    <button className="btn btn-default btn-add step-number" type="button">{this.props.number}</button>
                </span>

                <textarea
                    value={this.state.step}
                    className="form-control steps-textarea"
                    name="step"
                    type="text"
                    id={this.props.number}
                    placeholder={"Write step "+this.props.number+" of solution"}
                    onChange={this.onChange}/>

                <ToggleDisplay className="input-group-btn minus-steps-button" hide={this.props.number == this.props.totalSteps}>
                    <button onClick={() => this.props.removeStep(this.props.number)} className="btn btn-danger btn-add" type="button">
                        <span className="glyphicon glyphicon-minus"></span>
                    </button>
                </ToggleDisplay>

                <ToggleDisplay className="input-group-btn add-steps-button" show={this.props.number == this.props.totalSteps}>
                         <button onClick={() => this.props.addStep(this.state.step)} className="btn btn-primary btn-add" type="button">
                         <span className="glyphicon glyphicon-plus"></span>
                         </button>
                </ToggleDisplay>
            </div>
        )
    }
}



class GenerateStatuscodeSolutions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cause: "",
            statusCodes: [],
            observations: [],
            subSystems: [],
            systems: [],
            allStatusCodeNumbers: [{ value: "one", label: 'One' },
                { value: "two", label: 'Two' }],
            allObservations: [{ value: 'one', label: 'One' },
                { value: 'two', label: 'Two' }],
            allSubsystems: [{ value: 'one', label: 'One' },
                { value: 'two', label: 'Two' }],
            allSystems: [{ value: 'one', label: 'One' },
                { value: 'two', label: 'Two' }],
            step: "",
            steps: [],
            numSteps: 1,
            showModal: true,
            errorMessage: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.removeStep = this.removeStep.bind(this);
        this.pushStepValue = this.pushStepValue.bind(this);
        this.addStep = this.addStep.bind(this);
        this.selectBox1Changed = this.selectBox1Changed.bind(this);
        this.selectBox2Changed = this.selectBox2Changed.bind(this);
        this.selectBox3Changed = this.selectBox3Changed.bind(this);
        this.selectBox4Changed = this.selectBox4Changed.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        var self = this;
        console.log("component did mount!!!!");
        //FILL ALL THE SEARCH DROPDOWNS
        axios.get('/api/admin/solution/getNodeRecommendation')
            .then(function(response) {
                console.log(response.data.data);
                if(response.data.data) {
                    self.setState({allStatusCodeNumbers: response.data.data.status_code});
                    self.setState({allObservations: response.data.data.observation});
                    self.setState({allSubsystems: response.data.data.sub_system});
                    self.setState({allSystems: response.data.data.system});
                }
            }).catch(function(err) {
            console.log(err);
            window.alert("Faliure "+err);
        });
    }

    onChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    addStep(step) {
        if(step.length > 0) {
            this.setState(
                {
                    numSteps: this.state.numSteps + 1
                }
            );
            this.state.steps.push(step);
        }
    }


    pushStepValue(e) {
        this.state.steps.push(e.target.value);
    }

    removeStep(index) {
        console.log(index);
        this.state.steps.pop();
        this.setState({
            numSteps: this.state.numSteps - 1
        });
        console.log("step number to remove ");
    }


    isValid() {
        const { errors, isValid } = validateInput(this.state)
        if(!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        var self = this;
        let date = new Date();
        date = date.getTime()
        var data = {
            cause: this.state.cause,
            status_code: this.state.statusCodes,
            observation: this.state.observations,
            system: this.state.systems,
            sub_system: this.state.subSystems,
            solution: this.state.steps,
            created_by: ReactCookie.load('user').user_id,
            created_at: date,
            approved_by: "",
            approved: "",
            approved_at: ""
        };

        console.log(data);

        if(this.isValid()) {
            axios.post('/api/admin/solution/solutions/create', 'data='+JSON.stringify(data))
                .then(function(response) {
                    console.log(response);
                    var toast = document.querySelector('.toast-message');
                    toast.style.display = 'inherit';
                    setTimeout(function() {
                        toast.style.display = 'none';
                    }, 2000)

                    self.setState({statusCodes: [], observations: [], cause: "", systems: [], subSystems: [], steps: [], numSteps: 1});
                    window.location.href = "/admin/instructions";
                }).catch(function(err) {
                console.log(err);
                window.alert("Faliure "+err);
            });
        } else {

        }
    }

    selectBox1Changed(val) {
        console.log(val);
        this.setState({statusCodes: val, errors: "" })
    }
    selectBox2Changed(val) {
        console.log(val);
        this.setState({observations: val, errors: ""})
    }
    selectBox3Changed(val) {
        console.log(val);
        this.setState({subSystems: val, errors: ""})
    }
    selectBox4Changed(val) {
        console.log(val);
        this.setState({systems: val, errors: ""})
    }



    render() {
        const stepChilds = [];
        const { errors } = this.state;

        for (var i = 1; i <= this.state.numSteps; i += 1) {
            stepChilds.push(<Step onChange={this.onChange} step={this.state.step} pushStepValue={this.pushStepValue} removeStep={this.removeStep} addStep={this.addStep} number={i} totalSteps={this.state.numSteps}/>);
        }


        return(
            <div className="solutions-container" id="solutions-status-codes">
                <div className="box-container">
                    <div className="solutions-form">
                        <form name="solutionsForm" onSubmit={this.onSubmit}>
                            <div className="form-group"> {/*className={classnames("form-group", { 'has-error': errors.cause})}*/}
                                <label htmlFor="cause">Cause:</label>
                                <input
                                    value={this.state.cause}
                                    onChange={this.onChange}
                                    type="text"
                                    name="cause"
                                    placeholder="Write the cause of the issue"
                                    className="form-control"
                                    id="cause"/>
                                {errors.cause && <span className="help-block">{errors.cause}</span>}
                            </div>
                            <div className={classnames("form-group", { 'has-error': errors.statusCodes})}>
                                <label htmlFor="status-codes">Status Codes:</label>
                                <Creatable multi simpleValue
                                    name="statusCodes"
                                    value={this.state.statusCodes}
                                    options={this.state.allStatusCodeNumbers}
                                    onChange={this.selectBox1Changed}
                                />
                                {errors.statusCodes && <span className="help-block">{errors.statusCodes}</span>}
                            </div>
                            <div className={classnames("form-group", { 'has-error': errors.observations})}>
                                <label htmlFor="observations">Observations:</label>
                                <Creatable multi simpleValue
                                    name="observations"
                                    value={this.state.observations}
                                    options={this.state.allObservations}
                                    onChange={this.selectBox2Changed}
                                />
                                {errors.observations && <span className="help-block">{errors.observations}</span>}
                            </div>
                            <div className={classnames("form-group", { 'has-error': errors.subSystems})}>
                                <label htmlFor="subsystems">Subsystems:</label>
                                <Creatable multi simpleValue
                                    name="subsystems"
                                    value={this.state.subSystems}
                                    options={this.state.allSubsystems}
                                    onChange={this.selectBox3Changed}
                                />
                                {errors.subSystems && <span className="help-block">{errors.subSystems}</span>}
                            </div>
                            <div className={classnames("form-group", { 'has-error': errors.systems})}>
                                <label htmlFor="systems">Systems:</label>
                                <Creatable multi simpleValue
                                    name="systems"
                                    value={this.state.systems}
                                    options={this.state.allSystems}
                                    onChange={this.selectBox4Changed}
                                />
                                {errors.systems && <span className="help-block">{errors.systems}</span>}
                            </div><br/><br/>
                            <div className="second-title">Steps to solve this status code</div>
                            <div className="steps-container">
                                {stepChilds}
                            </div><br/>
                            <div className="text-center submit-container">
                                <button type="submit" className="btn btn-success button-long">SUBMIT</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="toast-message">Created Successfully</div>
            </div>
        )
    }
}


export default GenerateStatuscodeSolutions;