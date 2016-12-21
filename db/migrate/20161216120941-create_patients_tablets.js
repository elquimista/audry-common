'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('PatientsTablets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients'
        },
        onDelete: 'cascade'
      },
      tabletId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tablets'
        },
        onDelete: 'cascade'
      },
      assignerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        }
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
    .then(() => queryInterface.addIndex('PatientsTablets', ['patientId', 'tabletId'], { indicesType: 'UNIQUE' }));
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('PatientsTablets');
  }
};
