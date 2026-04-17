const jwt = require("jsonwebtoken");
const config = require("../config");

function signToken(userId) {
  return jwt.sign({ sub: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
}

function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

function setAuthCookie(response, token) {
  response.cookie(config.jwtCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

function clearAuthCookie(response) {
  response.clearCookie(config.jwtCookieName, {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });
}

module.exports = {
  signToken,
  verifyToken,
  setAuthCookie,
  clearAuthCookie
};
