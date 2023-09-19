const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const crypto = require("node:crypto");
require("dotenv").config();

const { User } = require("../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const { JWT_SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendEmail({
    to: email,
    subject: `Welcome on board, ${name}`,
    html: `
    <p>To confirm your registration, please click on link below</p>
    <p>
      <a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click here to verify email</a>
    </p>
    `,
    text: `To confirm your registration, please click on link below\n
    ${BASE_URL}/api/auth/verify/${verificationToken}
    `,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({
    verificationToken: verificationToken,
  }).exec();

  if (!user) {
    throw HttpError(404, "'User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  }).exec();

  res.json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail({
    to: email,
    subject: `Welcome on board, ${user.name}`,
    html: `
    <p>To confirm your registration, please click on link below</p>
    <p>
      <a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click here to verify email</a>
    </p>
    `,
    text: `To confirm your registration, please click on link below\n
    ${BASE_URL}/api/auth/verify/${user.verificationToken}
    `,
  });

  res.json({
    message: "Verification email sent",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  if (!user.verify) {
    throw HttpError(401, "Please verify your email");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.json({ email, name });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.json({
    message: "Logout success",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
