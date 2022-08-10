const express = require("express");
const bodyParser = require("body-parser");
const geolocationRoutes = require("./routes/geolocation");
const authRoutes = require("./routes/auth");

const sequelize = require("./db");
const Geolocation = require("./db/model");
const fillInitialTestData = require("./testData/testdata");

const app = express();

app.use(bodyParser.json()); //middleware for parsing incomming data

app.use((req, res, next) => {
  //enabling CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/v1", geolocationRoutes);
app.use("/api/v1", authRoutes);

app.use((error, req, res, next) => {
  // to be tested
  res.status(error.statusCode || 500);
  res.json({
    error: {
      message: error.message,
      data: error.data,
    },
  });
});

sequelize
  .authenticate()
  .then(() => {
    return sequelize.sync();
  })
  .then(() => {
    fillInitialTestData();
  })
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
