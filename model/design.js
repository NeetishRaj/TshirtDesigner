const config = require('../config.js');
const Sequelize = require('sequelize');

/*
 * Uri string based connection is deprecated in Sequelize for security reasons
 *"firstName"e"e"quelize =
 * new Sequelize('mysql://morpheus:godOfDreams@localhost:3306/tshirtDesign');
 * therefore using symbol based connections as shown below.
 */

const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    "dialect": 'mysql',
    "host": 'localhost',
    "operatorsAliases": false,
    "pool": {
      "acquire": 30000,
      "idle": 10000,
      "max": 5,
      "min": 0
    }
  }
);

const User = sequelize.define('user', {
  "firstName": {"type": Sequelize.STRING},
  "lastName": {"type": Sequelize.STRING}
});

// // Here force: true will drop the table if it already exists
// User.sync({"force": true}).then(() => {
//   // Table created
//   return User.create({
//     "firstName": 'John',
//     "lastName": 'Hancock'
//   });
// });


User.findAll().then((users) => {
  console.log(users)
})
