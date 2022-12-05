var postgres = require('../hilbert_db/schema');
var sequelize = require('sequelize');

//Get all the orders for technician
exports.getTechnicianAll = function(params, callback) {
    console.log("params" + JSON.stringify(params));
    var user_name = 3;
    console.log("select t3.order_id , t3.turbine_id , t4.wind_turbine_group as model , t4.farm_name , t3.description , " +
        "t3.status_codes as operations, t3.start_date , t3.start_time , t3.end_date , t3.end_time , t3.assigned_to,  t3.recommended_observations as recommended_observations, " +
        "t3.approved_by as approved_by, t3.approval_status as approval_status, t3.order_status as order_status from " +
        "(select t1.order_id as order_id , t1.turbine_id as turbine_id , t1.status_codes as status_codes,  t1.recommended_observations as recommended_observations, " +
        " t1.description as description , t1.approved_by as approved_by, t1.approval_status as status, " +
        "t2.start_date as start_date, t2.start_time as start_time,  t2.end_date as end_date, t1.order_status as order_status, " +
        " t2.end_time as end_time ,t2.assigned_to as assigned_to from service_order_details t1 left outer join order_schedule t2 on " +
        " t1.order_id = t2.order_id) t3 left outer join turbine_master_data t4 on t3.turbine_id = t4.wind_turbine_serial_id " +
        " where t3.assigned_to = (select employee_id from user_details where user_id =" + user_name + ")");

    postgres.sequelize.query("select t3.order_id , t3.turbine_id , t4.type as model , t4.wind_farm as farm_name , t3.description , " +
        "t3.status_codes as operations, t3.start_date , t3.start_time , t3.end_date , t3.end_time , t3.assigned_to, t3.recommended_observations as recommended_observations, " +
        "t3.approved_by as approved_by, t3.approval_status as approval_status, t3.order_status as order_status from " +
        "(select t1.order_id as order_id , t1.turbine_id as turbine_id , t1.status_codes as status_codes, t1.recommended_observations as recommended_observations, " +
        "t1.description as description , t1.approved_by as approved_by, t1.approval_status as approval_status, " +
        "t2.start_date as start_date, t2.start_time as start_time,  t2.end_date as end_date, t1.order_status as order_status, " +
        " t2.end_time as end_time ,t2.assigned_to as assigned_to from service_order_details t1 left outer join order_schedule t2 on " +
        " t1.order_id = t2.order_id) t3 left outer join turbine_master_datas t4 on t3.turbine_id = t4.serial_number " , {
            type: sequelize.QueryTypes.SELECT
        }).then(function(data) {
        //console.log(data);
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        callback(false, 300, "Error : " + err, {});
    });
}


//Get all the orders for Admin
exports.getAdminAll = function(params, callback) {
     console.log("select t3.order_id , t3.turbine_id , t4.wind_turbine_group as model , t4.farm_name , t3.description , " +
        "t3.assigned_to,  t3.approval_status as approval_status, t3.order_status as order_status from " +
        "(select t1.order_id as order_id , t1.turbine_id as turbine_id , t1.status_codes as status_codes, " +
        " t1.description as description , t1.approved_by as approved_by, t1.approval_status as status, " +
        "t2.start_date as start_date, t2.start_time as start_time,  t2.end_date as end_date, t1.order_status as order_status, " +
        " t2.end_time as end_time ,t2.assigned_to as assigned_to from service_order_details t1 left outer join order_schedule t2 on " +
        " t1.order_id = t2.order_id) t3 left outer join turbine_master_data t4 on t3.turbine_id = t4.wind_turbine_serial_id " +
        " where t3.assigned_to = (select employee_id from user_details where user_id =3)");

    postgres.sequelize.query("select t3.order_id , t3.turbine_id , t4.type as model , t4.wind_farm as farm_name , t3.description , " +
        "t3.assigned_to, t3.approval_status as approval_status, t3.order_status as order_status from " +
        "(select t1.order_id as order_id , t1.turbine_id as turbine_id , t1.status_codes as status_codes, " +
        "t1.description as description , t1.approved_by as approved_by, t1.approval_status as approval_status, " +
        "t2.start_date as start_date, t2.start_time as start_time,  t2.end_date as end_date, t1.order_status as order_status, " +
        " t2.end_time as end_time ,t2.assigned_to as assigned_to from service_order_details t1 left outer join order_schedule t2 on " +
        " t1.order_id = t2.order_id) t3 left outer join turbine_master_datas t4 on t3.turbine_id = t4.serial_number " +
        "WHERE order_status in (2, 3)" , {
            type: sequelize.QueryTypes.SELECT
        }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        callback(false, 300, "Error : " + err, {});
    });
}


//getTroubleshootSteps
exports.getAll = function(params, callback) {     
    postgres.service_order_details.findAll({
        where: params

    }).then(function(data) {
        console.log(data)
        console.log("done")
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}

exports.create = function(params, callback) {
    console.log("Inside controller");
    console.log(params);
    postgres.service_order_details.create(params).then(function(data) {
        console.log(data)
        console.log("done")
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}

exports.getStatusCodes = function(params, callback) {
    let query_string = "SELECT status_codes FROM service_order_details WHERE order_id = $order_id "
    postgres.sequelize.query(query_string, {
        bind: {
            order_id : params.order_id
        },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        callback(false, 300, "Error : " + err, {});
    });
}

exports.update = function(order_id, params, callback) {
    if (params.order_status == 2) {
        params.approval_status = false
    }
    postgres.service_order_details.update(params, {
        where: {
            order_id: order_id,
        }
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}