module.exports = function(sequelize, datatypes) {
  var alert_comments = sequelize.define('alert_comments', {
    alert_id: {
      type: datatypes.INTEGER,
      primaryKey: true
    },
    alert_name: datatypes.STRING,
    user_id: datatypes.STRING,
    comment_string: datatypes.STRING,
    createdAt: datatypes.DATE
  }, {
      indexes: [

      ]
  });
    return alert_comments;
}