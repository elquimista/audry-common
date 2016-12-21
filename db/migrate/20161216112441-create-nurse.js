'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Nurses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        },
        onDelete: 'cascade'
      },
      nurseStationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'NurseStations'
        },
        onDelete: 'cascade'
      }
    })
    .then(() => queryInterface.addIndex('Nurses', ['userId'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Nurses');
  }
};