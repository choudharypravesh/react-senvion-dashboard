var sequelize = require('sequelize');

module.exports = function(sequelize, datatypes) {
    var solutionRecommendation = sequelize.define('solutionRecommendation', {
    	order_id: {
    			type: datatypes.STRING,
    		    primaryKey: true
    		  }, 
        observations: datatypes.STRING,
        cause: datatypes.JSON,
        percentage: datatypes.INTEGER
    }, {
        indexes: [

        ],
        timestamps: false,
        freezeTableName: true,
        tableName: 'solutionRecommendation'
    });
    return solutionRecommendation;
};