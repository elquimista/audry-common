'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bed = sequelize.define('Bed', {
    roomId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    beaconMinor: DataTypes.INTEGER,
    buttonId: DataTypes.STRING,
    taskLightId: DataTypes.STRING,
    mainLightId: DataTypes.STRING,
    remoteId: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Bed.belongsTo(models.Room, { as: 'room' });
        Bed.hasOne(models.Patient, { as: 'patient' });
      }
    }
  });
  return Bed;
};