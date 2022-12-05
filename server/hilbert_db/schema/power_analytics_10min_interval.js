module.exports = function(sequelize, datatypes) {
    var power_analytics_10min_interval = sequelize.define('power_analytics_10min_interval', {
      measuring_date: datatypes.STRING ,
      time_interval: datatypes.STRING,
      "Blade_pitch_2": datatypes.DOUBLE,
      "Vane_position_1+2__0": datatypes.DOUBLE,
      "Vane_position_1+2__2": datatypes.DOUBLE,
      "Vane_position_1+2__3": datatypes.DOUBLE,
      "Wind_speed_2": datatypes.DOUBLE,
      "Wind_speed_3": datatypes.DOUBLE,
      "Abs_wind_direct_3": datatypes.DOUBLE,
      "Active_power_2": datatypes.DOUBLE,
      esign_power: datatypes.DOUBLE,
      lost_power: datatypes.DOUBLE,
      lpf_ratio: datatypes.DOUBLE,
      fla: datatypes.INTEGER,
      turbine_id: datatypes.INTEGER
    }, {
        indexes: [

        ]
    });
    return power_analytics_10min_interval;
};
