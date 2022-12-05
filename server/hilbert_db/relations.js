import db from './schema/index';
var postgres = require('../hilbert_db/schema');

postgres.service_order_details.hasMany(postgres.order_schedule,  {foreignKey: 'order_id'});
postgres.order_schedule.belongsTo(postgres.service_order_details, {foreignKey: 'order_id'});
