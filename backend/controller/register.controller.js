const db = require("../models/index");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    console.log("Registering user", req.body);
    const { firstname, lastname, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const Users = await db.Users.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });
    const user = await db.Users.findOne({
      where: { email: email },
    });
    const token = Jwt.sign(
      { id: user.id, email: user.email },
      "hereismysecretkey123456789",
      { expiresIn: "1d" }
    );
    res.status(201).json({
      message: "User created",
      token, // Send the JWT token back to the user
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = registerController;
