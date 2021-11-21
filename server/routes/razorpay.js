const {
    paymentVerification
} = require("../controllers/razorpay");

const router = require("express").Router();

router.post("/paymentVerification", paymentVerification);

module.exports = router;