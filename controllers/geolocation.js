const _ = require("underscore");
const verifyAddressAndThrow = require("../utils/addressValidator");
const db = require("../db");
const Geolocation = require("../db/model");
const fetch = require('node-fetch');

function findGeolocationInDb(address, addressType) {
  if (addressType.isIP) {
    return Geolocation.findByPk(address).then((geolocation) => {
      if (_.isEmpty(geolocation) === false) return geolocation;
      return false;
    });
  } else {
    //isDomain
    return Geolocation.findAll({ where: { domain: address } }).then(
      (geolocation) => {
        if (_.isEmpty(geolocation) === false) return geolocation[0];
        return false;
      }
    );
  }
}
exports.getGeolocation = (req, res, next) => {
  const address = req.params.address;
  if (address === undefined) {
    // all objects
    return Geolocation.findAll().then((geolocations) => {
      res.status(200).json(geolocations);
      return Promise.resolve(); // for testing purposes
    });
  }
  const addressType = verifyAddressAndThrow(address, res);

  //single object
  findGeolocationInDb(address, addressType).then((geolocation) => {
    if (geolocation) {
      res.status(200).json(geolocation);
    } else res.status(404).json({ message: "Address not found." });
  });
};

exports.postGeolocation = (req, res, next) => {
  const address = req.body.address;

  const access_key = "41d49f4afb49b064d2953f55479e3831";
  const ipStackUrl =
    "http://api.ipstack.com/" + address + "?access_key=" + access_key;

  const addressType = verifyAddressAndThrow(address, res);

  Promise.resolve()
    .then(() => {
      console.log("here");

      return findGeolocationInDb(address, addressType).then((geolocation) => {
        if (geolocation) {
          const error = new Error("Address already in DB");
          error.statusCode = 409;
          throw error;
        }
      });
    })
    .then(() => {
      return fetch(ipStackUrl, { method: "GET" });
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.success === false && response.error.code === 106) {
        //no data available on ipstack.com
        const error = new Error(
          "No geolocation data available for provided address."
        );
        error.statusCode = response.error.code;
        throw error;
      } else if (response.success === false) {
        //other errors from ipstack.com
        const error = new Error(JSON.stringify(response.error.info));
        error.statusCode = response.error.code;
        throw error;
      }
      return response;
    })
    .then((response) => {
      return Geolocation.create({
        ip: response.ip,
        domain: addressType ? address : "",
        type: response.type,
        continent_code: response.content_node,
        continent_name: response.name,
        country_code: response.country_code,
        country_name: response.country_name,
        region_code: response.region_code,
        region_name: response.region_name,
        city: response.city,
        zip: response.zip,
        latitude: response.latitude,
        longitude: response.longitude,
      });
    })
    .then(() => {
      res.status(201).json({
        message: "Geolocation data successfully added.",
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteGeolocation = (req, res, next) => {
  const address = req.params.address;
  const addressType = verifyAddressAndThrow(address, res);

  return findGeolocationInDb(address, addressType)
    .then((geolocation) => {
      if (!geolocation) {
        const error = new Error("Address not found.");
        error.statusCode = 404;
        throw error;
      }
      return geolocation.destroy();
    })
    .then(() => {
      res.status(201).json({
        message: "Geolocation data successfully deleted",
      });
    })
    .catch((err) => {
      next(err);
    });
};
