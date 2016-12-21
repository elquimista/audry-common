'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    body: DataTypes.STRING(2048),
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    notes: DataTypes.STRING(1024)
  }, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.User, { as: 'sender' });
        Message.belongsTo(models.User, { as: 'recipient' });
      }
    }
  });
  return Message;
};