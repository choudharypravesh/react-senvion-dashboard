module.exports = function(sequelize, datatypes) {
    var turbine_master_datas = sequelize.define('turbine_master_datas', {
        wind_farm:	datatypes.STRING,
        country_id:	datatypes.STRING,
        city:	datatypes.STRING,
        number_in_wind_farm:	datatypes.STRING,
        serial_number:	{
            type: datatypes.STRING,
            primaryKey: true
        },
        "Unit_Id":	datatypes.STRING,
        coordinate_height:	datatypes.STRING,
        coordinate_longitude:	datatypes.STRING,
        coordinate_latitude:	datatypes.STRING,
        "Baureihe":	datatypes.STRING,
        type:	datatypes.STRING,
        rotor_diameter:	datatypes.STRING,
        hub_height:	datatypes.STRING,
        commisioning_date:	datatypes.STRING     
    }, {
        indexes: [

        ],
        timestamps: false
    });
    return turbine_master_datas;
};
