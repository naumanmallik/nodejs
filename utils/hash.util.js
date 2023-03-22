const bcrypt = require("bcrypt");
const { SALT_ROUND } = require("../config/constraints");

exports.makeHashValue = async (value) => {
  const hash = await bcrypt
    .genSalt(SALT_ROUND)
    .then((salt) => bcrypt.hash(value, salt))
    .then((hash) => hash);
  return hash;
};

exports.compareHashValue = async (value, hashValue) => {
  const isMatched = await bcrypt.compare(value, hashValue);
  return isMatched;
};
