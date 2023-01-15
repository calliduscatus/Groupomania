const jwt = require("jsonwebtoken");
const dotenv = require("dotenv/config");

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
//     const userId = decodedToken.userId;
//     req.auth = {
//       userId: userId,
//     };
//     next();
//   } catch (error) {
//     res.status(403).json({ /*error*/ message: ":  unauthorized request" });
//   }
// };



const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin
    req.auth = {
      userId: userId,
      isAdmin: isAdmin
    };
    next();
  } catch (error) {
    res.status(400).json({ /*error*/ message: "Unauthorized request" });
  }
};

// const isAdmin = (req, res, next) => {
//   auth(req, res, () => {
//     if(req.auth.isAdmin) {
//       next()
//     } else {
//       res.status(403).send({ /*error*/ message: 'Acces denied. Invalid auth token'})
//     }
//   })
// }

module.exports = {auth}
