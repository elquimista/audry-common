'use strict';

const CloudinaryService = require('../services/cloudinary_service.js');

module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define('Service', {
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    description: DataTypes.STRING(1024),
    notificationMessage: DataTypes.STRING(1024),
    launchAppUrl: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Service.belongsTo(models.ServiceCategory, { as: 'category' });
        Service.hasMany(models.WardService, { as: 'serviceWards' });
      }
    },
    hooks: {
      beforeDestroy: function(instance) {
        CloudinaryService.destroy(instance.icon);
      }
    }
  });
  return Service;
};