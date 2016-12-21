'use strict';
module.exports = function(sequelize, DataTypes) {
  var WardServiceCategory = sequelize.define('WardServiceCategory', {
    serviceCategoryId: DataTypes.INTEGER,
    wardId: DataTypes.INTEGER,
    level1: DataTypes.INTEGER,
    level2: DataTypes.INTEGER,
    level3: DataTypes.INTEGER
  }, {
    tableName: 'WardsServiceCategories',
    timestamps: false,
    classMethods: {
      associate: function(models) {
        WardServiceCategory.belongsTo(models.ServiceCategory, { as: 'serviceCategory' });
        WardServiceCategory.belongsTo(models.Ward, { as: 'ward' });
      }
    }
  });
  return WardServiceCategory;
};