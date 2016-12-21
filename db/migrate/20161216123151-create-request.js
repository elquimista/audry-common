'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Patients'
        },
        onDelete: 'cascade'
      },
      wardServiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'WardsServices'
        },
        onDelete: 'cascade'
      },
      assignerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Nurses'
        }
      },
      assigneeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Nurses'
        }
      },
      assignedAt: {
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(256),
        defaultValue: 'level1'
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
    .then(() => queryInterface.addIndex('Requests', ['patientId', 'wardServiceId'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Requests');
  }
};