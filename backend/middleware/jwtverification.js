const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const jwtVerification = (req, res, next) => {
  // Get token from the Authorization header

  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied, invalid token format" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, "hereismysecretkey123456789");

    // Attach decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    console.log("req params jwt");
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

module.exports = jwtVerification;
