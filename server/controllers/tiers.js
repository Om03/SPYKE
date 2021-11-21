const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const tier = require("../models/tiers")

exports.getTiers = async (req, res) => {
    try {
        const tiers = await tier.findOne();
        return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, result: tiers.data })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}

