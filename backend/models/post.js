const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true },
  // creator: {type: Schema.Types.ObjectId, required: true, ref: "User"}
});

module.exports = mongoose.model("Post", PostSchema);
