'use strict';

const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    currentLocation: DataTypes.STRING,
    currentLocationTrackedAt: DataTypes.DATE,
    lastKnownLocation: DataTypes.STRING,
    lastLocationTrackedAt: DataTypes.DATE,
    accessCode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasOne(models.Nurse, { as: 'nurse' });
        User.hasOne(models.Supervisor, { as: 'supervisor' });
        User.hasOne(models.Physician, { as: 'physician' });
        User.belongsToMany(models.Role, { through: 'UsersRoles', as: 'roles' });
      }
    },
    instanceMethods: {
      authenticate: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });

  const beforeSave = (user, options) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
  };

  User
    .beforeCreate(beforeSave)
    .beforeUpdate(beforeSave);

  return User;
};