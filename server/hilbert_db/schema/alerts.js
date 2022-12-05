module.exports = function(sequelize, datatypes) {
  var alerts = sequelize.define('alerts', {
    id: {
      type: datatypes.INTEGER,
      primaryKey: true
    },
    alerts: datatypes.STRING,
    priority: datatypes.STRING,
    farm_name: datatypes.STRING,
    turbine_id: datatypes.INTEGER,
    model: datatypes.STRING,
    date_identified: datatypes.STRING,
    date_resolved: datatypes.STRING,
    category: datatypes.STRING,
    source: datatypes.STRING,
    status: datatypes.STRING,
    resolved_by: datatypes.STRING,
    resolved_at: datatypes.STRING
  }, {
      indexes: [

      ],
      timestamps: false
  });
    return alerts;
}
