const auth = require("../routes/auth");
const razorpay = require("../routes/razorpay");
const authroutes = require("../routes/authroutes");
const tier = require("../routes/tier");
module.exports = (app) => {
  app.use("/.netlify/functions/api/auth", auth);
  app.use("/.netlify/functions/api/razorpay", razorpay);
  app.use("/.netlify/functions/api/authroutes", authroutes);
  app.use("/.netlify/functions/api/tier", tier);
};
