import moment from 'moment';
import ReactCookie from 'react-cookie';
import AppConstants from '../../../constants/AppConstants';
import {Map} from 'immutable'

let initialState=  Map({
  user: ReactCookie.load('user'),
  userDetails: {},
  countries: [],
  first_name: "",
  last_name: "",
  username: "",
  email_id: "",
  language: "",
  country: "",
  file: "",
  picture_link: "sdf/sdf",
  chosenImage: "",
  currentPassword: "",
  newPassword1: "",
  newPassword2: "",
  messageSuccessBox: false,
  message: "Details updated successfully",
  passwordErrorMessage: "",
  errorCount: 0,
  passwordErrorId: 0,
    isEditFormUpdated: false
})

const editProfileData = (state = initialState, action) => {
    switch(action.type){
        case AppConstants.GET_USER_DETAILS:
            return state.set('userDetails',action.payload.initialDate)
        case AppConstants.RECEIVED_USER_DETAILS:
        console.log("user details");
        console.log(action.payload.userDetails);
            return state.set('country', action.payload.userDetails.country)
                .set('email_id',action.payload.userDetails.email_id)
                .set('first_name',action.payload.userDetails.first_name)
                .set('language',action.payload.userDetails.language)
                .set('last_name',action.payload.userDetails.last_name)
                .set('picture_link',action.payload.userDetails.picture_link)
                .set('username',action.payload.userDetails.username)
        case AppConstants.GET_COUNTRIES:
            console.log(action.payload.countries);
            return state.set('countries',action.payload.countries.variablesData)
        case AppConstants.CHANGE_TEXT_EDIT_PROFILE:
        console.log(action.name);
            return state.set(action.name,action.payload)
        case AppConstants.CHANGE_PASSWORD:
            console.log(action.payload)
            return state.set('passwordErrorMessage',action.payload.data.passwordErrorMessage)
                .set('isEditFormUpdated',true)
                .set('passwordErrorId',action.payload.data.passwordErrorId)
        case AppConstants.ERROR_COUNT:
            return state.set('errorCount',action.payload.count)
        case AppConstants.SUBMIT_FORM:
            return state.set('errorCount',action.payload.count)
        case AppConstants.VALIDATE_PASSWORD:
            console.log(action.payload);
            return state.set('passwordErrorId',action.payload.data.error)
                .set('passwordErrorMessage',action.payload.data.message)
        case AppConstants.SUBMIT_SETTINGS_FORM:
            console.log(action.payload);
            return state.set('isEditFormUpdated',true)
        case AppConstants.SET_RIBBON_SUCCESS:
            console.log(action.payload.boolean);
            return state.set('isEditFormUpdated',action.payload.boolean)
        case AppConstants.RESET_STATES_EDIT_PROFILE:
            return state.set('passwordErrorMessage','')
                .set('isEditFormUpdated',false)
                .set('passwordErrorId',0)
                .set('currentPassword','')
                .set('newPassword1','')
                .set('newPassword2','')
        default:
            return state;

    }
}
export default editProfileData;
