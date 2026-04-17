const express = require("express");
const bcrypt = require("bcrypt");
const { query } = require("../db");
const { requireAuth } = require("../middleware/requireAuth");
const { clearAuthCookie, setAuthCookie, signToken } = require("../utils/auth");
const { mapUser, userSelectColumns } = require("../utils/users");

const router = express.Router();
const SALT_ROUNDS = 10;

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function validateRegisterBody(body) {
  if (!validateEmail(body.email || "")) {
    return "Email invalid.";
  }
  if (!body.password || body.password.length < 8) {
    return "Parola trebuie sa aiba cel putin 8 caractere.";
  }
  if (![9, 10, 11, 12].includes(Number(body.grade))) {
    return "Clasa trebuie sa fie intre 9 si 12.";
  }
  if (!Number.isInteger(Number(body.targetYear))) {
    return "Anul tinta ONAA este invalid.";
  }
  return null;
}

router.post("/register", async (request, response) => {
  const errorMessage = validateRegisterBody(request.body);
  if (errorMessage) {
    return response.status(400).json({ message: errorMessage });
  }

  const { email, password, grade, targetYear } = request.body;

  try {
    const existing = await query("SELECT id FROM users WHERE email = $1", [email.toLowerCase()]);
    if (existing.rowCount > 0) {
      return response.status(409).json({ message: "Exista deja un cont cu acest email." });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await query(
      `
        INSERT INTO users (email, password_hash, grade, target_year)
        VALUES ($1, $2, $3, $4)
        RETURNING ${userSelectColumns}
      `,
      [email.toLowerCase(), passwordHash, Number(grade), Number(targetYear)]
    );

    const user = mapUser(result.rows[0]);
    const token = signToken(user.id);
    setAuthCookie(response, token);

    return response.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Nu am putut crea contul." });
  }
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  if (!validateEmail(email || "") || !password) {
    return response.status(400).json({ message: "Datele de autentificare sunt invalide." });
  }

  try {
    const result = await query(
      `
        SELECT ${userSelectColumns}, password_hash
        FROM users
        WHERE email = $1
      `,
      [email.toLowerCase()]
    );

    if (result.rowCount === 0) {
      return response.status(401).json({ message: "Email sau parola incorecte." });
    }

    const row = result.rows[0];
    const isValid = await bcrypt.compare(password, row.password_hash);

    if (!isValid) {
      return response.status(401).json({ message: "Email sau parola incorecte." });
    }

    const user = mapUser(row);
    const token = signToken(user.id);
    setAuthCookie(response, token);

    return response.json({ token, user });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Nu am putut procesa login-ul." });
  }
});

router.get("/me", requireAuth, async (request, response) => {
  return response.json({ user: request.user });
});

router.post("/logout", (request, response) => {
  clearAuthCookie(response);
  return response.status(204).send();
});

module.exports = router;
