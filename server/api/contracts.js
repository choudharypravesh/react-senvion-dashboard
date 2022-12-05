import contracts from '../controllers/contracts'


//GET CONTRACT DATA
//get contract overview data
exports.getContractsOverView = function(req, res) {
    let params = ""
    contracts.getContractsOverView(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


//get contract form drop down data
exports.getContractDropDownData = function(req, res) {
    let params = ""
    contracts.getContractDropDownData(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


//get other table details related to contract
exports.getContracts = function(req, res) {
    let params = JSON.parse(req.query.data);
    contracts.getContracts(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


//get contract meta data details
exports.getContractsDetails = function(req, res) {
    console.log("comming till here");
    let params = JSON.parse(req.query.data);

    contracts.getContractsDetails(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


//get contract meta data details
exports.getContractsTurbineDetails = function(req, res) {
    let params = JSON.parse(req.query.data);
    contracts.getContractsTurbineDetails(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


//UPDATE DATA
//update contract details
exports.updateContractDetails = function(req, res) {
    let params = JSON.parse(req.body.data);
    contracts.updateContractDetails(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


//update contract turbine details
exports.updateContractTurbineDetails = function(req, res) {
    let params = JSON.parse(req.body.data);
    contracts.updateContractTurbineDetails(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


//CREATE DATA
//create contract turbine details
exports.createContractDetails = function(req, res) {
    let params = JSON.parse(req.body.data);
    contracts.createContractDetails(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}


//create contract details
exports.createContractTurbineDetails = function(req, res) {
    let params = JSON.parse(req.body.data);
    contracts.createContractTurbineDetails(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}