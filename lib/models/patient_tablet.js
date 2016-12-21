'use strict';
module.exports = function(sequelize, DataTypes) {
  var PatientTablet = sequelize.define('PatientTablet', {
    patientId: DataTypes.INTEGER,
    tabletId: DataTypes.INTEGER,
    assignerId: DataTypes.INTEGER
  }, {
    tableName: 'PatientsTablets',
    classMethods: {
      associate: function(models) {
        PatientTablet.belongsTo(models.Patient, { as: 'patient' });
        PatientTablet.belongsTo(models.Tablet, { as: 'tablet' });
        PatientTablet.belongsTo(models.User, { as: 'assigner' });
      }
    }
  });
  return PatientTablet;
};