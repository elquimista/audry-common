'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ward = sequelize.define('Ward', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(1024),
    floor: DataTypes.STRING,
    nurseStationId: DataTypes.INTEGER,
    beaconMajor: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Ward.belongsTo(models.NurseStation, { as: 'nurseStation' });
        Ward.hasMany(models.Supervisor, { as: 'supervisors' });
        Ward.hasMany(models.Room, { as: 'rooms' });
        Ward.hasMany(models.WardServiceCategory, { as: 'wardServiceCategories' });
        Ward.hasMany(models.WardService, { as: 'wardServices' });
      }
    }
  });
  return Ward;
};