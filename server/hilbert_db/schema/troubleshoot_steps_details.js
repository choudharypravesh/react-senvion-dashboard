module.exports = function(sequelize, datatypes) {
    var troubleshoot_steps_details = sequelize.define('troubleshoot_steps_details', {
        user_id: {
            type: datatypes.INTEGER,
            primaryKey: true
        },
        order_id: datatypes.STRING,
        start_time: datatypes.STRING,
        end_time: datatypes.STRING,
        step_number: datatypes.INTEGER,
        status_code: datatypes.STRING
    }, {
        indexes: [

        ],
        timestamps: false
    });
    return troubleshoot_steps_details;
};