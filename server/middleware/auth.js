const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  // Get token from the header
  const authHeader = req.headers.authorization;

  // Check if token is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ msg: "No token, authorization denied" });
  }

  // Extract the token (Bearer <token>)
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    req.user = verifiedToken; 
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).send({ msg: "Token is not valid" });
  }
};

module.exports = verifyToken;

