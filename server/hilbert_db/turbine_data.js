module.exports = function(sequelize, datatypes) {
    var turbine_data = sequelize.define('turbine_data', {
      wind_turbine:	datatypes.STRING,
      turbine_id: {
          type: datatypes.STRING,
          primaryKey: true
      },
      unit_id: datatypes.STRING,
      elevation_old: datatypes.STRING,
      longitude: datatypes.STRING,
      latitude: datatypes.STRING,
      series: datatypes.STRING,
      type: datatypes.STRING,
      rotor_diameter:	datatypes.STRING,
      hub_height:	datatypes.STRING,
      commissioning_date:	datatypes.STRING,
      elevation: datatypes.STRING
    }, {
        indexes: [

        ]
    });
    return turbine_data;
};
