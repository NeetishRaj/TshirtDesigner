const config = require('../config.js');
const Sequelize = require('sequelize');
const pg = require('pg');

/*
 * Uri string based connection is deprecated in Sequelize for security reasons
 * new Sequelize('mysql://morpheus:godOfDreams@localhost:3306/tshirtDesign');
 * therefore using symbol based connections as shown below.
 */


// const sequelize = new Sequelize(
//   config.db.name,
//   config.db.username,
//   config.db.password,
//   {
//     "dialect": config.db.dialect,
//     "host": config.db.host,
//     "operatorsAliases": false,
//     "pool": {
//       "acquire": 30000,
//       "idle": 10000,
//       "max": 5,
//       "min": 0
//     },
//     "port": config.db.port
//   }
// );



/*
 * If we are using local running app to use remote postgre db then we need to
 * to set the ssl value to true , to connect in ssl format.
 */
if (typeof process.env.DATABASE_URL === "undefined"){
  pg.defaults.ssl = true;
}

const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize.
  authenticate().
  then(() => {
    console.log('Connection has been established successfully with Heroku Postgre.');
  }).
  catch((err) => {
    console.error('Unable to connect to the database:', err.message);
  });

console.log("Starting");
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

// Create the table
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
