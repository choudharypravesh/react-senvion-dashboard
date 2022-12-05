var postgres  = require('../hilbert_db/schema');
var sequelize = require('sequelize');

exports.get = function(params, callback) {
    console.log("params"+JSON.stringify(params));
    postgres.sequelize.query("SELECT t2.username, t1.employee_name, t1.first_name, t1.last_name, t1.email_id, t1.country, t1.language, t1.office_location, t1.picture_link \
                            FROM user_details t1 \
                            INNER JOIN user_credentials t2 \
                            ON t1.user_id = t2.user_id \
                            WHERE t1.user_id= $user_id", {
                                bind: {
                                   user_id: params.user_id      
                                },
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        console.log(data);
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        callback(false, 300, "Error : " + err, {});
    });
}



exports.updateDetails = function(params, callback) {
    console.log("params"+JSON.stringify(params));
     postgres.user_details.update(params, {
        where: {
            user_id: params.user_id
        }
    }).then(function(data) {
        callback(true, 200, "Success", data);
    }).catch(function(err) {
        console.log(err)
        console.log("some error");
        callback(false, 300, "Error : " + err, {});
    });
}