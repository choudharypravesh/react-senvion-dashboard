module.exports = function(sequelize, datatypes) {
    var farm_distance = sequelize.define('farm_distance', {
        wind_farm_1: datatypes.INTEGER,
        wind_farm_2: datatypes.INTEGER,
        distance: datatypes.DOUBLE
    }, {
        indexes: [

        ]
    });
    return farm_distance;
}