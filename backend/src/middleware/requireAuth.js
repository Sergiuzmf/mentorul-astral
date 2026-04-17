const { query } = require("../db");
const config = require("../config");
const { verifyToken } = require("../utils/auth");
const { mapUser, userSelectColumns } = require("../utils/users");

function getTokenFromRequest(request) {
  const authHeader = request.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length);
  }

  return request.cookies?.[config.jwtCookieName] || null;
}

async function requireAuth(request, response, next) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return response.status(401).json({ message: "Autentificare necesara." });
    }

    const payload = verifyToken(token);
    const result = await query(`SELECT ${userSelectColumns} FROM users WHERE id = $1`, [payload.sub]);

    if (result.rowCount === 0) {
      return response.status(401).json({ message: "Sesiunea nu mai este valida." });
    }

    request.auth = payload;
    request.user = mapUser(result.rows[0]);
    return next();
  } catch (error) {
    return response.status(401).json({ message: "Token invalid sau expirat." });
  }
}

module.exports = {
  requireAuth
};
