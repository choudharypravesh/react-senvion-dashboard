module.exports = function(sequelize, datatypes) {
    var status_code_temp = sequelize.define('status_code_temp', {
        cause: datatypes.STRING,
        status_code: datatypes.STRING,
        observation: datatypes.STRING,
        system: datatypes.STRING,
        sub_system: datatypes.STRING,
        solution: datatypes.JSON,
        created_by: datatypes.INTEGER,
        created_at: datatypes.STRING,
        approved: datatypes.BOOLEAN,
        approved_by: datatypes.INTEGER,
        approved_at: datatypes.STRING
    }, {
        indexes: [

        ],
        timestamps: false
    });
    return status_code_temp;
};