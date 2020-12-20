const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const SALT_FACTOR = 6;
const gravatar = require("gravatar");

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
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
    isVerificated: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
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
