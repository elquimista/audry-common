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

queryInterface.addIndex('Patients', ['bedId'], {
  indicesType: 'UNIQUE',
  where: {
    bedId: { $ne: null }
  }
});

queryInterface.addIndex('Apps', ['webPathScope'], {
  indicesType: 'UNIQUE',
  where: {
    webPathScope: { $ne: null }
  }
});

queryInterface.addIndex('Apps', ['launchUrl'], {
  indicesType: 'UNIQUE',
  where: {
    launchUrl: { $ne: null }
  }
});
