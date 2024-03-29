const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
  username: String,
  // One User has many likes, referencing because we have user model, so we can get the users information when we need it
  //
  userId: { type: mongoose.Schema.Types.ObjectId },
});

const commentsSchema = mongoose.Schema({
  username: String,
  userId: {type: mongoose.Schema.Types.ObjectId},
  text: String,
  userName: String,
  userAvatar: String,

})


// One a user has many posts 
// A post belongs to a User
const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photoUrl: String,
  title: String,
  caption: String,
  // One Post has many likes, we are using embedding, because the likes will always be tied to the post, so no reason
  // to make a likes model
  //comments: [commentSchema],
  likes: [likesSchema],
  comments: [commentsSchema]
});

module.exports = mongoose.model("Post", postSchema);