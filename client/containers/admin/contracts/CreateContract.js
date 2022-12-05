import React, {PropTypes} from 'react'
import '../../../../public/styles/containers/admin/contracts/CreateContract.css'
import { Link } from 'react-router';
import FaBack from 'react-icons/lib/fa/chevron-left'
import { Nav, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as AppActions from '../../../../client/actions/AppActions'
import classnames from 'classnames'
import ContractForm from './ContractForm'
import {postContractDetails} from "../../../actions/AppActions"
class CreateContract extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: 1
        }

        this.showNext = this.showNext.bind(this);
        this.showPrev = this.showPrev.bind(this);
        this.showOverView = this.showOverView.bind(this);
    }

    showNext() {
        if (this.props.currentlyShowing == 'contractForm'){
            this.props.postData();
        }
        this.props.setCurrentlyShowing('subContractForm');
    }
    showPrev(){
        this.props.setCurrentlyShowing('contractForm');
    }
    showOverView(){
        this.props.setCurrentlyShowing('overview');
    }

    render() {

        return(
            <div className="create-contract-container"><br/>
                <div className="shadow-box">
                    <div className="buttons-wrapper flex-container flex-end-h">
                        <div><button
                            onClick={this.showPrev}
                            className={classnames('btn btn-primary',{'display-none': this.props.currentlyShowing !== 'subContractForm'})}>
                            Previous</button>
                        </div>
                        <div>&nbsp;&nbsp;</div>
                        <div><Link onClick = {this.showOverView} className="btn btn-danger">Cancel</Link></div>
                        <div>&nbsp;&nbsp;</div>
                        <div><button
                            onClick={this.showNext}
                            className={classnames('btn btn-primary',{'display-none': this.props.currentlyShowing !== 'contractForm'})}>
                            Next</button>
                        </div>
                    </div>

                    <form noValidate id="contract-form" name="contractForm">
                        <ContractForm currentPage = {this.props.currentlyShowing} selectedContractId={this.props.selectedContractId} mode = {this.props.mode}/>
                    </form>

                    <div className="buttons-wrapper flex-container flex-end-h">
                        <div><button
                            onClick={this.showPrev}
                            className={classnames('btn btn-primary',{'display-none': this.props.currentlyShowing !== 'subContractForm'})}>
                            Previous</button>
                        </div>
                        <div>&nbsp;&nbsp;</div>
                        <div><Link onClick = {this.showOverView} className="btn btn-danger">Cancel</Link></div>
                        <div>&nbsp;&nbsp;</div>
                        <div><button
                            onClick={this.showNext}
                            className={classnames('btn btn-primary',{'display-none': this.props.currentlyShowing !== 'contractForm'})}>
                            Next</button>
                        </div>
                    </div>

                    <br/><br/><br/>
                </div><br/><br/><br/>
            </div>
        )
    }
}




CreateContract.propTypes = {
    children: PropTypes.node,
    values: PropTypes.object,
    update: PropTypes.func,
    reset: PropTypes.func,
    onSubmit: PropTypes.func
};


export default connect(state => state, AppActions)(CreateContract);              //CreateContract;

