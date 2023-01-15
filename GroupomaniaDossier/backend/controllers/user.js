const User = require("../models/User");

const cryptojs = require('crypto-js')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv/config");

exports.signup = (req, res, next) => {
  const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTO_KEY_SECRET}`).toString()
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: emailCryptoJs,
        password: hash,
        bioProfile: "",
        city: "",
        imageUrlProfilePicture: "",
        imageUrlLandscapePicture: "",
        isAdmin: false,
      });
      user.save().then(() =>
        res.status(201).json({
          userId: user._id,
          token: jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, `${process.env.JWT_KEY_TOKEN}`, {
            expiresIn: "8h",
          }),
        })
      );
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.signin = (req, res, next) => {
  const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTO_KEY_SECRET}`).toString()
  User.findOne({ email: emailCryptoJs })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Votre email ou mot de passe est incorrect" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Votre email ou mot de passe est incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, `${process.env.JWT_KEY_TOKEN}`, {
              expiresIn: "8h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
