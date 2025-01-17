const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signUp = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, imageUrl } =
      req.body;

    const isEmail = emailRegex.test(email);
    const validPassword = passwordRegex.test(password);

    if (!isEmail) {
      return res.status(400).json({ message: "Enter a valid email!" });
    }

    if (!validPassword) {
      return res.status(400).json({
        message:
          "Password must have atleast one uppercase, one lowercase, one number, one symbol and must be more than 8 characters!",
      });
    }

    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      imageUrl,
    });

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  let user, token, passwordMatch;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or password is required!" });
    }

    user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // if (!user.emailVerified) {
    //   return res.status(401).json("Please confirm your email to login!");
    // }

    passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Wrong credentials!" });
    }

    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ success: true, data: token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  signUp,
  login,
};
