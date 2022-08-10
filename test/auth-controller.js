const expect = require("chai").expect;
const sinon = require("sinon");
const authController = require("../controllers/auth");

describe("Authentication controller ", () => {
  it("should authenticate user", () => {
    req = {
      body: {
        email: "testmail@gmail.com",
        password: "testpassword",
      },
    };
    let result;
    res = {
      status: function (status) {
        result = status;
      },
    };

    expect(authController.login.bind(this, req, res, () => {})).not.to.throw();
    expect(result).to.equal(200);
  });

  it("should not authenticate user", () => {
    req = {
      body: {
        email: "wrong",
        password: "testpassword",
      },
    };
    expect(
      authController.login.bind(this, req, {}, (error) => {
        throw error;
      })
    ).to.throw("Authorization failed. User not found");
  });
});
