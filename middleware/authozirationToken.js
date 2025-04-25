const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  const secretKey = "bscsnc123";
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {

    console.log(decoded)
    if (err) {
      console.log(err)
      console.error("JWT Verification Error:", err.message); // Log error message
      return res
        .status(401)
        .json({ message: "Invalid or expired token. Please re-login." });
    }

    req.user = decoded; // Fix: Assign the entire decoded object
    next();
  });
};

module.exports = authenticateToken;
