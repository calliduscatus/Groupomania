const Post = require("../models/Post");
const fs = require('fs')

exports.createPost = (req, res) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrlPostPicture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  const post = new Post({
    ...postObject,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllPosts = (req, res) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getInfosPost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((infos) => res.status(200).json(infos))
    .catch((error) => res.status(404).json({ error }));
};


exports.modifyInfosPost = (req, res) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrlPostPicture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...JSON.parse(req.body.post) };

  Post.findOne({ _id: req.params.id })
    .then((user) => {
      if (user.userId != req.auth.userId) {
        res.status(401).json({ message: "Non-autorisé" });
      } 
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(403).json({ error }));
      
    })
    .catch((error) => res.status(400).json({ error }));
    console.log(req.auth)
};

exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if ((req.auth.isAdmin === true || post.userId === req.auth.userId) && req.body.imageUrlPostPicture) {
       const filename = post.imageUrlPostPicture.split("/images/")[1];
       fs.unlink(`images/${filename}`, () => {
         Post.deleteOne({ _id: req.params.id })
           .then(() => res.status(200).json({ message: "Objet supprimé !" }))
           .catch((error) => res.status(401).json({ error }));
       });
     } 
     else if ((req.auth.isAdmin === true || post.userId === req.auth.userId) && !req.body.imageUrlPostPicture)  {
       Post.deleteOne({ _id: req.params.id })
         .then(() => res.status(200).json({ message: "Objet supprimé !" }))
         .catch((error) => res.status(401).json({ error }));
     } else {
      res.status(403).json({ message: "Non-autorisé" });

     }
   })
   .catch((error) => res.status(500).json({ error }));
        
    console.log(req.auth)
};
