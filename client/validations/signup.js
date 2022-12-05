import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if(Validator.isEmpty(data.lgUsername)) {
        errors.lgUsername = "Username is required"
    }

    if(Validator.isEmpty(data.lgPassword)) {
        errors.lgPassword = "Password is required"
    }

   if(isEmpty(errors)) {
       return {
           errors, isValid: true
       }
   } else {
       return {
           errors,
           isValid: false
       }
   }
}