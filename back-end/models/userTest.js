const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserTestSchema = new Schema(
  {
    name: {
      first: String,
      last: String,
    },
    age: Number,
  },
  { timestamps: true }
);

UserTestSchema.virtual("fullName").get(function () {
  return this.name.first + " " + this.name.last;
});

module.exports = mongoose.model("userTest", UserTestSchema);
