'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Wards', {
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
      description: {
        type: Sequelize.STRING(1024)
      },
      floor: {
        type: Sequelize.STRING
      },
      nurseStationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'NurseStations'
        },
        onDelete: 'cascade'
      },
      beaconMajor: {
        type: Sequelize.INTEGER
      }
    })
    .then(() => queryInterface.addIndex('Wards', ['nurseStationId', 'name'], { indicesType: 'UNIQUE', indexName: 'nurseStationIdNameIndex' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Wards');
  }
};