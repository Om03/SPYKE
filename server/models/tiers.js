const mongoose = require("mongoose");
const tierSchema = mongoose.Schema({
    data: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model("tiers", tierSchema);
