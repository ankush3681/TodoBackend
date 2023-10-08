const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    task: { type: String, required: true },
    status: { type: Boolean, required: true },
    description: { type: String, required: true },
    creator: { type: String, required: true },
    creatorID: { type: String, required: true },
  },
  { versionKey: false }
);

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = {
  TodoModel,
};
