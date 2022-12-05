var postgres  = require('../hilbert_db/schema');
var sequelize = require('sequelize');


exports.create = function(params, callback) {
    postgres.user_credentials.create({
        username: params.username,
        password: params.password

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


exports.get = function(params, callback) {
    postgres.user_credentials.findAll({
        where: {
            username: params.username,
            password: params.old_password
        }
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}


exports.getById = function(params, callback) {
    postgres.user_credentials.findAll({
        where: {
            user_id: params.user_id,
        }
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}



exports.login = function(params, callback) {
    console.log("Inside in login controller : "+ JSON.stringify(params))
    postgres.sequelize.query("SELECT t1.user_id, t1.username, t1.password, t3.user_group as user_type, t2.employee_name as name, t2.picture_link as user_pic "+
                            "FROM user_credentials t1 "+
                            "INNER JOIN user_details t2 "+
                            "ON t1.user_id = t2.user_id "+
                            "INNER JOIN user_group t3 "+
                            "ON t1.user_id = t3.user_id "+
                            "WHERE t1.username = $usr_nm AND t1.password = $psswd", {
                                bind : {
                                    usr_nm: params.username,
                                    psswd: params.password
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        console.log(data);
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        callback(false, 300, "Error : " + err, {});
    });
}



exports.update = function (params, callback) {
    postgres.user_credentials.update(params, {
        where: {
            user_id: params.user_id
        }
    }).then(function(data) {
        callback(true, 200, "Password Successfully Created", data);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}


