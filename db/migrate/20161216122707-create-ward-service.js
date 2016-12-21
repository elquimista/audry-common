'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('WardsServices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Wards'
        }
      },
      serviceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Services'
        },
        onDelete: 'cascade'
      },
      level1: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      level2: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      level3: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      visible: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    })
    .then(() => queryInterface.addIndex('WardsServices', ['wardId', 'serviceId'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('WardsServices');
  }
};