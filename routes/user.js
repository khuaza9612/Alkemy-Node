const {Router}=require('express');
const router=Router();
const {createUser}=require('../Controller/usercontroller.js');
const {login}=require('../Controller/authcontroller.js');
//const verifyToken=require('../middlewares/authenticate');


router.post('/user',createUser);

router.post('/login',login);

module.exports = router;