import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "email-validator";


export const tryWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};

export const generateToken = async ({ user, session }) => {
  const secret = process.env.SECRET;
  const payload = { user, session };
  const token = jwt.sign(payload, secret, { expiresIn: "60m" });
  const refreshToken = jwt.sign(payload, secret);

  return { token, refreshToken };
};

export const chekValidObjectID = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) return true;
  throw new Error("ID not correct");
};

export const hashedPassword = async (password) => {
  const hesh = await bcrypt.hash(password, 12);
  return hesh;
};




const blockEmailProviders = [
  "mail.ru",
  "yandex.ru",
  "yandex.ua",
  "yandex.by",
  "yandex.kz",
  "yandex.com",
  "rambler.ru",
  "list.ru",
  "bk.ru",
  "inbox.ru",
];

export const validateEmail = (email) => {
  const isValid = validator.validate(email);
  const emailDomain = email.split("@")[1];

  if (!isValid) {
    return 0;
  } else if (blockEmailProviders.includes(emailDomain)) {
    return 0;
  } else {
    return "Email is valid";
  }
};

export const isNumeric = (n) => !isNaN(n);