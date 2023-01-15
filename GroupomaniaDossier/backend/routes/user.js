const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const password = require('../middleware/password')
const multer = require("../middleware/multer-config");
const userCtrl = require("../controllers/user");
const infosUserCtrl = require("../controllers/infosUser");
const infosPostCtrl = require("../controllers/post");
const likesCtrl = require("../controllers/likes");

//Routes utilisateurs
router.post("/api/authentification/signup", userCtrl.signup);
router.post("/api/authentification/signin", userCtrl.signin);

router.get("/api/ficheUser/:id", auth.auth, infosUserCtrl.getInfosUser);
router.get("/api/ficheUser/", auth.auth, infosUserCtrl.getInfosAllUser);
router.put("/api/ficheUser/landscape/:id", auth.auth, multer, infosUserCtrl.modifyInfosUserLandscape);
router.put("/api/ficheUser/profile/:id", auth.auth, multer, infosUserCtrl.modifyInfosUserProfile);

//Routes Posts
router.get("/api/ficheUser/post/:id", auth.auth, infosPostCtrl.getAllPosts);
router.get("/api/ficheUser/post/one/:id", auth.auth, multer, infosPostCtrl.getInfosPost)
router.put("/api/ficheUser/post/one/:id", auth.auth, multer, infosPostCtrl.modifyInfosPost)
router.delete("/api/ficheUser/post/one/:id", auth.auth, multer, infosPostCtrl.deletePost)
router.post("/api/ficheUser/post/", auth.auth, multer, infosPostCtrl.createPost)
router.post("/api/ficheUser/post/like/:id", auth.auth, likesCtrl.like); 

module.exports = router;
