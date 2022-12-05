module.exports = function(sequelize, datatypes) {
    var powerforecast = sequelize.define('powerforecast', {
      first_measuring_timestamp: datatypes.STRING ,
      measuring_date: datatypes.STRING ,
      active_power_residual: datatypes.DOUBLE,
      active_power_actual: datatypes.DOUBLE,
      wind_speed: datatypes.DOUBLE,
      abs_wind_direction: datatypes.DOUBLE,
      active_power_predicted: datatypes.DOUBLE,
      turbine_id: datatypes.INTEGER,
      winspeed_predicted: datatypes.DOUBLE,
      downtime: datatypes.INTEGER,
      time_interval: datatypes.STRING
    }, {
        indexes: [

        ]
    });
    return powerforecast;
};
