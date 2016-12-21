'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Rooms', {
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
        },
        onDelete: 'cascade'
      },
      name: {
        type: Sequelize.STRING
      }
    })
    .then(() => queryInterface.addIndex('Rooms', ['wardId', 'name'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Rooms');
  }
};