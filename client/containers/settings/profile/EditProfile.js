import React from 'react';
import '../../../../public/styles/containers/settings/profile/EditProfile.css'
import ReactCookie from 'react-cookie';
import axios from 'axios';
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getUserDetails,
    getCountries,
    onChangeTextEditProfile,
    changePassword,
    changeErrorCount,
    changeSettingsData, validatingPassword, setRibbonSuccess, resetStatesEditProfile } from '../../../../client/actions/AppActions'
import TextBox from '../../../components/Form/TextBox/TextBox'
import DropDown from '../../../components/Form/DropDown/DropDown'

class EditProfile extends React.Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);

    }

    componentDidMount() {
        const {dispatch} = this.props;
        let data = {
            user_id: ReactCookie.load('user').user_id
        }
        dispatch(getUserDetails(data));
        dispatch(getCountries())
    }


    onChange(e) {
        let self = this;
        const { dispatch } = this.props;
        if(e.target.name == 'photo') {
            self.setState({file: e.target.files[0]});
            if (e.target.files && e.target.files[0]) {
                let reader = new FileReader();

                reader.onload = function (e) {
                    console.log("reader loaded")
                    $('#blah')
                        .attr('src', e.target.result)
                    localStorage.user_pic= e.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            }

            self.setState({chosenImage: e.target.value})
        }
        dispatch(onChangeTextEditProfile(e));
    }


    changePassword(e) {
        e.preventDefault();
        const {dispatch} = this.props

        let passwords = {
            current: this.props.currentPassword,
            newPass: this.props.newPassword1,
            newRepeat: this.props.newPassword2
        }
        dispatch(validatingPassword(passwords));

        let data = {
            old_password: this.props.currentPassword,
            user_id: this.props.user.user_id,
            password: this.props.newPassword1,
            username: this.props.username
        }

        if(this.props.passwordErrorId == 0 && data.old_password.length >= 7 &&
        data.password.length >= 7 && this.props.newPassword2.length >= 7) {
            dispatch(changePassword(data));
            setTimeout(function() {
                dispatch(setRibbonSuccess(false))
            }, 3000)
        }

    }


    handleSubmit(e) {
        e.preventDefault();
        console.log("coming into handle submit");
        let self = this;
        const { dispatch } = this.props

        var form = document.getElementById("form");
        var formData = new FormData(form);
        let isError = false;

        if(self.props.first_name.length == 0 || self.props.last_name.length == 0 || self.props.email_id.length == 0) {
            isError = true;
            dispatch(changeErrorCount(1))
        } else {
            isError = false;
            dispatch(changeErrorCount(0))
        }

        if(isError == false) {
            dispatch(changeSettingsData(formData))
            setTimeout(function() {
                dispatch(setRibbonSuccess(false))
            }, 3000)
            $('.user_pic img')
                .attr('src', localStorage.user_pic)
        }
    }

    onBlur() {
        const {dispatch} = this.props

        let passwords = {
            current: this.props.currentPassword,
            newPass: this.props.newPassword1,
            newRepeat: this.props.newPassword2
        }
        dispatch(validatingPassword(passwords));
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetStatesEditProfile());
    }


    render() {
        let options = [];
        let  picture_name = this.props.picture_link.substr(this.props.picture_link.lastIndexOf('/')+1,
            this.props.picture_link.length-1)
        for(let i=0; i<this.props.countries.length; i++) {
            options.push(<option>{this.props.countries[i].country_name}</option>);
        }

        console.log(options);

        let messageStyle={color: 'red'}
        if(this.props.messageSuccessBox){
            messageStyle={color: 'green'}
        }
        return(
            <div className="edit-profile-container">
               <div className="heading-title padding-small">General Account Settings</div><br/>
                <div className="form-box">
                    <form onSubmit={this.handleSubmit} id="form" role="form" action="api/post/user/setting" method="post" encType="multipart/form-data">

                        {/*USER_ID*/}
                        <div className="form-group display-none">
                            <label className="col-sm-4 control-label" htmlFor="user_id">User ID</label>
                            <div className="col-md-8">
                                <input placeholder="user_id" type="text" value={this.props.user.user_id} className="form-control" name="user_id" id="user_id" size="10"/>
                            </div>
                        </div>



                        {/*PROFILE PHOTO*/}
                        <div className="form-group">
                            <label className="col-sm-4 control-label" htmlFor="upload-picture">Upload Picture</label>
                            <div className="col-md-8">
                                <div className="flex-container-nowrap flex-start-h flex-start-v">
                                    <div>
                                        <div className="user-avatar">
                                            <img id="blah" src={this.props.picture_link} width="100%"/>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="file" className="form-control-file" onChange={this.onChange} name="photo" id="photo"/>
                                        <small id="fileHelp" className="form-text text-muted">{
                                            (this.props.picture_link == 'files/default.jpg') ? "Upload your recent profile picture" :
                                                picture_name  }
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div><br/>

                        {/*FIRST NAME*/}
                        <div className={classnames('form-group', {'has-error': this.props.first_name.length == 0 })}>
                            <label className="col-sm-4 control-label" htmlFor="first_name">First Name</label>
                            <div className="col-md-8">
                                <input
                                       placeholder="Firstname"
                                       value={this.props.first_name}
                                       onChange={this.onChange}
                                       type="text"
                                       className="form-control"
                                       name="first_name"
                                       id="first_name"
                                       size="10"/>
                            </div>
                        </div>

                        {/*LAST NAME*/}
                        <div className={classnames('form-group', {'has-error': this.props.last_name.length == 0 })}>
                            <label className="col-sm-4 control-label" htmlFor="last_name">Last Name</label>
                            <div className="col-md-8">
                                <input
                                       placeholder="Lastname"
                                       value={this.props.last_name}
                                       onChange={this.onChange}
                                       type="text"
                                       className="form-control"
                                       name="last_name"
                                       id="last_name"
                                       size="10"/>
                            </div>
                        </div>

                        {/*USER NAME*/}
                        <div className="form-group">
                            <label className="col-sm-4 control-label" htmlFor="username">Username</label>
                            <div className="col-md-8">
                                <input disabled
                                       placeholder={this.props.username}
                                       value={this.props.username}
                                       onChange={this.onChange}
                                       type="text"
                                       className="form-control"
                                       name="username"
                                       id="username"
                                       size="10"/>
                            </div>
                        </div>

                        {/*EMAIL*/}
                        <div className={classnames('form-group', {'has-error': this.props.email_id.length == 0 })}>
                            <label className="col-sm-4 control-label" htmlFor="email_id">Email ID</label>
                            <div className="col-md-8">
                                <input
                                       placeholder="Enter your email id"
                                       value={this.props.email_id}
                                       onChange={this.onChange}
                                       type="email"
                                       className="form-control"
                                       name="email_id"
                                       id="email_id"
                                       size="10"/>
                            </div>
                        </div>

                        {/*LANGUAGE SETTINGS*/}
                        <div className="form-group">
                            <label className="col-sm-4 control-label" htmlFor="language-settings">Language</label>
                            <div className="col-md-8">
                                <select value={this.props.language} onChange={this.onChange} name="language" id="language" className="form-control">
                                    <option>English</option>
                                    <option>German</option>
                                    <option>French</option>
                                    <option>Hindi</option>
                                </select>
                            </div>
                        </div>

                        {/*SENVION OFFICE*/}
                        <div className="form-group">
                            <label className="col-sm-4 control-label" htmlFor="country">Senvion Office</label>
                            <div className="col-md-8">
                                <select value={this.props.country} onChange={this.onChange} name="country" id="country" className="form-control">
                                    {options}
                                </select>
                            </div>
                        </div><br/>

                        <div className={classnames('alert alert-danger', {'display-none': this.props.errorCount == 0 })}>
                            <strong>Error!</strong> Please fill all the mandatory fields.
                        </div><br/>
                        <div className="text-center">
                            <input type="submit" className="submit btn btn-primary" value="Submit"/>
                        </div>

                        <hr/>
                    </form>


                    {/*PASSWORD CHANGE FORM*/}
                    <form onSubmit={this.changePassword}>
                        <div className="password-container">
                            <div className="padding-small">
                                <div className="heading-title">Password</div>
                                <small>Change your password or recover your current one.</small>
                            </div><br/>

                            {/*CURRENT PASSWORD*/}
                            <div className={classnames('form-group', {'has-error': this.props.passwordErrorId == 1 })}>
                                <label className="col-sm-4 control-label" htmlFor="currentPassword">Current Password</label>
                                <div className="col-md-8">
                                    <input value={this.props.currentPassword}
                                           onChange={this.onChange}

                                           placeholder="Current password"
                                           type="password"
                                           className="form-control"
                                           name="currentPassword"
                                           id="currentPassword"
                                           size="10"/>
                                </div>
                            </div>

                            {/*NEW PASSWORD*/}
                            <div className={classnames('form-group', {'has-error': this.props.passwordErrorId == 2 })}>
                                <label className="col-sm-4 control-label" htmlFor="newPassword1">New Password</label>
                                <div className="col-md-8">
                                    <input value={this.props.newPassword1}
                                            onChange={this.onChange}

                                            placeholder="New password" type="password" className="form-control" name="newPassword1" id="newPassword1" size="10"/>
                                </div>
                            </div>

                            {/*VERIFY PASSWORD*/}
                            <div className={classnames('form-group', {'has-error': this.props.passwordErrorId == 3 })}>
                                <label className="col-sm-4 control-label" htmlFor="newPassword2">Verify Password</label>
                                <div className="col-md-8">
                                    <input value={this.props.newPassword2}

                                           onChange={this.onChange} placeholder="Verify password" type="password" className="form-control" name="newPassword2" id="newPassword2" size="10"/>
                                </div>
                            </div>
                        </div><br/>
                        <div className={classnames('alert alert-success', {'display-none': this.props.passwordErrorId !== 5 })}>
                            <strong>Success!</strong> &nbsp;{this.props.passwordErrorMessage}
                        </div>
                        <div className={classnames('alert alert-danger', {'display-none': this.props.passwordErrorId == 0 || this.props.passwordErrorId == 5 })}>
                            <strong>Error!</strong> &nbsp;{this.props.passwordErrorMessage}
                        </div><br/>
                        <div className="text-center top-buffer">
                            <input type="submit" className="submit btn btn-primary" value="Change Password"/>
                        </div><br/>
                    </form>
                </div>


                <div className={classnames('success-ribbon', { 'display-none': !this.props.isEditFormUpdated})}>Details Updated Successfully</div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    const { EditProfile } = state
    let editProfile = {
      user:  EditProfile.get('user'),
      userDetails:  EditProfile.get('userDetails'),
      countries: EditProfile.get('countries'),
      first_name:  EditProfile.get('first_name'),
      last_name:  EditProfile.get('last_name'),
      username:  EditProfile.get('username'),
      email_id:  EditProfile.get('email_id'),
      language:  EditProfile.get('language'),
      country: EditProfile.get('country'),
      file:  EditProfile.get('file'),
      picture_link:  EditProfile.get('picture_link'),
      chosenImage:  EditProfile.get('chosenImage'),
      currentPassword:  EditProfile.get('currentPassword'),
      newPassword1:  EditProfile.get('newPassword1'),
      newPassword2:  EditProfile.get('newPassword2'),
      messageSuccessBox:  EditProfile.get('messageSuccessBox'),
      message:  EditProfile.get('message'),
      passwordErrorMessage:  EditProfile.get('passwordErrorMessage'),
      errorCount: EditProfile.get('errorCount'),
      passwordErrorId: EditProfile.get('passwordErrorId'),
        isEditFormUpdated: EditProfile.get('isEditFormUpdated')
    }
    return editProfile
};


export default connect(mapStateToProps)(EditProfile);
