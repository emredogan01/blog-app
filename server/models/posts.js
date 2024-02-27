import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  subTitle: String,
  text: String,
  category: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
