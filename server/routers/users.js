const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getlocal = (req, res) => {
  res.send("Hallo");
};

const signup = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(401).send({ message: errors.array() });
  // }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ error: "User with given email is already exist" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.insertMany({ ...req.body, password: hashedPassword });
    res.status(200).send({ message: "Add user is succesfully" });
  } catch (error) {
    if (error) {
      return res.status(501).send({ error: "Internal Server Error" });
    }
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "The email or password you entered is incorrect" });
    }
    const comPassword = await bcrypt.compare(req.body.password, user.password);
    if (!comPassword) {
      return res
        .status(404)
        .send({ error: "The email or password you entered is incorrect" });
    }
    const token = jwt.sign({ email: user.email }, "surabaya", {
      expiresIn: "1d",
    });

    res.status(200).send({ message: "Correct", token });
  } catch (error) {
    return res.status(501).send({ error: "Internal Server Error" });
  }
};

module.exports = { getlocal, signup, signin };
