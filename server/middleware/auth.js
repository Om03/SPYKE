const jwt = require("jsonwebtoken");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const config = require("config");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: [ReasonPhrases.UNAUTHORIZED, "User not logged In"] });
    }
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, "lahfo;aiwyADAD1082471902pue;/ADLJKAKSj;dlSd");
    }
    if (!decodedData.id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: [ReasonPhrases.UNAUTHORIZED, "User not logged In"] });
    }
    const user = await User.findById(decodedData.id);
    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: [ReasonPhrases.FORBIDDEN, "User not logged In"],
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: [ReasonPhrases.UNAUTHORIZED, error, "User not logged In"],
    });
  }
};

module.exports = auth;
