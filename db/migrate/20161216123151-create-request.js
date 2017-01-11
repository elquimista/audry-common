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
      statusUpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Requests');
  }
};