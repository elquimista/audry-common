'use strict';
module.exports = function(sequelize, DataTypes) {
  var Language = sequelize.define('Language', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Language.hasMany(models.Patient, { as: 'patients' });
      }
    }
  });
  return Language;
};