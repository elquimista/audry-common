'use strict';
module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define('App', {
    title: DataTypes.STRING,
    icon: DataTypes.STRING,
    launchUrl: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        App.belongsToMany(models.Role, { through: 'RolesApps', as: 'roles' });
      }
    }
  });
  return App;
};