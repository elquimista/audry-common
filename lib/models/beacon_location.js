'use strict';
module.exports = function(sequelize, DataTypes) {
  var BeaconLocation = sequelize.define('BeaconLocation', {
    hospitalId: DataTypes.INTEGER,
    beaconMajor: DataTypes.INTEGER,
    beaconMinor: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        BeaconLocation.belongsTo(models.Hospital, { as: 'hospital' });
      }
    }
  });
  return BeaconLocation;
};