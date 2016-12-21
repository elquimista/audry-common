'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Role.belongsToMany(models.User, { through: 'UsersRoles', as: 'users' });
        Role.belongsToMany(models.App, { through: 'RolesApps', as: 'apps' });
      }
    }
  });
  return Role;
};