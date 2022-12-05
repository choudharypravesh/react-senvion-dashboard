module.exports = function(sequelize, datatypes) {
    var user_credentials = sequelize.define('user_credentials', {
        user_id: {
            type: datatypes.INTEGER,
            primaryKey: true
        },
        username: datatypes.STRING,
        password: datatypes.STRING
    }, {
        indexes: [

        ]
    });
    return user_credentials;
};
