const expect = require("chai").expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const authMiddleware = require("../middleware/is-authorized");

describe("Authentication middleware", () => {
  it("should throw error when authentication token is missing", () => {
    req = {
      get: function () {
        return "";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Missing JWT authentication token."
    );
  });

  it("should throw error when authentication token is empty", () => {
    req = {
      get: function () {
        return "Bearer";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "jwt must be provided"
    );
  });

  it("should throw error when Authorization expires", () => {
    req = {
      get: function () {
        return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY2MDA3OTk5MywiZXhwIjoxNjYwMDgzNTkzfQ.LV_P605sFdyqA7DRO8ymNiJy0eRW1eNjH6Imo21bytw";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "jwt expired"
    );
  });

  it("should throw error when token malformed", () => {
    req = {
      get: function () {
        return "Bearer malformed token";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "jwt malformed"
    );
  });

  it("should verify token positively", () => {
    req = {
      get: function () {
        return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY2MDA3OTk5MywiZXhwIjoxNjYwMDgzNTkzfQ.LV_P605sFdyqA7DRO8ymNiJy0eRW1eNjH6Imo21bytw";
      }
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns(true);
    expect(authMiddleware.bind(this, req, {}, () => {})).not.to.throw();
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
