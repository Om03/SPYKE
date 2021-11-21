
const { getTiers } = require("../controllers/tiers");

const router = require("express").Router();

router.get("/", getTiers);

module.exports = router;