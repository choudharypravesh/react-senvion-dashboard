module.exports = function(sequelize, datatypes) {
    var availability_eu_north = sequelize.define('mita_availability_daily_eu_north', {
        availability_date: datatypes.STRING,
        availability_value_sum: datatypes.STRING,
        wind_turbine_serial_id_fk: datatypes.STRING,
        type: datatypes.STRING,
        country_id: datatypes.STRING
    }, {
        indexes: [

        ]
    });
    return availability_eu_north;
}