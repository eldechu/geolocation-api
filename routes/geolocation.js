const express = require("express");
const geolocationController = require("../controllers/geolocation");
const isAuth = require('../middleware/is-authorized');

const router = express.Router(); // Just a wrapper to help build modular server. Works like app.use().

//GET /geolocation 
//reply with DB content
router.get("/geolocation", isAuth,  geolocationController.getGeolocation); // all entries
router.get("/geolocation/:address", isAuth, geolocationController.getGeolocation);

//POST /geolocation 
//creates DB entry based with data fetched from ipstack.com
router.post("/geolocation", isAuth, geolocationController.postGeolocation); // + eventually add possibility of adding many addresses (bulk)

//DELETE /geolocation
//deletes DB entry
router.delete("/geolocation/:address", isAuth, geolocationController.deleteGeolocation);

module.exports = router;
