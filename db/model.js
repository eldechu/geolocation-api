const { Sequelize } = require("sequelize");
const sequelize = require("./index");

const Geolocation = sequelize.define("geolocation", {
  ip: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false,
  },
  domain: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  type: Sequelize.STRING,
  continent_code: Sequelize.STRING,
  continent_name: Sequelize.STRING,
  country_code: Sequelize.STRING,
  country_name: Sequelize.STRING,
  region_code: Sequelize.STRING,
  region_name: Sequelize.STRING,
  city: Sequelize.STRING,
  zip: Sequelize.STRING,
  latitude: Sequelize.DOUBLE,
  longitude: Sequelize.DOUBLE,
});

module.exports = Geolocation;
