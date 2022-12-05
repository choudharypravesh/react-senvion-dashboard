module.exports = function(sequelize, datatypes) {
    var power_analytics_daily = sequelize.define('power_analytics_daily', {
      "measuring_date": datatypes.STRING,
      "turbine_id": datatypes.INTEGER,
      "turbine_id_mean": datatypes.INTEGER,
      "Blade_pitch_2_mean": datatypes.DOUBLE,
      "Vane_position_1+2__0_mean": datatypes.DOUBLE,
      "Vane_position_1+2__2_mean": datatypes.DOUBLE,
      "Vane_position_1+2__3_mean": datatypes.DOUBLE,
      "Wind_speed_2_mean": datatypes.DOUBLE,
      "Wind_speed_3_mean": datatypes.DOUBLE,
      "Abs._wind_direct._3_mean": datatypes.DOUBLE,
      "Active_power_2_mean": datatypes.DOUBLE,
      "design_power_mean": datatypes.DOUBLE,
      "lost_power_mean": datatypes.DOUBLE,
      "lpf_ratio_mean": datatypes.DOUBLE,
      "flag_mean": datatypes.DOUBLE,
      "flag_0": datatypes.DOUBLE,
      "flag_1": datatypes.DOUBLE,
      "lost_power_sum": datatypes.DOUBLE
    }, {
        indexes: [

        ]
    });
    return power_analytics_daily;
};
