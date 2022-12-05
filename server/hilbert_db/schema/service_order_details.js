module.exports = function(sequelize, datatypes) {
    var service_order_details = sequelize.define('service_order_details', {
        order_id: {
            type: datatypes.STRING,
            primaryKey: true
        },
        turbine_id: datatypes.BIGINT,
        description: datatypes.STRING,
        status_codes: datatypes.INTEGER,
        recommended_observations: datatypes.JSON,
        document_link: datatypes.STRING,
        approved_by: datatypes.INTEGER,
        submission_status: datatypes.BOOLEAN,
        approval_status: datatypes.BOOLEAN,
        order_status: datatypes.INTEGER

    }, {
        indexes: [

        ]
    });
    return service_order_details;
};