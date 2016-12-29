'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('RolesApps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles'
        },
        onDelete: 'cascade'
      },
      appId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Apps'
        },
        onDelete: 'cascade'
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
    .then(() => queryInterface.addIndex('RolesApps', ['roleId', 'appId'], { indicesType: 'UNIQUE' }));
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('RolesApps');
  }
};
