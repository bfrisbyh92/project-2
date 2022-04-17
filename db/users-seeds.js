// Require the model which has a connection to the database
const Users = require('../models/user');
// Require a json file which contains some dummy data
const seedData = require('./users-seeds.json');


Users.deleteMany({})
  .then(() => {
    return Users.insertMany(seedData);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });