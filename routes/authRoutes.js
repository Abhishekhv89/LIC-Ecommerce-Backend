const express = require('express')
const router = express.Router()
const cors = require("cors");
const {registerUser,loginUser,getProfile} = require('../controllers/authControllers')

const requireAuth = require('../middleware/requireAuth');



router.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));
// router.use(requireAuth)


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',requireAuth,getProfile)

module.exports = router