'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      bedId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Beds'
        },
        onDelete: 'set null'
      },
      language: {
        type: Sequelize.STRING
      },
      primaryNurseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Nurses'
        }
      },
      primaryPhysicianId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Physicians'
        }
      },
      interfaceWardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Wards'
        }
      },
      currentLocation: {
        type: Sequelize.STRING
      },
      currentLocationTrackedAt: {
        type: Sequelize.DATE
      },
      lastKnownLocation: {
        type: Sequelize.STRING
      },
      lastLocationTrackedAt: {
        type: Sequelize.DATE
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
    .then(() => queryInterface.addIndex('Patients', ['bedId'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Patients');
  }
};