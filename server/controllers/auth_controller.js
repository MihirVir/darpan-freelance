const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // checking if the user exists
    const isUser = await User.findOne({ username: username });
    if (isUser) {
      return res.status(400).send("User already exists");
    }

    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username: username,
      password: hashedPass,
      email: email,
    });
    await newUser.save();
    return res.status(201).send({
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // checking if the user exists or not
    const isUser = await User.findOne({ username: username });
    if (!isUser) {
      return res.status(404).send("Invalid username or password");
    }
    // matching the hashed password
    const passwordMatcher = bcrypt.compareSync(password, isUser.password);
    if (!passwordMatcher) {
      return res.status(400).send("Invalid username or password");
    }
    // generating JWT
    const token = jwt.sign(
      { username: username, id: isUser._id },
      process.env.KEY,
      { expiresIn: "1h" }
    );

    res.status(201).send({ token: token, username: isUser.username });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
