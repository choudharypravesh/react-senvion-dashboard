import troubleshootView from '../controllers/troubleshootView';
import alerts from '../controllers/alerts';
var _ = require('underscore');


exports.getTroubleshootView = function(req, res) {
    console.log("comming to troubleshootView of technician");

    //var params = JSON.parse(req.body.data);
    var params = (req.body);
    console.log(params);
    troubleshootView.getTechnicianAll(params, function(s, c, m, d) {
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: _.map(d, function(dt) {
                return (_.pick(dt, "order_id", "turbine_id", "model", "farm_name", "description", "operation_codes",
                    "start_date", "start_time", "end_date", "end_time", "order_status", "recommended_observations"))
            })
        }));
    })
}


exports.createServiceRequest = function(req, res) {
    console.log("request body");
    console.log(req.body);
    var params = JSON.parse(req.body.data);
    troubleshootView.create(params, function(s,c,m,d) {
        if(s) {
            if (params.view_type == 0) {
                let params_alerts = {
                    id: params.id,
                    status: params.status,
                    recommended_observations: params.recommended_observations,
                    order_id: params.order_id
                }
                res.send(JSON.stringify({
                    status: s,
                    code: c,
                    message: m,
                    data: params_alerts.order_id
                }));

            } else if (params.view_type == 1) {
                let params_alerts = {
                    id: params.id,
                    status: params.status,
                    recommended_observations: params.recommended_observations,
                    order_id: params.order_id
                }            
                troubleshootView.getTechnicianAll(params, function(s, c, m, d) {
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: _.map(d, function(dt) {
                            return (_.pick(dt, "order_id", "turbine_id", "model", "farm_name", "description", "operation_codes",
                                "start_date", "start_time", "end_date", "end_time", "order_status", "recommended_observations"))
                        })
                    }));
                })            
            } else {
                console.log("INTO ELSE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                let params_alerts = {
                    id: params.id,
                    status: params.status,
                    recommended_observations: params.recommended_observations,
                    order_id: params.order_id
                }
                alerts.update(params_alerts, function(s1, c1, m1, d1) {
                    console.log(s, c, m, d)
                    res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: d
                    }));
                })
                    /*res.send(JSON.stringify({
                        status: s,
                        code: c,
                        message: m,
                        data: params_alerts.order_id
                    }));*/
            }
            
        } else {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: "Error "+m,
                data: d
            }));
        }
    })
}



exports.getAdminTroubleshootView = function(req, res) {
    console.log("comming to troubleshootView of admin");

    //var params = JSON.parse(req.body.data);
    var params = (req.body);
    troubleshootView.getAdminAll(params, function(s, c, m, d) {
        console.log("data "+JSON.stringify(d));
        res.send(JSON.stringify({
            status: s,
            code: c,
            message: m,
            data: d
        }));
    })
}
            

exports.updateAdminTroubleshootApprovalReject = function(req, res) {
    var params = JSON.parse(req.body.data);
    var order_id = params.order_id;
    //var params = req.body;
    console.log(params);
    troubleshootView.update(order_id, params, function(s, c, m, d) {
        troubleshootView.getAdminAll(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: _.map(d, function(dt) {
                    return (_.pick(dt, "order_id", "turbine_id", "model", "farm_name", "description", "approval_status", "assigned_to"))
                })
            }));
        })
    })
}

exports.updateUserTroubleshootApprovalReject = function(req, res) {
    var params = JSON.parse(req.body.data);
    //var params = req.body;
    var order_id = params.order_id;
    console.log(params);
    //var order_id = "US987";
    troubleshootView.update(order_id, params, function(s, c, m, d) {
        troubleshootView.getTechnicianAll(params, function(s, c, m, d) {
            res.send(JSON.stringify({
                status: s,
                code: c,
                message: m,
                data: _.map(d, function(dt) {
                    return (_.pick(dt, "order_id", "turbine_id", "model", "farm_name", "description", "operation_codes",
                        "start_date", "start_time", "end_date", "end_time", "order_status"))
                })
            }));
        })
    })
}