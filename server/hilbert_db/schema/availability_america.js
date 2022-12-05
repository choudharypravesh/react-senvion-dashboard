module.exports = function(sequelize, datatypes) {
    var availability_america = sequelize.define('mita_availability_daily_america', {
        availability_date: datatypes.STRING,
        availability_value_sum: datatypes.STRING,
        wind_turbine_serial_id_fk: datatypes.STRING,
        type: datatypes.STRING,
        country_id: datatypes.STRING
    }, {
        indexes: [

        ]
    });
    return availability_america;
}