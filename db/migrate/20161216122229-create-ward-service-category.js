'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('WardsServiceCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serviceCategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ServiceCategories'
        },
        onDelete: 'cascade'
      },
      wardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Wards'
        }
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
      }
    })
    .then(() => queryInterface.addIndex('WardsServiceCategories', ['serviceCategoryId', 'wardId'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('WardsServiceCategories');
  }
};