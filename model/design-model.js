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
      callback({
        "message": "successfully inserted a new row",
        "success": true
      });
    },
    () => {
      callback({
        "message": "Something went wrong during new row creation",
        "success": false
      });
    }
  );
};

module.exports.getDesign = function(id, callback){

  Design.findById(parseInt(id, 10)).
    then(
    (data) => {
      callback(data, {
        "message": "successfully retrieved data",
        "success": true
      });
    },
    () => {
      callback(null, {
        "message": "Something went wrong during data retrieval",
        "success": false
      });
    }
  );
};

module.exports.getDesignList = function(callback){
  sequelize.query("SELECT * FROM designs").
    then(
    (data) => {
      callback(data, {
        "message": "successfully retrieved all the desings list",
        "success": true
      });
    },
    () => {
      callback(null, {
        "message": "Something went wrong during design list retrieval",
        "success": false
      });
    }
  );
}
