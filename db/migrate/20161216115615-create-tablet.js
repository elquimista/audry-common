'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tablets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hospitalId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Hospitals'
        },
        onDelete: 'set null'
      },
      udid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastKnownLocation: {
        type: Sequelize.STRING
      },
      lastKnownBatteryLevel: {
        type: Sequelize.INTEGER
      },
      apnDeviceToken: {
        type: Sequelize.STRING
      }
    })
    .then(() => queryInterface.addIndex('Tablets', ['udid'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Tablets');
  }
};