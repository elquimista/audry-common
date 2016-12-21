'use strict';

module.exports = function(sequelize, DataTypes) {
  var NurseStation = sequelize.define('NurseStation', {
    hospitalId: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        NurseStation.belongsTo(models.Hospital, { as: 'hospital' });
        NurseStation.hasOne(models.Ward, { as: 'ward' });
        NurseStation.hasMany(models.Nurse, { as: 'nurses' });
      }
    }
  });

  return NurseStation;
};