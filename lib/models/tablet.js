'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tablet = sequelize.define('Tablet', {
    hospitalId: DataTypes.INTEGER,
    udid: DataTypes.STRING,
    lastKnownLocation: DataTypes.STRING,
    lastKnownBatteryLevel: DataTypes.INTEGER,
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Tablet.belongsTo(models.Hospital, { as: 'hospital' });
        Tablet.hasOne(models.PatientTablet, { as: 'patientTablet' });
      }
    }
  });
  return Tablet;
};