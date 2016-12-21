'use strict';

module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define('Request', {
    patientId: DataTypes.INTEGER,
    wardServiceId: DataTypes.INTEGER,
    assignerId: DataTypes.INTEGER,
    assigneeId: DataTypes.INTEGER,
    assignedAt: DataTypes.DATE,
    status: DataTypes.STRING(256)
  }, {
    classMethods: {
      associate: function(models) {
        Request.belongsTo(models.Patient, { as: 'patient' });
        Request.belongsTo(models.WardService, { as: 'wardService' });
        Request.belongsTo(models.Nurse, { as: 'assigner' });
        Request.belongsTo(models.Nurse, { as: 'assignee' });
        Request.hasOne(models.Response, { as: 'response' });
      }
    }
  });
  return Request;
};