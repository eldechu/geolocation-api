const expect = require("chai").expect;
const sinon = require("sinon");
const Geolocation = require("../db/model");
const geolocationController = require("../controllers/geolocation");
const testData = require("../testData/testdata");

describe("Geolocation controller ", () => {
  it("should send response with all geolocation data", (done) => {
    const req = { params: { address: undefined } };
    const dbResult = [
        {
          ip: "142.250.81.206",
          domain: "google.com",
          type: "ipv4",
        },
        {
          ip: "2.2.2.2",
          domain: "two.com",
          type: "ipv4",
        },
      ];

    Geolocation.findAll = function () {
      return Promise.resolve(dbResult);
    };

    let result;
    let resultObjectsToCheck;
    res = {
      status: function (status) {
        result = status;
        return res;
      },
      json: function (inputData) {
        resultObjectsToCheck = inputData;
      }
    };

    geolocationController.getGeolocation(req, res, () => {})
      .then(() => {
        expect(result).to.equal(200);
        expect(resultObjectsToCheck).to.deep.include.members(dbResult);
        done();
      });
  });
});
