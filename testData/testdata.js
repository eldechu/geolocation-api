const Geolocation = require("../db/model");
const _ = require("underscore");

module.exports = function () {
  const testData = [
    {
      ip: "79.110.204.246", //myIp
      domain: "",
      type: "ipv4",
      continent_code: "EU",
      continent_name: "Europe",
      country_code: "PL",
      country_name: "Poland",
      region_code: "DS",
      region_name: "Lower Silesia",
      city: "Wroc\u0142aw",
      zip: "53-677",
      latitude: 51.110328674316406,
      longitude: 17.019630432128906,
      location: {
        geoname_id: 3081368,
        capital: "Warsaw",
        languages: [{ code: "pl", name: "Polish", native: "Polski" }],
        country_flag: "https://assets.ipstack.com/flags/pl.svg",
        country_flag_emoji: "\ud83c\uddf5\ud83c\uddf1",
        country_flag_emoji_unicode: "U+1F1F5 U+1F1F1",
        calling_code: "48",
        is_eu: true,
      },
    },
    {
      ip: "142.250.81.206", // google.com
      domain: "google.com",
      type: "ipv4",
      continent_code: "NA",
      continent_name: "Nor,th America",
      country_code: "US",
      country_name: "United States",
      region_code: "VA",
      region_name: "Virginia",
      city: "Herndon",
      zip: "20170",
      latitude: 38.98371887207031,
      longitude: -77.38275909423828,
      location: {
        geoname_id: 4763793,
        capital: "Washington D.C.",
        languages: [{ code: "en", name: "English", native: "English" }],
        country_flag: "https://assets.ipstack.com/flags/us.svg",
        country_flag_emoji: "\ud83c\uddfa\ud83c\uddf8",
        country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
        calling_code: "1",
        is_eu: false,
      },
    },
    {
      ip: "74.6.231.20", //yahoo.com
      domain: "yahoo.com",
      type: "ipv4",
      continent_code: "NA",
      continent_name: "North America",
      country_code: "US",
      country_name: "United States",
      region_code: "NY",
      region_name: "New York",
      city: "Manhattan",
      zip: "10003",
      latitude: 40.73139190673828,
      longitude: -73.9884033203125,
      location: {
        geoname_id: 5125771,
        capital: "Washington D.C.",
        languages: [{ code: "en", name: "English", native: "English" }],
        country_flag: "https://assets.ipstack.com/flags/us.svg",
        country_flag_emoji: "\ud83c\uddfa\ud83c\uddf8",
        country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
        calling_code: "1",
        is_eu: false,
      },
    },
  ];

  try {
    console.log("Initializing test data");
    _.each(testData, (response) => {
      Geolocation.create({
        ip: response.ip,
        domain: response.domain,
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
    });
  } catch (err) {
    console.log(err);
  }
};
