'use strict';
module.exports = function(sequelize, DataTypes) {
  var Physician = sequelize.define('Physician', {
    userId: DataTypes.INTEGER,
    hospitalId: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Physician.belongsTo(models.User, { as: 'user' });
        Physician.belongsTo(models.Hospital, { as: 'hospital' });
        Physician.hasMany(models.Patient, { as: 'patients', foreignKey: 'primaryPhysicianId' });
      }
    }
  });
  return Physician;
};