module.exports = function(sequelize, datatypes) {
    var wind_turbine_alerts_vs_components = sequelize.define('wind_turbine_alerts_vs_components', {
        alert_name: datatypes.STRING,
        component_name: datatypes.STRING,
        type_of_chart: datatypes.INTEGER,
        variable_name: datatypes.STRING,
        variable_id: datatypes.INTEGER
    }, {
        indexes: [

        ]
    });
    return wind_turbine_alerts_vs_components;
}