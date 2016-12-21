'use strict';

const {
  Bed, Hospital, Nurse, NurseStation, Patient, Request, PatientTablet, Physician, Response, Room,
  Service, ServiceCategory, Tablet, User, Ward, WardService
} = require('../lib/models');

const bulkCreateOptions = {
  individualHooks: true
};

(async () => {
  try {
    // Hospital data
    let hospital = await Hospital.create({
      name: 'NewYork-Presbyterian/Weill Cornell Medical Center',
      division: '',
      address1: '525 E 68th St',
      city: 'New York City',
      state: 'NY',
      zipcode: '10065',
      logoLightFileName: '',
      logoDarkFileName: '',
      beaconUuid: 'NYPH-B1',
      major: 1
    });

    // NurseStation data
    let nurseStations = await NurseStation.bulkCreate([{
      hospitalId: hospital.id
    }], bulkCreateOptions);

    // Ward data
    let wards = await Ward.bulkCreate([{
      name: 'Maternity',
      description: '',
      floor: '1st Floor',
      nurseStationId: nurseStations[0].id,
      beaconMajor: 0
    }], bulkCreateOptions);

    // Room data
    let rooms = await Room.bulkCreate([{
      wardId: wards[0].id,
      name: '22'
    }], bulkCreateOptions);

    // Bed data
    let beds = await Bed.bulkCreate([{
      roomId: rooms[0].id,
      name: 'A',
      beaconMinor: 15,
      buttonId: '',
      taskLightId: '',
      mainLightId: '',
      remoteId: ''
    }, {
      roomId: rooms[0].id,
      name: 'B',
      beaconMinor: 17,
      buttonId: '',
      taskLightId: '',
      mainLightId: '',
      remoteId: ''
    }], bulkCreateOptions);

    // ServiceCategory data
    let serviceCategories = await ServiceCategory.bulkCreate([{
      name: 'Medical',
      hospitalId: hospital.id
    }, {
      name: 'Infotainment',
      hospitalId: hospital.id
    }], bulkCreateOptions);

    // Service data
    let services = await Service.bulkCreate([{
      categoryId: serviceCategories[0].id,
      name: 'Need Medicine',
      icon: '',
      description: '',
      notificationMessage: '',
      launchAppUrl: ''
    }, {
      categoryId: serviceCategories[0].id,
      name: 'Feeling Pain',
      icon: '',
      description: '',
      notificationMessage: '',
      launchAppUrl: ''
    }, {
      categoryId: serviceCategories[1].id,
      name: 'Hospital Map',
      icon: '',
      description: '',
      notificationMessage: '',
      launchAppUrl: ''
    }, {
      categoryId: serviceCategories[1].id,
      name: 'Internet',
      icon: '',
      description: '',
      notificationMessage: '',
      launchAppUrl: ''
    }], bulkCreateOptions);

    // User data
    let users = await User.bulkCreate([{
      username: 'admin',
      email: 'admin@audry.com',
      password: ' ',
    }, {
      username: 'lindseylohan',
      email: 'lindseylohan@gmail.com',
      password: '123',
      firstName: 'Lindsey',
      lastName: 'Lohan',
      accessCode: 'abc',
    }, {
      username: 'drwatson',
      email: 'drwatson@gmail.com',
      password: ' ',
      firstName: 'John',
      lastName: 'Watson',
    }, {
      username: 'kristen',
      email: 'kristen@gmail.com',
      password: ' ',
      firstName: 'Kristen',
      lastName: 'Stewart',
      accessCode: 'xyz'
    }], bulkCreateOptions);

    // Nurse data
    let nurses = await Nurse.bulkCreate([{
      userId: users[1].id,
      nurseStationId: nurseStations[0].id
    }, {
      userId: users[3].id,
      nurseStationId: nurseStations[0].id
    }], bulkCreateOptions);

    // Physician data
    let physicians = await Physician.bulkCreate([{
      userId: users[2].id,
      hospitalId: hospital.id
    }], bulkCreateOptions);

    // Patient data
    let patients = await Patient.bulkCreate([{
      firstName: 'Christopher',
      lastName: 'Lee',
      phoneNumber: '',
      bedId: beds[0].id,
      language: 'English',
      primaryNurseId: nurses[0].id,
      primaryPhysicianId: physicians[0].id,
      interfaceWardId: wards[0].id
    }, {
      firstName: 'Timothy',
      lastName: 'Mensah',
      phoneNumber: '',
      bedId: beds[1].id,
      language: 'French',
      primaryNurseId: nurses[0].id,
      primaryPhysicianId: physicians[0].id,
      interfaceWardId: wards[0].id
    }], bulkCreateOptions);

    // WardService data
    let wardServices = await WardService.bulkCreate([{
      wardId: wards[0].id,
      serviceId: services[0].id,
      level1: 5,
      level2: 10,
      level3: 15,
      visible: true
    }, {
      wardId: wards[0].id,
      serviceId: services[1].id,
      level1: 5,
      level2: 10,
      level3: 15,
      visible: true
    }], bulkCreateOptions);

    // Request data
    let requests = await Request.bulkCreate([{
      patientId: patients[0].id,
      wardServiceId: wardServices[0].id
    }, {
      patientId: patients[0].id,
      wardServiceId: wardServices[1].id
    }], bulkCreateOptions);

    // Response data
    Response.bulkCreate([{
      requestId: requests[0].id,
      responderId: nurses[0].id,
      message: '',
      notes: ''
    }], bulkCreateOptions);

    // Tablet data
    let tablets = await Tablet.bulkCreate([{
      hospitalId: hospital.id,
      udid: 'abcdefgh12345',
      lastKnownLocation: 'Room 401, Pediatric Ward',
      lastKnownBatteryLevel: 37
    }], bulkCreateOptions);

    // PatientTablet data
    PatientTablet.bulkCreate([{
      patientId: patients[0].id,
      tabletId: tablets[0].id
    }], bulkCreateOptions);
  }
  catch (err) {
    console.log(`ERROR: ${err.stack}`);
  }
})();
