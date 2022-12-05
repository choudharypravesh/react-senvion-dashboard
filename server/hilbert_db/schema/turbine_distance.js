module.exports = function(sequelize, datatypes) {
    var turbine_distance = sequelize.define('turbine_distance', {
         turbine_id_1: datatypes.INTEGER,
        turbine_id_2: datatypes.INTEGER,
        distance: datatypes.DOUBLE
    }, {
        indexes: [

        ]
    });
    return turbine_distance;
}