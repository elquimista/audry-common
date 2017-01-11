'use strict';

const {
  App,
  Bed,
  Hospital,
  Language,
  Nurse,
  NurseStation,
  Patient,
  PatientTablet,
  Physician,
  Request,
  Response,
  Role,
  Room,
  Service,
  ServiceCategory,
  Tablet,
  User,
  Ward,
  WardService,
  WardServiceCategory,
} = require('../lib/models');

const bulkCreateOptions = {
  individualHooks: true
};

(async () => {
  try {
    // Hospital data
    let hospital = await Hospital.create({
      name: 'NewYork-Presbyterian',
      division: 'Westchester Division',
      address1: '21 Bloomingdale Rd, White Plains',
      city: 'New York',
      state: 'NY',
      zipcode: '10605',
      logoLightFileName: 'http://res.cloudinary.com/darkturtle/image/upload/v1483021424/rqfisof8g5llzmomnwkv.png',
      logoDarkFileName: 'http://res.cloudinary.com/darkturtle/image/upload/v1483022230/cbgrtjlkirxpdrujv879.png',
      beaconUuid: 'NYPHWD-B1',
      major: 1
    });

    // Language data
    let languages = await Language.bulkCreate([{
      name: 'English'
    }, {
      name: 'Français'
    }, {
      name: 'Espanõl'
    }, {
      name: 'Deutsch'
    }, {
      name: 'Русскии'
    }, {
      name: 'Português'
    }], bulkCreateOptions);

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

    // WardServiceCategory data
    WardServiceCategory.bulkCreate([{
      serviceCategoryId: serviceCategories[0].id,
      wardId: wards[0].id,
      level1: 5,
      level2: 10,
      level3: 15
    }, {
      serviceCategoryId: serviceCategories[1].id,
      wardId: wards[0].id,
      level1: 10,
      level2: 20,
      level3: 30
    }], bulkCreateOptions);

    // Service data
    let services = await Service.bulkCreate([{
      categoryId: serviceCategories[0].id,
      name: 'Need Medicine',
      icon: 'http://res.cloudinary.com/darkturtle/image/upload/v1484045989/yiizo9sbwcy4atitkgw7.png',
      description: '',
      notificationMessage: '',
      launchAppUrl: ''
    }, {
      categoryId: serviceCategories[0].id,
      name: 'Feeling Pain',
      icon: 'http://res.cloudinary.com/darkturtle/image/upload/v1484136342/pain-small_pwazlh.png',
      description: '',
      notificationMessage: '',
      launchAppUrl: ''
    }, {
      categoryId: serviceCategories[1].id,
      name: 'My Charts',
      icon: 'http://res.cloudinary.com/darkturtle/image/upload/v1484136481/charts-small_hcv7a0.png',
      description: '',
      notificationMessage: '',
      launchAppUrl: ''
    }, {
      categoryId: serviceCategories[1].id,
      name: 'Internet',
      icon: 'http://res.cloudinary.com/darkturtle/image/upload/v1484136506/browser-small_em1dxy.png',
      description: '',
      notificationMessage: '',
      launchAppUrl: ''
    }], bulkCreateOptions);

    // WardService data
    let wardServices = await WardService.bulkCreate([{
      wardId: wards[0].id,
      serviceId: services[0].id,
      level1: 2,
      level2: 5,
      level3: 10,
    }, {
      wardId: wards[0].id,
      serviceId: services[1].id,
    }, {
      wardId: wards[0].id,
      serviceId: services[2].id,
    }, {
      wardId: wards[0].id,
      serviceId: services[3].id,
      visible: false,
    }], bulkCreateOptions);

    // Role data
    const roles = await Role.bulkCreate([{
      name: 'admin'
    }, {
      name: 'physician'
    }, {
      name: 'nurse'
    }, {
      name: 'supervisor'
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

    users[0].addRole(roles[0]);
    users[0].save();
    users[1].addRole(roles[2]);
    users[1].save();
    users[2].addRole(roles[1]);
    users[2].save();
    users[3].addRole(roles[2]);
    users[3].save();

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
      languageId: languages[0].id,
      primaryNurseId: nurses[0].id,
      primaryPhysicianId: physicians[0].id,
      interfaceWardId: wards[0].id
    }, {
      firstName: 'Timothy',
      lastName: 'Mensah',
      phoneNumber: '',
      bedId: beds[1].id,
      languageId: languages[1].id,
      primaryNurseId: nurses[0].id,
      primaryPhysicianId: physicians[0].id,
      interfaceWardId: wards[0].id
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
    nurses[0].user = await nurses[0].getUser();
    PatientTablet.bulkCreate([{
      patientId: patients[0].id,
      tabletId: tablets[0].id,
      assignerId: nurses[0].user.id
    }], bulkCreateOptions);

    // App data
    const apps = await App.bulkCreate([{
      title: 'Configuration',
      icon: 'http://res.cloudinary.com/darkturtle/image/upload/configuration_uawgf8.png',
      webPathScope: '/configuration',
      webPathDefault: '/configuration/wardsServiceCategories',
    }, {
      title: 'Workflow',
      icon: 'http://res.cloudinary.com/darkturtle/image/upload/workflow_btsbeb.png',
    }, {
      title: 'Nurses Station',
      icon: 'http://res.cloudinary.com/darkturtle/image/upload/nurses-station_ccm3yk.png',
    }, {
      title: 'Patients',
      icon: 'http://res.cloudinary.com/darkturtle/image/upload/patients_rnrexz.png',
    }], bulkCreateOptions);

    roles[0].setApps(apps);
    roles[0].save();
  }
  catch (err) {
    console.log(`ERROR: ${err.stack}`);
  }
})();
