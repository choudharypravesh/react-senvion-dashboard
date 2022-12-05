import React from 'react'
import Css from './Skeleton.css'
import FaHeart from 'react-icons/lib/fa/heart'
import FaReply from 'react-icons/lib/fa/mail-reply'
import ReactCookie from 'react-cookie';
import axios from 'axios'
import _ from 'underscore'
import moment from 'moment'
import classnames from 'classnames'

class Skeleton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedAlert: localStorage.selectedAlert ? JSON.parse(localStorage.selectedAlert) : "90983",
            enteredComment: "",
            user: ReactCookie.load('user'),
            mainUserComments: [],
            showUserComments: false,
            commentsShowLink: 'Show user comments'
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showHideComments = this.showHideComments.bind(this);

    }

    componentDidMount() {
        var self = this;

        console.log(moment('2017-06-06 17:52:35.778').format())

        axios.get('/api/get/predictive_analysis/alerts/comments?alert_id='+self.state.selectedAlert.id)
            .then(function(response) {
                console.log(response.data.data);
                console.log(response.data.data);
                let comments = _.map(response.data.data, function(item) {
                    return item.comment_string
                })

                self.setState({mainUserComments: response.data.data});

            }).catch(function(err) {
            console.log(err);
            window.alert("Faliure "+err);
        });

    }

    showHideComments() {
        var self = this;
        console.log(self)
        if(self.state.showUserComments == false) {
            self.setState({showUserComments: true, commentsShowLink: 'Hide user comments'})
            setTimeout(function() {
                window.scrollTo(0, window.innerHeight+100);
            }, 500)
        } else {
            self.setState({showUserComments: false, commentsShowLink: 'Show user comments'})
        }
    }

    onChange(e) {
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit(e) {
        var self = this;
        e.preventDefault();

        let data = {
            alert_id: self.state.selectedAlert.id,
            alert_name: self.state.selectedAlert.alerts,
            user_id: self.state.user.user_id,
            comment_string: self.state.enteredComment
        }

        console.log(data);

        axios.post('/api/post/predictive_analysis/alerts/comments', 'data='+JSON.stringify(data))
            .then(function(response) {
                console.log(response.data.data);

                self.setState({mainUserComments: response.data.data, enteredComment: "", showUserComments: true, commentsShowLink: 'Hide user comments'});
                setTimeout(function() {
                    window.scrollTo(0, window.innerHeight+100);
                }, 500)

            }).catch(function(err) {
            console.log(err);
            window.alert("Faliure "+err);
        });

    }


    render() {
        return(
            <div className="comments-container">
                <h3>Observations</h3><br/>

                <div className="">
                    <form>
                        <div className="form-group">
                            <textarea
                                value={this.state.enteredComment}
                                name="enteredComment"
                                placeholder="Write your comment here.."
                                className="form-control"
                                rows="5"
                                id="enteredComment"
                                onChange={this.onChange} />
                        </div>
                        <div>
                            <button onClick={this.onSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div><br/><br/>

                <div onClick={this.showHideComments} className="link">{(this.state.mainUserComments.length > 0) ? this.state.commentsShowLink: null}</div><br/><br/>

                <ul id="comments-list" className={classnames('comments-list', { 'display-none': !this.state.showUserComments})}>
                   <Comments mainUserComments={this.state.mainUserComments} user={this.state.user}/>
                </ul>
            </div>
        )
    }
}


class Comments extends React.Component {

    render() {
        let comments = [];

        for(let i=0; i<this.props.mainUserComments.length; i++) {
            comments.push(<li key={i}>
                <div className="comment-main-level">

                    <div className="comment-avatar"><img src={this.props.user.picture} alt=""/></div>

                    <div className="comment-box">
                        <div className="comment-head">
                            <h6 className="comment-name by-author"><a>{this.props.mainUserComments[i].employee_name}</a></h6>
                            <span>{moment(this.props.mainUserComments[i].createdAt).add(6, 'hours').startOf('hour').fromNow()}</span>
                            {/*<FaReply/>
                            <FaHeart/>*/}
                        </div>
                        <div className="comment-content">
                            {this.props.mainUserComments[i].comment_string}
                        </div>
                    </div>
                </div>

               {/* <ul className="comments-list reply-list">
                    <li>

                        <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""/></div>

                        <div className="comment-box">
                            <div className="comment-head">
                                <h6 className="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
                                <span>hace 10 minutos</span>
                                <FaReply/>
                                <FaHeart/>
                            </div>
                            <div className="comment-content">
                                I agree.
                            </div>
                        </div>
                    </li>

                    <li>

                        <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""/></div>

                        <div className="comment-box">
                            <div className="comment-head">
                                <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">Agustin Ortiz</a></h6>
                                <span>hace 10 minutos</span>
                                <FaReply/>
                                <FaHeart/>
                            </div>
                            <div className="comment-content">
                                Mee too.
                            </div>
                        </div>
                    </li>
                </ul>*/}
            </li>)
        }

        return(
            <div>
                {comments}
            </div>
        )
    }
}

export default Skeleton

