import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: { type: String, default: "" },
    likes: { type: [String], default: [] },  // explicit array of userId strings
    image: { type: String, default: "" },
    sharedPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",    // This must match the model name
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Posts", postSchema);

export default postModel;
