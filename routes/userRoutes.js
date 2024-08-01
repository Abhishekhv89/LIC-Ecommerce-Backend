const express = require('express')
const router = express.Router()
const cors = require("cors");
const {registerUser,loginUser,dashboard,logout,adminPage,getAllUsers,makeAdmin, getUser, getAdminUsers, removeAdmin, searchUsers} = require('../controllers/userControllers')

const {isAuthenticate,authorizeRoles}= require('../middleware/requireAuth');
const roles = require('../constants');



router.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));
// router.use(requireAuth)


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout)
router.get('/profile',isAuthenticate,dashboard)
router.get('/admin',isAuthenticate,authorizeRoles(roles.admin),adminPage);
router.put('/:userId/makeAdmin',isAuthenticate,authorizeRoles(roles.admin),makeAdmin);
router.put('/:userId/removeAdmin',isAuthenticate,authorizeRoles(roles.admin),removeAdmin);
router.get('/api/search',isAuthenticate,authorizeRoles(roles.admin),searchUsers)

router.get('/',isAuthenticate,authorizeRoles(roles.admin),getAllUsers);
router.get('/adminUsers',isAuthenticate,authorizeRoles(roles.admin),getAdminUsers);

router.route('/:userId')
.get(isAuthenticate,authorizeRoles(roles.admin),getUser);

module.exports = router