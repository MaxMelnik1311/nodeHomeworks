const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const SALT_FACTOR = 6;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: { type: String, required: [true, "Password is required!"] },
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
