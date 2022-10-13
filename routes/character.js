const {Router}=require('express');
const router=Router();
const {getCharacters,
   
    postCharacter,
    putCharacter,
    deleteCharacter,
    detailsCharacter,filterCharacter}=require('../Controller/charactercontroller');
const verifyToken=require('../middlewares/authenticate');

router.get('/characters',verifyToken.ensureAuth,getCharacters);

router.post('/character',verifyToken.ensureAuth,postCharacter);
router.put('/character/:id',verifyToken.ensureAuth,putCharacter);
router.delete('/character/:id',verifyToken.ensureAuth,deleteCharacter);
router.get('/detail',verifyToken.ensureAuth,detailsCharacter);
router.get('/filter/:search',verifyToken.ensureAuth,filterCharacter);



module.exports = router;