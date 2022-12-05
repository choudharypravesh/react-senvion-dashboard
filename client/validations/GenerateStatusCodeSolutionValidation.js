import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    console.log(data.systems);

    if(Validator.isEmpty(data.cause)) {
        errors.cause = "Enter the cause"
    }

    if(Validator.isEmpty(data.statusCodes.toString())) {
        errors.statusCodes = "Enter the status codes"
    }

    if(Validator.isEmpty(data.observations.toString())) {
        errors.observations = "Please select the observations"
    }

    if(Validator.isEmpty(data.subSystems.toString())) {
        errors.subSystems = "Please select the sub systems"
    }

    if(Validator.isEmpty(data.systems.toString())) {
        errors.systems = "Please select the systems"
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