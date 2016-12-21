'use strict';

module.exports = function(sequelize, DataTypes) {
  var Response = sequelize.define('Response', {
    requestId: DataTypes.INTEGER,
    responderId: DataTypes.INTEGER,
    message: DataTypes.STRING(1024),
    notes: DataTypes.STRING(1024)
  }, {
    classMethods: {
      associate: function(models) {
        Response.belongsTo(models.Request, { as: 'request' });
        Response.belongsTo(models.Nurse, { as: 'responder' });
      }
    },
    hooks: {
      afterCreate: async function(response, options) {
        const request = await response.getRequest();
        request.status = 'processed';
        request.save();
      }
    }
  });
  return Response;
};