'use strict';

const models = require('../lib/models');
const sequelize = models.sequelize;
const queryInterface = sequelize.getQueryInterface();

sequelize.dialect.supports.index.where = true;

queryInterface.addIndex('Users', ['accessCode'], {
  indicesType: 'UNIQUE',
  where: {
    accessCode: { $ne: null }
  }
});
