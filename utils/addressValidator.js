const { isIPAddress } = require("ip-address-validator");
const isValidDomain = require("is-valid-domain");

module.exports = (address, res) => {
  if (!address) {
    const error = new Error(
      "Missing IP address or domain. Please check the input data."
    );
    error.statusCode = 400;
    throw error;
  }
  const isIP = isIPAddress(address);
  const isDomain = isValidDomain(address);

  if (isIP === false && isDomain === false) {
    const error = new Error(
      "Validation of IP address or domain failed. Please check the input data."
    );
    error.statusCode = 400;
    throw error;
  }
  return { isIP: isIP, isDomain: isDomain };
};
