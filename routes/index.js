const { Router } = require('express');
const router = Router();
//const verifyToken = require('../middlewares/authenticate');


  router.use(require('./user.js'));
 router.use(require('./character.js'));
  router.use(require('./movie.js'));
// router.use(require('./Bills.js'));
// router.use(require('./Orders.js'));
// router.use(require('./Reviews.js'));

module.exports = router;
