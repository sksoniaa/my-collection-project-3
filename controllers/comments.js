const Post = require('../models/post');

module.exports = {
  create,
  delete: deleteComment
}

async function create(req, res){

  try {
      const post = await Post.findById(req.params.id);
      post.comments.push({username: req.user.username, userId: req.user._id, text: req.body.text, userAvatar: req.user.userAvatar}); 
      await post.save()
      res.status(201).json({data: 'comment added'})
  } catch(err){
     console.log(err);
      res.status(400).json({err})
  }
  
}

async function deleteComment(req, res){
  try {
      
      const post = await Post.findOne({'comments._id': req.params.id, 'comments.username': req.user.username, 'comments.text': req.user.text, 'comments.userAvatar': req.user.userAvatar});
      post.comments.remove(req.params.id) 
      await post.save() 
      res.json({data: 'comment removed'})
  } catch(err){
      res.status(400).json({err})
  }
}