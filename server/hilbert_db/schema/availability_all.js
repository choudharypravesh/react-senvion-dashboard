module.exports = function(sequelize, datatypes) {
    var mita_availability_daily_all = sequelize.define('mita_availability_daily_all', {
        availability_date: datatypes.STRING,
        availability_value_sum: datatypes.STRING,
        wind_turbine_serial_id_fk: datatypes.STRING,
        type: datatypes.STRING,
        country_id: datatypes.STRING
    }, {
        indexes: [

        ]
    });
    return mita_availability_daily_all;
}