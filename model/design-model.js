const config = require('../config.js');
const Sequelize = require('sequelize');

/*
 * Uri string based connection is deprecated in Sequelize for security reasons
 *"name"e"e"quelize =
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

const Design = sequelize.define('design', {
  "edits": {
    "allowNull": true,
    "type": Sequelize.JSON
  },
  "id": {
    "allowNull": "false",
    "autoIncrement": true,
    "primaryKey": true,
    "type": Sequelize.INTEGER,
    "unique": true
  },
  "name": {
    "allowNull": false,
    "type": Sequelize.STRING
  }
});

Design.sync();


module.exports.insertDesign = function(designData, callback){

  Design.create(designData).
    then(
    () => {
      callback("successfully inserted a new row");
    },
    () => {
      callback("Something went wrong during new row creation");
    }
  );
};
sequelize.query("SELECT * FROM myTable")

module.exports.getDesign = function(id, callback){

  Design.findById(parseInt(id, 10)).
    then(
    (data) => {
      callback(data, "successfully retrieved data");
    },
    () => {
      callback(null, "Something went wrong during data retrieval");
    }
  );
};

module.exports.getDesignList = function(callback){
  sequelize.query("SELECT * FROM designs").
    then(
    (data) => {
      callback(data, "successfully retrieved data");
    },
    () => {
      callback(null, "Something went wrong during data retrieval");
    }
  );
}
