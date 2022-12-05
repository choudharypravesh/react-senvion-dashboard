module.exports = function(sequelize, datatypes) {
    var user_details = sequelize.define('user_details', {
        user_id: {
            type: datatypes.INTEGER,
            primaryKey: true
        },
        email_id: {
            type: datatypes.STRING,
            unique: true
        },
        first_name: datatypes.STRING,
        last_name: datatypes.STRING,
        phone: {
            type: datatypes.STRING,
            unique: true
        },
        employee_id: datatypes.STRING,
        company_name: datatypes.STRING,
        employee_name: datatypes.STRING,
        user_type: datatypes.INTEGER,
        supervisor_id: datatypes.INTEGER,
        language: datatypes.STRING,
        country: datatypes.STRING,
        picture_link: datatypes.STRING,
        createdAt: datatypes.STRING,
        updatedAt: datatypes.DATE
    }, {
        indexes: [

        ]
    });
    return user_details;
};