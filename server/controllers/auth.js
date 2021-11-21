const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { signupValidation, loginValidation } = require('../validations/auth');
const { otpEmailVerification } = require('../utils/mail');
const crypto = require("crypto");
const tiers = require('../models/tiers');
const Razorpay = require("razorpay");
const axios = require('axios');
const API = axios.create({ baseURL: `https://stuart3.pythonanywhere.com` });

const razorpay = new Razorpay({
    key_id: "rzp_test_XP7UbJSdBPFj3P",
    key_secret: "uRySozNYpz0GNx4oUWmZ89s5"
});

exports.signup = async (req, res) => {
    const { error, value } = signupValidation.validate(req.body);
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details })
    }
    try {
        const user = await User.findOne({ email: value.email });
        if (user) {
            return res
                .json({ message: [ReasonPhrases.BAD_REQUEST, "User Already exists"] })
                .status(StatusCodes.BAD_REQUEST)
        }
        const tiers1 = await tiers.findOne()
        value["subscription_id"] = {
            Basic: {
                id: ""
            },
            Premium: {
                id: ""
            },
            Elite: {
                id: ""
            }
        }
        for (x of tiers1.data) {
            const response = await razorpay.subscriptions.create({
                plan_id: x.rzr_plan_id,
                total_count: 12,
                "notes": {
                    "email": value.email,
                }
            })
            value.subscription_id[x.title].id = response.id
        }
        const newUser = await User.create(value);
        const token = jwt.sign({
            id: newUser._id,
        }, "lahfo;aiwyADAD1082471902pue;/ADLJKAKSj;dlSd");
        newUser.password = undefined;
        return res
            .status(StatusCodes.OK)
            .json({ message: ReasonPhrases.OK, result: newUser, token: token });
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}

exports.login = async (req, res) => {
    const { error, value } = loginValidation.validate(req.body);
    if (error) {
        return res.json({ error: error.details }).status(StatusCodes.BAD_REQUEST)
    }
    try {
        const user = await User.findOne({ email: value.email });
        if (!user) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: [ReasonPhrases.BAD_REQUEST, "Invalid Credentials "] });
        }
        if (!user.comparePassword(value.password)) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: [ReasonPhrases.BAD_REQUEST, "Invalid Credentials "] });
        }
        const token = jwt.sign({
            id: user._id,
        }, "lahfo;aiwyADAD1082471902pue;/ADLJKAKSj;dlSd");
        user.password = undefined;
        return res
            .status(StatusCodes.OK)
            .json({ message: ReasonPhrases.OK, result: user, token: token });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}

exports.getUser = async (req, res) => {
    try {
        req.user.password = undefined;
        return res
            .status(StatusCodes.OK)
            .json({ message: ReasonPhrases.OK, result: req.user });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}

exports.generateOTP = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.
                status(StatusCodes.CONFLICT)
                .json({ error: [ReasonPhrases.CONFLICT, "User Already Exist"] })
        }
        const otp = crypto.randomInt(10000, 99999);
        const token = jwt.sign(
            { otp: otp },
            "190;peD1/lSL2JD0o82dAu7D4;hfaiAawyAdKKSj;lA",
        )
        otpEmailVerification(req.body.email, otp);
        return res.
            status(StatusCodes.OK)
            .json({ message: ReasonPhrases.OK, token: token })

    } catch (error) {
        console.log(error)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}

exports.verifyOTP = (req, res) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: [ReasonPhrases.UNAUTHORIZED, "User not logged In"] });
        }
        const decodedData = jwt.verify(token, "190;peD1/lSL2JD0o82dAu7D4;hfaiAawyAdKKSj;lA");
        if (Number(decodedData.otp) === Number(req.body.otp)) {
            return res
                .status(StatusCodes.OK)
                .json({ message: ReasonPhrases.OK });
        } else {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: [ReasonPhrases.UNAUTHORIZED, "otp is invaid"] });
        }
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}


exports.update = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true }, (error, user) => {
            if (error) {
                return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
            } else {
                return res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    result: {
                        name: user.name,
                        email: user.email,
                        plan: user.plan,
                        stocks: user.stocks,
                        mobile: user.mobile,
                        subscription_id: user.subscription_id
                    },
                });
            }
        })

    } catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}


exports.addstock = async (req, res) => {
    try {
        if (req.user.max_stocks == undefined || req.user.max_stocks == null) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST })
        }
        if (req.user.max_stocks !== req.user.stocks.length && !(req.user.stocks.find((stock) => stock.name === req.body.name))) {
            const data = await API.get(`/live/${req.body.name}`);

            if (data.data) {
                req.user.stocks.push({
                    "name": req.body.name,
                    "CompanyName": req.body.CompanyName,
                    "delta": req.body.delta,
                    "save": data.data.current,
                    "assetClass": req.body.assetClass,
                });

                await User.findByIdAndUpdate(req.user._id, { ...req.user }, { new: true }, (error, user) => {
                    if (error) {
                        return res
                            .status(StatusCodes.INTERNAL_SERVER_ERROR)
                            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
                    }
                    else {
                        return res.status(StatusCodes.OK).json({
                            message: ReasonPhrases.OK,
                            result: {
                                name: user.name,
                                email: user.email,
                                plan: user.plan,
                                stocks: user.stocks,
                                mobile: user.mobile,
                            },
                        });
                    }
                })
            }
        }
        else {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST })
        }

    } catch (error) {

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}

exports.deletestock = async (req, res) => {
    try {
        const stock = req.user.stocks.find((stock) => stock.name === req.params.ticker)
        if (!stock) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND })
        }
        else {
            req.user.stocks = req.user.stocks.filter((stock) => stock.name !== req.params.ticker)

            await User.findByIdAndUpdate(req.user._id, { ...req.user }, { new: true }, (error, user) => {
                if (error) {
                    return res
                        .status(StatusCodes.INTERNAL_SERVER_ERROR)
                        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
                }
                else {
                    return res.status(StatusCodes.OK).json({
                        message: ReasonPhrases.OK,
                        result: {
                            name: user.name,
                            email: user.email,
                            plan: user.plan,
                            stocks: user.stocks,
                            mobile: user.mobile,
                        },
                    });
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}