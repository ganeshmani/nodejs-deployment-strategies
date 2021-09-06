const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

async function bootstrap(){


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");

try {
  await db.sequelize.authenticate();
  db.sequelize.sync();
  console.log('Connection has been established successfully.');
  
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/todo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serverrrrr is running on port ${PORT}.`);
});
} catch (error) {
  console.error('Unable to connect to the database:', error);
} 
}
bootstrap()
