import React from 'react';
import ChatMiddlePaneCss from '../../../public/styles/containers/session/ChatMiddlePane.css'
import FaTimes from 'react-icons/lib/fa/times-circle'
import FaPlus from 'react-icons/lib/fa/plus-circle'
import FaStop from 'react-icons/lib/fa/stop'
import FaCheck from 'react-icons/lib/fa/check'
import classnames from 'classnames';
import axios from 'axios'
import Select from 'react-select';
import _ from 'underscore';


class ChatMiddlePane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedChips: [],
            visibility: {
                observations: true,
                loadingIcon: false,
                calculatedResults: true
            },
            searchItems: [],
            placeholder: "sdfsdfsdfsdf",
            possibilities: [{
                "value": 0,
                "label": "Extreme gust",
                "percentage": 35,
                "observations": "High Oil Sump Temp,Hub lubrication,Warning pitch,rotor overspeed"
            }, {
                "value": 15,
                "label": "Reduced power",
                "percentage": 50,
                "observations": "High Oil Sump Temp,Hub lubrication,Warning pitch,rotor overspeed"
            }, {
                "value": 26,
                "label": "strong gust of wind ",
                "percentage": 57,
                "observations": "High Oil Sump Temp,Hub lubrication,Warning pitch,rotor overspeed"
            }, {
                "value": 30,
                "label": "Hub lubrication",
                "percentage": 70,
                "observations": "High Oil Sump Temp,Hub lubrication,Warning pitch,rotor overspeed"
            }],
            recommendedObservations: [{
                "value": 1,
                "label": "Strong gusts of wind"
            }, {
                "value": 59,
                "label": "Detected ice"
            }, {
                "value": 16,
                "label": "High Oil Sump Temp"
            }, {
                "value": 7,
                "label": "High Temp"
            }, {
                "value": 27,
                "label": "rotor overspeed"
            }, {
                "value": 31,
                "label": "Warning pitch"
            }, {
                "value": 32,
                "label": "Hub lubrication"
            }]
        }

        this.selectTag = this.selectTag.bind(this);
        this.deselectTag = this.deselectTag.bind(this)
        this.selectBoxChanged = this.selectBoxChanged.bind(this);
        this.displayPossibilities = this.displayPossibilities.bind(this);

    }


    componentDidMount() {

    }


    selectBoxChanged(object) {

        console.log(object.length);

        if(object.length > 0) {
            var self = this;
            var allSelectedChips = this.state.selectedChips;
            allSelectedChips.push(object);
            this.setState({selectedChips: allSelectedChips})
        }
    }


    displayPossibilities(possibilities) {
        var self = this;

        console.log("yes cihild calling");
        console.log(possibilities);

        let visibility = this.state.visibility;
        visibility.observations = false;
        visibility.loadingIcon = false;
        visibility.calculatedResults = true;
        this.setState({visibility: visibility})

        setTimeout(function() {
            visibility.loadingIcon = false;
            visibility.calculatedResults = true;
            self.setState({visibility: visibility})
        }, 3000)

        this.setState({possibilities: possibilities})
    }



    deselectTag(clickedTag) {
        var self = this;
        this.state.possibilities.push(clickedTag);
        this.setState({selectedChips: _.reject(self.state.selectedChips, function(chip) {return chip.value == clickedTag.value})});
        this.setState({possibilities: this.state.possibilities});
    }

    selectTag(clickedTag) {
        var self = this;
        this.state.selectedChips.push(clickedTag);
        this.setState({possibilities: _.reject(self.state.possibilities, function(chip) {return chip.value == clickedTag.value})});
        this.setState({selectedChips: this.state.selectedChips});
    }

    render() {

        return(
            <div className="chat-left-pane-container" id="chat-left-pane">
                <div className="body-wrapper">
                    <div className={classnames('final-table',{ 'display-none': !this.state.visibility.calculatedResults})}>
                        <FinalPossibilities showSolutionSteps={this.props.showSolutionSteps} possibilities={this.state.possibilities}/>
                    </div>
                </div>
            </div>
        )
    }
}


class FinalPossibilities extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedCause: -1,
            playImage: require('../../../public/images/icons/play-circle-hover.svg')
        }
    }

    actionOnSolution(row, index) {
        var self = this;
        console.log("comming till here");
        console.log(index);
        console.log(row.value);
        if(index == 1) {
            axios.get('/api/technician/recommend/solution?data='+row.value)
                .then(function(response) {
                    console.log(response.data.data[0]);
                    var solutionsArray = response.data.data[0]._fields[0];
                    console.log("this is the originxcvxcval data");
                    console.log(solutionsArray);
                    solutionsArray = _.reject(solutionsArray, function(item) {
                        return item == "";
                    })
                    self.setState({selectedCause: row.value});
                    self.props.showSolutionSteps(solutionsArray)
                    /*self.setState({possibilities: data});*/
                }).catch(function(err) {
                console.log(err);
                window.alert("Faliure "+err);
            });
        } else if(index == 2) {
            document.querySelector('.end-session-button button').classList.add("display-none");
            if(document.querySelectorAll('.completed').length == document.querySelectorAll('.solution-step').length) {
                self.setState({selectedCause: -1});
            } else {
                self.setState({selectedCause: -1});
                //window.alert("Please finish all the steps to move further.")
            }
        }
    }

    buttonFunction(cell, row) {
        if(this.state.selectedCause == -1) {
            return <div className="text-center">
                <div className="flex-container flex-start-h">
                    <div onClick={() => {this.actionOnSolution(row, 1)}}>
                        <img src={this.state.playImage} width='20px'/>
                    </div>
                </div>
            </div>
        } else if(row.value == this.state.selectedCause) {
            return <div className="text-center">
                <div className="flex-container flex-start-h">
                    <div onClick={() => {this.actionOnSolution(row, 2)}}>
                        <FaStop className="red"/>
                    </div>
                </div>
            </div>
        }
    }

    render() {

        function percentFormatter(cell, row) {
            return cell+"%";//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }

        function statusFormatter(cell, row) {
            if(cell == null) {
                return '<span class="label label-default">Under Work</span>';
            } else if(cell == true) {
                return '<span class="label label-success">Completed</span>'
            } else if(cell == false) {
                return '<span class="label label-danger">Rejected</span>'
            } else {
                return '<span class="label label-default">Under Work</span>';
            }
        }

        return(
            <div className="possibilities-container">
                <div className="heading-title">Root Causes of Failure</div><br/>
                <div className="table-container">
                    <BootstrapTable data={this.props.possibilities} striped={false} hover={true}>
                        <TableHeaderColumn width="50%" dataField="label" isKey={true} dataAlign="center" dataSort={true}>Cause</TableHeaderColumn>
                        <TableHeaderColumn width="30%" dataField="percentage" dataFormat={percentFormatter}>Probability</TableHeaderColumn>
                        {/*<TableHeaderColumn dataField="status" dataFormat={statusFormatter}>Status</TableHeaderColumn>*/}
                        <TableHeaderColumn width="30%" dataField="approval" dataFormat={this.buttonFunction.bind(this)}>Troubleshoot</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
}


export default ChatMiddlePane;
