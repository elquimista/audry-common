'use strict';

const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    currentLocation: DataTypes.STRING,
    currentLocationTrackedAt: DataTypes.DATE,
    lastKnownLocation: DataTypes.STRING,
    lastLocationTrackedAt: DataTypes.DATE,
    accessCode: DataTypes.STRING,
    apnDeviceToken: DataTypes.STRING,

    password: {
      type: DataTypes.VIRTUAL,
      set: function(value) {
        this.setDataValue('password', value);
        this.setDataValue('passwordHash', bcrypt.hashSync(value, bcrypt.genSaltSync()));
      },
      validate: {
        len: [1, Infinity]
      }
    },

    fullName: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return this.firstName + ' ' + this.lastName;
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasOne(models.Nurse, { as: 'nurse' });
        User.hasOne(models.Supervisor, { as: 'supervisor' });
        User.hasOne(models.Physician, { as: 'physician' });
        User.hasMany(models.PatientTablet, { as: 'patientTablets', foreignKey: 'assignerId' });
        User.belongsToMany(models.Role, { through: 'UsersRoles', as: 'roles' });
      }
    },
    instanceMethods: {
      authenticate: function(password) {
        return bcrypt.compareSync(password, this.passwordHash);
      }
    }
  });

  return User;
};