'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Apps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      webPathScope: {
        type: Sequelize.STRING,
      },
      webPathDefault: {
        type: Sequelize.STRING,
      },
      launchUrl: {
        type: Sequelize.STRING,
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Apps');
  }
};