module.exports = function(sequelize, datatypes) {
    var order_schedule = sequelize.define('order_schedule', {
        order_id: {
            type: datatypes.STRING,
            primaryKey: true
        },
        assigned_to: datatypes.STRING,
        start_date: datatypes.STRING,
        start_time: datatypes.STRING,
        end_date: datatypes.STRING,
        end_time: datatypes.STRING
    }, {
        indexes: [

        ]
    });
    return order_schedule;
};