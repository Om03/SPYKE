const {
    headlines,
    long,
    short,
    marketmovers,
    home,
    stockInternalData,
    liveStock
} = require("../controllers/authroutes");

const router = require("express").Router();
const auth = require('../middleware/auth')
router.get('/news/:req', auth, headlines);
router.get('/long', auth, long);
router.post('/short', auth, short)
router.get('/market-movers', auth, marketmovers);
router.get('/home', auth, home);
router.get("/histdata/:time/:ticker", stockInternalData)
router.get('/liveStock/:ticker', liveStock);
module.exports = router;
