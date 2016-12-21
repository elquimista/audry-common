'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Beds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms'
        },
        onDelete: 'cascade'
      },
      name: {
        type: Sequelize.STRING
      },
      beaconMinor: {
        type: Sequelize.INTEGER
      },
      buttonId: {
        type: Sequelize.STRING
      },
      taskLightId: {
        type: Sequelize.STRING
      },
      mainLightId: {
        type: Sequelize.STRING
      },
      remoteId: {
        type: Sequelize.STRING
      }
    })
    .then(() => queryInterface.addIndex('Beds', ['roomId', 'name'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Beds');
  }
};