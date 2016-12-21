'use strict';
module.exports = function(sequelize, DataTypes) {
  var Hospital = sequelize.define('Hospital', {
    name: DataTypes.STRING,
    division: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    logoLightFileName: DataTypes.STRING,
    logoDarkFileName: DataTypes.STRING,
    beaconUuid: DataTypes.STRING,
    major: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Hospital.hasMany(models.NurseStation, { as: 'nurseStations' });
        Hospital.hasMany(models.Physician, { as: 'physicians' });
        Hospital.hasMany(models.ServiceCategory, { as: 'serviceCategories' });
        Hospital.hasMany(models.BeaconLocation, { as: 'beaconLocations' });
        Hospital.hasMany(models.Tablet, { as: 'tablets' });
      }
    }
  });
  return Hospital;
};