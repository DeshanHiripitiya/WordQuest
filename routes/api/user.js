const express = require('express');
const { register_user, login_user, get_all_users, edit_user,delete_user } = require('../../controller/user');
const verifyToken = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register_user);
router.post('/login', login_user);
router.get('/users', verifyToken,get_all_users);
router.put('/user/:id', verifyToken,edit_user);
router.delete('/user/:id',verifyToken, delete_user);

module.exports = router;
