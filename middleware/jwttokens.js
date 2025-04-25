const { log } = require("console");
const jwt = require("jsonwebtoken");

const jwttokens = (user , secret) => {
  try {
    // Create a JWT token with a payload

    const token = jwt.sign(user, secret);
    console.log(token);

    return token;
  } catch (error) {
    console.log("hello")
    console.error("Error:", error.message);
  }
};

module.exports = jwttokens;
