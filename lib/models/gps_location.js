'use strict';
module.exports = function(sequelize, DataTypes) {
  var GpsLocation = sequelize.define('GpsLocation', {
    lat1: DataTypes.FLOAT,
    lng1: DataTypes.FLOAT,
    lat2: DataTypes.FLOAT,
    lng2: DataTypes.FLOAT,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return GpsLocation;
};