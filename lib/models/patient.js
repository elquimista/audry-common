'use strict';
module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    bedId: DataTypes.INTEGER,
    language: DataTypes.STRING,
    primaryNurseId: DataTypes.INTEGER,
    primaryPhysicianId: DataTypes.INTEGER,
    interfaceWardId: DataTypes.INTEGER,
    currentLocation: DataTypes.STRING,
    currentLocationTrackedAt: DataTypes.DATE,
    lastKnownLocation: DataTypes.STRING,
    lastLocationTrackedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Patient.belongsTo(models.Bed, { as: 'bed' });
        Patient.belongsTo(models.Nurse, { as: 'primaryNurse' });
        Patient.belongsTo(models.Physician, { as: 'primaryPhysician' });
        Patient.belongsTo(models.Ward, { as: 'interfaceWard' });
        Patient.hasOne(models.PatientTablet, { as: 'patientTablet' });
        Patient.hasMany(models.Request, { as: 'requests' });
      },

      findAllWithCustomOptions: async options => {
        const { Request, WardService, Nurse, PatientTablet, Bed, Room, Ward } = sequelize.models;
        const { patientsScope, requestStatus, sortBy, user } = options;
        const requestWhereOptions = requestStatus === 'any' ? {} : { where: { status: requestStatus } };
        const optionsIncludeRequest = Object.assign({}, requestWhereOptions, {
          model: Request, as: 'requests',
          include: [{
            model: WardService, as: 'wardService',
            include: [WardService.associations.service]
          }]
        });
        const patientsIncludeOptions = [{
            model: Nurse, as: 'primaryNurse',
            include: [Nurse.associations.user]
          }, {
            model: PatientTablet, as: 'patientTablet',
            include: [PatientTablet.associations.tablet]
          },
          optionsIncludeRequest
        ];
        const patientsFindOptions = {
          all: {
            include: [{
              model: Bed, as: 'bed',
              include: [{
                model: Room, as: 'room',
                include: [{
                  model: Ward, as: 'ward',
                  where: { nurseStationId: user.nurse.nurseStationId }
                }]
              }]
            }, ...patientsIncludeOptions]
          },
          mine: {
            where: { primaryNurseId: user.nurse.id },
            include: [{
              model: Bed, as: 'bed',
              include: [Bed.associations.room]
            }, ...patientsIncludeOptions]
          }
        };
        let patients = [];

        if (Object.keys(patientsFindOptions).includes(patientsScope)) {
          patients = await Patient.findAll(patientsFindOptions[patientsScope]);
        }
        return patients;
      },

      findAllUnassigned: async hospitalId => {
        const { PatientTablet, Bed, Room, Ward, NurseStation } = sequelize.models;

        return await Patient.findAll({
          include: [{
            model: PatientTablet, as: 'patientTablet'
          }, {
            model: Bed, as: 'bed',
            include: [{
              model: Room, as: 'room',
              include: [{
                model: Ward, as: 'ward',
                include: [{
                  model: NurseStation, as: 'nurseStation',
                  where: { hospitalId: hospitalId }
                }]
              }]
            }]
          }],
          where: { $and: [sequelize.literal('patientTablet.id IS NULL')] }
        });
      }
    }
  });
  
  return Patient;
};