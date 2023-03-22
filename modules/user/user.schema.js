const { Schema, model } = require("mongoose");
const { makeHashValue, compareHashValue } = require("../../utils/hash.util");
const JWT = require("jsonwebtoken");
const { JWT_SECRET, TOKEN_EXPIRY } = process.env;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user?.isModified("password")) return next();
  user.password = await makeHashValue(user.password);
  next();
});

UserSchema.methods.verifyPassword = async function (password, hashPass) {
  return await compareHashValue(password, hashPass);
};

UserSchema.methods.getJWTToken = function () {
  const payload = {
    name: this.name,
    email: this.email,
    id: this.id,
  };

  return JWT.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = model("User", UserSchema);
