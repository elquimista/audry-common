'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Supervisors', {
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
      wardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Wards'
        },
        onDelete: 'cascade'
      }
    })
    .then(() => queryInterface.addIndex('Supervisors', ['userId'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Supervisors');
  }
};