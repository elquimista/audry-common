'use strict';
module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    wardId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Room.belongsTo(models.Ward, { as: 'ward' });
        Room.hasMany(models.Bed, { as: 'beds' });
      }
    }
  });
  return Room;
};