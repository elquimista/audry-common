'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Hospitals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      division: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address2: {
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zipcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logoLightFileName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logoDarkFileName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      beaconUuid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      major: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
    .then(results => queryInterface.addIndex('Hospitals', ['name', 'division', 'address1'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Hospitals');
  }
};