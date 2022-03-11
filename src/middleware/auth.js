const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (request, response, next) => {
  const token =
    request.headers["jwt-token"] || request.body.token || request.query.token;
  console.log(token);

  if (!token) {
    return response.status(403).json({
      error: "OE5",
      description: "A token is required for authentication",
    });
  }

  try {
    decoded = jwt.verify(token, config.TOKEN_KEY);
    request.user = decoded;
  } catch (error) {
    return response
      .status(401)
      .json({ error: "OE6", description: "Invalid token" });
  }
  return next();
};

module.exports = verifyToken;
