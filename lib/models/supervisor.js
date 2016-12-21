'use strict';
module.exports = function(sequelize, DataTypes) {
  var Supervisor = sequelize.define('Supervisor', {
    userId: DataTypes.INTEGER,
    wardId: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Supervisor.belongsTo(models.User, { as: 'user' });
        Supervisor.belongsTo(models.Ward, { as: 'ward' });
      }
    },
    instanceMethods: {
      getHospital: async function() {
        return await (await (await this.getWard()).getNurseStation()).getHospital();
      }
    }
  });
  return Supervisor;
};