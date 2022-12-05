import React from 'react';
import ChatLeftPaneCss from '../../../public/styles/containers/session/ChatLeftPane.css'
import FaTimes from 'react-icons/lib/fa/times-circle'
import FaPlus from 'react-icons/lib/fa/plus-circle'
import FaStop from 'react-icons/lib/fa/stop'
import FaCheck from 'react-icons/lib/fa/check'
import classnames from 'classnames';
import axios from 'axios'
import Select from 'react-select';
import _ from 'underscore';
import FaSpinner from 'react-icons/lib/fa/spinner'


class ChatLeftPane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedChips: [],
            visibility: {
                observations: true,
                loadingIcon: false,
                calculatedResults: false
            },
            searchItems: [],
            placeholder: "sdfsdfsdfsdf",
            possibilities: [],
            orderSelected: JSON.parse(localStorage.orderSelected)
        }

        this.selectTag = this.selectTag.bind(this);
        this.deselectTag = this.deselectTag.bind(this)
        this.next = this.next.bind(this);
        this.selectBoxChanged = this.selectBoxChanged.bind(this);
        this.searchInputChanged = this.searchInputChanged.bind(this);

    }


    componentDidMount() {

        var self = this;
        var order_id = "US987"
        axios.get('/api/technician/recommend/observation?order_id='+order_id)
            .then(function(response) {
                var data = response.data.data;
                self.setState({possibilities: data})
            }).catch(function(err) {
            console.log(err);
            window.alert("Faliure "+err);
        });
    }


    selectBoxChanged(object) {

        var self = this;
        console.log(object);

        let isDuplicate = _.find(self.state.selectedChips, function(chip) {
            return chip.value == object.value
        })

        console.log(isDuplicate);

        if(isDuplicate == undefined && object.value) {

            //Add the unique item to the selected chips
            var allSelectedChips = self.state.selectedChips;
            allSelectedChips.push(object);
            self.setState({selectedChips: allSelectedChips})

            //Remove this entry from unselected chips
            var allUnselectedChips = _.reject(self.state.possibilities, function(item) {
                return item.value == object.value
            })
            self.setState({possibilities: allUnselectedChips});



           /* var self = this;
            this.state.selectedChips.push(clickedTag);
            this.setState({possibilities: _.reject(self.state.possibilities, function(chip) {return chip.value == clickedTag.value})});
            this.setState({selectedChips: this.state.selectedChips});*/
            self.next();
        }
    }


    searchInputChanged(e) {
        var query = e;
        var self = this;
        axios.get('/api/technician/recommend/searchbar?q='+query)
            .then(function(response) {
                var data = response.data.data;
                var dataObject = [];
                for(let i=0; i<data.length; i++) {
                    dataObject.push({
                        value: data[i]['value'],
                        label: data[i]['label']
                        //label: data[i]._fields[0]
                    })
                }
                self.setState({searchItems: dataObject})
            }).catch(function(err) {
            window.alert("Faliure "+err);
        });
    }



    deselectTag(clickedTag) {
        var self = this;
        this.state.possibilities.push(clickedTag);
        this.setState({selectedChips: _.reject(self.state.selectedChips, function(chip) {return chip.value == clickedTag.value})});
        this.setState({possibilities: this.state.possibilities});
        this.next();
    }

    selectTag(clickedTag) {
        var self = this;
        this.state.selectedChips.push(clickedTag);
        this.setState({possibilities: _.reject(self.state.possibilities, function(chip) {return chip.value == clickedTag.value})});
        this.setState({selectedChips: this.state.selectedChips});
        this.next();
    }


    next() {
        var self = this;
        var selectedTags = _.map(this.state.selectedChips, function(item) {
            return item.value;
        })
        selectedTags = selectedTags.toString()
        axios.get('/api/technician/recommend/cause?tags='+selectedTags)
            .then(function(response) {
                var data = response.data.data;
                data = _.sortBy(data, function(item) {
                    return item.percentage;
                })
                console.log("normal sort")
                console.log(data)
                data = data.reverse();
                console.log("abnormal sort");
                console.log(data)
                //self.setState({possibilities: data});
                self.props.onNextClick(data);
            }).catch(function(err) {
            console.log(err);
            window.alert("Faliure "+err);
        });
    }

    render() {
        let recommendedChipsArray = [];

        let unSelectedChipsArray = [];
        let selectedChipsArray = [];

        console.log(this.state.orderSelected);

        for(let i=0; i<this.state.orderSelected.recommended_observations.length; i++) {
            recommendedChipsArray.push(<RecommendedChip data={this.state.orderSelected.recommended_observations[i]}/>)
        }

        for(let i=0; i<this.state.possibilities.length; i++) {
            unSelectedChipsArray.push(<UnselectedChip selectTag={this.selectTag} key={i} data={this.state.possibilities[i]}/>)
        }

        for(let i=0; i<this.state.selectedChips.length; i++) {
            selectedChipsArray.push(<SelectedChip deselectTag={this.deselectTag} key={i} data={this.state.selectedChips[i]}/>)
        }

        return(
            <div className="chat-left-pane-container" id="chat-left-pane">
                <div className="body-wrapper">
                    <div></div><br/><br/>
                    <div className={classnames({ 'display-none': !this.state.visibility.observations})}>
                        <div className="heading-title">Manual Search</div>
                        <div id="search_container">
                            <div className='form-group'>
                                <Select
                                    name="search"
                                    value={this.state.selectedChips}
                                    placeholder= {this.state.placeholder}
                                    options={this.state.searchItems}
                                    onChange={this.selectBoxChanged}
                                    onInputChange={this.searchInputChanged}
                                />
                            </div>
                        </div>
                        <hr/>
                        <div className="heading-title">Observations from TCC Analysis</div><br/>
                        <div className="unselected-chips flex-container flex-start-h">
                            {recommendedChipsArray}
                        </div><hr/>
                        <div>
                            <div className="heading-title">Suspected Symptoms</div>
                            {(selectedChipsArray.length > 0) ? (
                                    <div>
                                        <h5 className="">Your selected observations</h5>
                                        <div className="selected-chips flex-container flex-start-h">
                                            {selectedChipsArray}
                                        </div>
                                        {/* <div className="text-center">
                                         <button onClick={this.next} className={classnames('next-button', { 'display-none': this.state.selectedChips.length == 0})}>Submit</button>
                                         </div>*/}
                                    </div>
                                ) : null}
                            {(unSelectedChipsArray.length == 0 && selectedChipsArray.length == 0) ? (
                                    <div className="text-center">
                                        <br/><br/>
                                        <img src={require('../../../public/images/icons/ring.gif')} width="40px"/>
                                        <p>Loading observations...</p>
                                    </div>
                                ) : null}
                            {(unSelectedChipsArray.length > 0) ? (
                                    <div><br/>
                                        <h5 className="">System Recommedations</h5>
                                        <div className="unselected-chips flex-container flex-start-h">
                                            {unSelectedChipsArray}
                                        </div>
                                    </div>
                                ) : null}
                            <div id="search_container">
                                <div className='form-group'>
                                    <Select
                                        name="search"
                                        value={this.state.selectedChips}
                                        placeholder= {this.state.placeholder}
                                        options={this.state.searchItems}
                                        onChange={this.selectBoxChanged}
                                        onInputChange={this.searchInputChanged}
                                    />
                                </div>
                            </div>
                        </div>
                        <hr/><br/>
                    </div>
                </div>
            </div>
        )
    }
}


class RecommendedChip extends React.Component {
    render() {
        return(
            <div className="recommended-chip chip flex-container">
                <div className="chip-label">{this.props.data.label}</div>
            </div>
        )
    }
}


class UnselectedChip extends React.Component {
    render() {
        return(
            <div onClick={() => this.props.selectTag(this.props.data)} className="available-chip chip flex-container">
                <div className="chip-label">{this.props.data.label}</div>
                <div className="chip-icon"><FaPlus/></div>
            </div>
        )
    }
}


class SelectedChip extends React.Component {
    render() {
        if(this.props.data) {
            return(
                <div onClick={() => this.props.deselectTag(this.props.data)} className="selected-chip chip flex-container">
                    <div className="chip-label">{this.props.data.label}</div>
                    <div className="chip-icon"><FaTimes/></div>
                </div>
            )
        }

    }
}


export default ChatLeftPane;
