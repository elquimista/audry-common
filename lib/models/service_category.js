'use strict';
module.exports = function(sequelize, DataTypes) {
  var ServiceCategory = sequelize.define('ServiceCategory', {
    name: DataTypes.STRING,
    hospitalId: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        ServiceCategory.belongsTo(models.Hospital, { as: 'hospital' });
        ServiceCategory.hasMany(models.Service, { as: 'services', foreignKey: 'categoryId' });
        ServiceCategory.hasMany(models.WardServiceCategory, { as: 'serviceCategoryWards' });
      }
    }
  });
  return ServiceCategory;
};