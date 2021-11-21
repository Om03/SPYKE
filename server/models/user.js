const mongoose = require("mongoose");
const hash = require("../utils/password");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: false
  },
  stocks: {
    type: Array,
    required: false
  },
  max_stocks: {
    type: Number,
    required: false
  },
  mobile: {
    type: String,
    required: false
  },
  subscription_id: {
    type: Object,
    required: false,
  }
});

userSchema.pre("save", async function (next) {
  var user = this;
  if (user.isModified("password")) {
    user.password = hash(user.password);
    next();
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword) {
  return this.password === hash(plainPassword);
};

module.exports = mongoose.model("users", userSchema);
