const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
console.log("process.env.DATABASE_URI",process.env.DATABASE_URI)
const DB_URI = process.env.DATABASE_URI || 'postgres://postgres:postgres@postgres:5432/postgres'
const sequelize = new Sequelize(DB_URI) 

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todo = require("./todo.model.js")(sequelize, Sequelize);

module.exports = db;
