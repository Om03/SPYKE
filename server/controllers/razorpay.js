const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const tier = require("../models/tiers");
const User = require("../models/user");
const crypto = require('crypto')
const config = require("config");

exports.paymentVerification = async (req, res) => {
    try {
        if (req.body.event == "subscription.charged" || req.body.event == "subscription.activated") {
            const secret = "uRySozNYpz0GNx4oUWmZ89s5"
            const shasum = crypto.createHmac("sha256", secret);
            shasum.update(JSON.stringify(req.body));
            const digest = shasum.digest("hex");
            if (digest === req.headers["x-razorpay-signature"]) {
                console.log("success");
                const tiers = await tier.findOne({});
                for (tier123 of tiers.data) {
                    if (tier123.rzr_plan_id == req.body.payload.subscription.entity.plan_id) {
                        var user = await User.findOne({ email: req.body.payload.subscription.entity.notes.email })
                        user["plan"] = tier123.title
                        user["max_stocks"] = tier123.stocks
                        await User.findByIdAndUpdate(user._id, { $set: user })
                    }
                }
                return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
            } else {
                console.log("Please make a legit request");
                return res.status(StatusCodes.EXPECTATION_FAILED).json({ message: ReasonPhrases.EXPECTATION_FAILED });
            }
        } else { return res.status(StatusCodes.EXPECTATION_FAILED).json({ message: ReasonPhrases.EXPECTATION_FAILED }); }

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
};
