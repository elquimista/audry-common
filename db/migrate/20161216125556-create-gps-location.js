'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('GpsLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lat1: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      lng1: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      lat2: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      lng2: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
    .then(() => queryInterface.addIndex('GpsLocations', ['lat1', 'lng1', 'lat2', 'lng2'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('GpsLocations');
  }
};