module.exports = function(sequelize, datatypes) {
    var troubleshoot_session_details = sequelize.define('troubleshoot_session_details', {
        user_id: {
            type: datatypes.INTEGER,
            primaryKey: true
        },
        troubleshoot_session_id: {
            type: datatypes.STRING,
            primaryKey: true
        },
        order_id: datatypes.STRING,
        start_time: datatypes.STRING,
        end_time: datatypes.STRING
    }, {
        indexes: [

        ],
        timestamps: false
    });
    return troubleshoot_session_details;
};