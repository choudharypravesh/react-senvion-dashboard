module.exports = function(sequelize, datatypes) {
    var user_session_details = sequelize.define('user_session_details', {
        session_id: {
            type: datatypes.STRING,
            primaryKey: true
        },
        user_id: {
            type: datatypes.INTEGER,
            primaryKey: true
        },
        session_start_time: {
            type: datatypes.STRING,
            allowNull: false
        },
        session_end_time: datatypes.STRING,
        is_active: {
            type: datatypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        indexes: [

        ],
        timestamps: false
    });
    return user_session_details;
};