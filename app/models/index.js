const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

let DB_URI = ''
console.log("process.env.NODE_ENV",process.env.NODE_ENV,process.env.DATABASE_URL)
if(process.env.NODE_ENV === "test"){
   DB_URI = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres'
}
else{
   DB_URI = process.env.DATABASE_URL || 'postgres://postgres:postgres@postgres:5432/postgres'
}
console.log("DB_URI",DB_URI)
const sequelize = new Sequelize(DB_URI) 
const db = {}

fs.readdirSync(__dirname)
  .filter((file) => {
   
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (env === 'production' ? file.slice(-3) === '.js' : file.slice(-3) === '.js')
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    console.log("model",model)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.todo = require("./todo.model.js");

module.exports = db;
