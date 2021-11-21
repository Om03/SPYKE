var crypto = require("crypto");

module.exports = hash = (data) => {
  const code = crypto.createHash("sha256").update(data).digest("base64");
  return code;
};
