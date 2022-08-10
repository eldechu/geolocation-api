exports.JWT_secret =
  "4ADC450C9260D1D6D82A2D039964B7394DA0AD8CE10E4ABBC1D9C32104166044";

exports.JWT_secret_expiration = "6h";

//Hardcoded user data. Signing up not implemented, thus raw password (not encrypted) is stored and received in REQ.
exports.authenticatedUsers = [
    {
      email: "testmail@gmail.com",
      password: "testpassword",
    },
  ];
