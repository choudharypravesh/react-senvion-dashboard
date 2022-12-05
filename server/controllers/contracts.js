import _ from 'underscore';
import axios from 'axios';

// GET DATA
//get contract overview details
exports.getContractsOverView = function(params, callback) {
     axios.get("http://172.20.104.78:5000/get/contracts/overview/")
     .then(function(response) {
         callback(true, 200, "Success", response.data);
     }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


//get other table details related to contract
exports.getContracts = function(params, callback) {
    console.log("then in controller");
     axios.get("http://172.20.104.78:5000/get/contracts/"+params.wpac+"/")
     .then(function(response) {
         callback(true, 200, "Success", response.data);
     }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


//get contract meta data details
exports.getContractsDetails = function(params, callback) {
    console.log("then in controller");
     axios.get("http://172.20.104.78:5000/get/contracts/details/"+params.cno+"/")
     .then(function(response) {
         callback(true, 200, "Success", response.data);
     }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


//get contract turbine details
exports.getContractsTurbineDetails = function(params, callback) {
    console.log("then in controller");
     axios.get("http://172.20.104.78:5000/get/contracts/turbine/details/"+params.cno+"/"+params.wpac)
     .then(function(response) {
         callback(true, 200, "Success", response.data);
     }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


//get contract form dropdowns
exports.getContractDropDownData = function(params, callback) {
     axios.get("http://172.20.104.78:5000/get/contracts/dropdown/")
     .then(function(response) {
         callback(true, 200, "Success", response.data);
     }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


//UPDATE DATA
//update contract details
exports.updateContractDetails = function(params, callback) {
     axios.post("http://172.20.104.78:5000/update/contract/details/", params)
     .then(function(response) {
         callback(true, 200, "Success", response.data);
     }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


//update contract turbine details
exports.updateContractTurbineDetails = function(params, callback) {
     axios.post("http://172.20.104.78:5000/update/contract/turbine/", params)
     .then(function(response) {
         callback(true, 200, "Success", response.data);
     }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}


//CREATE DATA
//create contract turbine details
exports.createContractTurbineDetails = function(params, callback) {
    console.log("then in controller");
     axios.post("http://172.20.104.78:5000/create/contract/turbine/", params)
     .then(function(response) {
         callback(true, 200, "Success", response.data);
     }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

//create contract details
exports.createContractDetails = function(params, callback) {
    console.log("then in controller");
     axios.post("http://172.20.104.78:5000/create/contract/details/", params)
     .then(function(response) {
         callback(true, 200, "Success", response.data);
     }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}