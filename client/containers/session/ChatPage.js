import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import styles from '../../../public/styles/styles.css';
import ChatPageStyles from '../../../public/styles/containers/session/ChatPage.css';
import ToggleDisplay from 'react-toggle-display';
import ChatLeftPane from './ChatLeftPane'
import ChatMiddlePane from './ChatMiddlePane'
import { Link } from 'react-router';
import Rating from 'react-rating'

import ChatIcon from '../../../public/images/chatbot.svg'

import ArrowRight from 'react-icons/lib/fa/arrow-right';
import TickCircle from 'react-icons/lib/fa/check-circle'


import axios from 'axios';

class ChatPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            possibilities: [],
            solutionSteps: [],
            isSessionEnded: false
        }

        this.showSolutionSteps = this.showSolutionSteps.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.endSession = this.endSession.bind(this);

    }

    endSession() {
        var data = {};
        var self = this;
        data.order_id = localStorage.playOrderNumber;
        data.order_status = 3;
        axios.post('/api/technician/troubleshoot/update', 'data='+JSON.stringify(data))
            .then(function(response) {
                console.log(response.data.data);
                localStorage.removeItem('playOrderNumber');
                self.setState({isSessionEnded: true});
            }).catch(function(err) {
            console.log(err);
            window.alert("Faliure "+err);
        });
    }


    onNextClick(possibilities) {
        console.log("here are the possibilities");
        console.log(possibilities)
        this.setState({possibilities: possibilities});
        this.refs.middleSection.displayPossibilities(possibilities);
    }

    showSolutionSteps(data) {
        console.log(data);
        this.setState({solutionSteps: []});
        for(let i=0; i<data.length; i++) {
            this.state.solutionSteps.push(<SolutionSteps key={i} index={i+1} step={data[i]} />)
        }
        this.setState({solutionSteps: this.state.solutionSteps})
    }

    render() {
        const chatConatiner = {
            position: 'relative',
            height: '100vh',
            overflowY: 'scroll'
        };

        return (
            <div className="chatpage-container body-wrapper row flex-container flex-sb-h flex-start-v">
                <div className="left-section col"><br/><br/>
                    <ChatMiddlePane ref="middleSection" showSolutionSteps={this.showSolutionSteps}/>
                    <ChatLeftPane onNextClick={this.onNextClick} showSolutionSteps={this.showSolutionSteps}/>
                </div>
                {/*<div className="middle-section col"><br/><br/>
                    <ChatMiddlePane ref="middleSection" showSolutionSteps={this.showSolutionSteps}/>
                </div>*/}
                <div style={chatConatiner} className="right-section col"><br/><br/>
                    <div className="solutions-container">
                        <div className="heading-title">Follow these steps to solve this issue:</div>
                        <div className="solution-steps">
                            {this.state.solutionSteps}
                        </div><br/>
                        {(this.state.solutionSteps.length > 0) ? (
                                <form className="comments-section">
                                    <div className="rating margin-bottom">
                                        <div>
                                            <label>Rate your experience:</label>
                                        </div>
                                        <div>
                                            <Rating
                                                empty={<img src={require('../../../public/images/icons/empty-star.png')} className="icon" />}
                                                full={<img src={require('../../../public/images/icons/filled-star.png')} className="icon" />}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="comment">Comment:</label>
                                        <textarea className="form-control" rows="5" id="comment"></textarea>
                                    </div>
                                </form>
                            ) : null}
                        <div className="end-session-button text-right">
                            <button onClick={this.endSession} className={classnames('end-session display-none')}>End Session</button>
                        </div><br/><br/>
                        <div className={classnames('transparent', { 'display-none': !this.state.isSessionEnded})}>
                            <div className="text-center session-end-model">
                                <div>
                                    <img src={require('../../../public/images/chatbot.svg')} width='20%'></img>
                                </div>
                                <div className="heading-title">YOUR SESSION HAS ENDED</div><br/>
                                <div className="text"><Link to="/service-assist/orders-list-view"><span className="link">Click Here</span></Link> to go back to Orders List View</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


class SolutionSteps extends React.Component {
    constructor(props) {
        super(props)

        this.stepDone = this.stepDone.bind(this);
    }

    stepDone(index) {
        var element = document.getElementById('tick'+index)
        element.className += " completed"

        if(document.querySelectorAll('.completed').length == document.querySelectorAll('.solution-step').length) {
            document.querySelector('.end-session-button button').classList.remove("display-none");
        }
    }


    render() {
        return(
            <div className="solution-step flex-container-nowrap flex-sb-h">
                <div className="flex-container-nowrap flex-start-h flex-start-v">
                    <div className="step-number bg-success badge">Step {this.props.index}</div>
                    <div className="step-text">{this.props.step}</div>
                </div>
                <div id={"tick"+this.props.index} onClick={() => this.stepDone(this.props.index)} className="step-tick"><TickCircle/></div>
            </div>
        )
    }
}

export default ChatPage;