'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      currentLocation: {
        type: Sequelize.STRING
      },
      currentLocationTrackedAt: {
        type: Sequelize.DATE
      },
      lastKnownLocation: {
        type: Sequelize.STRING
      },
      lastLocationTrackedAt: {
        type: Sequelize.DATE
      },
      accessCode: {
        type: Sequelize.STRING
      },
      apnDeviceToken: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(results => queryInterface.addIndex('Users', ['username'], { indicesType: 'UNIQUE' }))
    .then(results => queryInterface.addIndex('Users', ['email'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};