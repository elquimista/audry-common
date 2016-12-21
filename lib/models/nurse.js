'use strict';
module.exports = function(sequelize, DataTypes) {
  var Nurse = sequelize.define('Nurse', {
    userId: DataTypes.INTEGER,
    nurseStationId: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Nurse.belongsTo(models.User, { as: 'user' });
        Nurse.belongsTo(models.NurseStation, { as: 'nurseStation' });
        Nurse.hasMany(models.Patient, { as: 'patients', foreignKey: 'primaryNurseId' });
        Nurse.hasMany(models.Request, { as: 'requestsDelegating', foreignKey: 'assignerId' });
        Nurse.hasMany(models.Response, { as: 'responsesHandled', foreignKey: 'responderId' });
      }
    },
    instanceMethods: {
      getHospital: async function() {
        return await (await this.getNurseStation()).getHospital();
      }
    }
  });
  return Nurse;
};