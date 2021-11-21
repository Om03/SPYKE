const {
  signup,
  login,
  generateOTP,
  verifyOTP,
  update,
  addstock,
  getUser,
  deletestock
} = require("../controllers/auth");

const auth = require('../middleware/auth')

const router = require("express").Router();

router.post("/sign-up", signup);
router.post("/login", login);
router.get("/get-user", auth, getUser)
router.post('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);
router.post('/update-profile', auth, update);
router.post('/add-stock', auth, addstock);
router.delete('/delete-stock/:ticker', auth, deletestock);

module.exports = router;