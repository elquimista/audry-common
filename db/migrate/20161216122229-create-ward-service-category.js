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
        type: Sequelize.INTEGER
      },
      level2: {
        type: Sequelize.INTEGER
      },
      level3: {
        type: Sequelize.INTEGER
      }
    })
    .then(() => queryInterface.addIndex('WardsServiceCategories', ['serviceCategoryId', 'wardId'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('WardsServiceCategories');
  }
};