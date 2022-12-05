module.exports = function(sequelize, datatypes) {
    var variables = sequelize.define('variables', {
        id: {
            type: datatypes.INTEGER,
            primaryKey: true
        },
        name: datatypes.STRING
    }, {
        indexes: [

        ]
    });
    return variables;
}