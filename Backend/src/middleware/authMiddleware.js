const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {

    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided."
      });
    }

    // Check format: Bearer <token>
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token Format"
      });
    }

    // Extract only the token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save logged-in user info
    req.user = decoded;

    // Continue to next function
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token"
    });
  }
};

module.exports = auth;