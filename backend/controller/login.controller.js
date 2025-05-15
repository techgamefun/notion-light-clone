const db = require("../models/index");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.Users.findOne({
      where: { email: email },
    });
    if (!user) {
      res.send("email does not exist please register");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.send("You have enter incorrect password");
    }

    const token = Jwt.sign(
      { id: user.id, email: user.email },
      "hereismysecretkey123456789",
      { expiresIn: "5h" }
    );

    res.status(200).json({
      message: "Login successful",
      token, // Send the JWT token back to the user
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = loginController;
