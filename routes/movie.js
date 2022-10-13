const {Router}=require('express');
const router=Router();
    
const {getMovies,detailsMovieCharacter,postMovie,putMovie,deleteMovie,filter} = require('../Controller/moviecontroller');
const verifyToken=require('../middlewares/authenticate');

router.get('/movies',verifyToken.ensureAuth,getMovies);

router.delete('/movies/:id',verifyToken.ensureAuth,deleteMovie);

router.put('/movies/:id',verifyToken.ensureAuth,putMovie);

router.get('/moviesdetails',verifyToken.ensureAuth,detailsMovieCharacter);
router.post('/movies',verifyToken.ensureAuth,postMovie);
router.get('/filte',verifyToken.ensureAuth,filter);
module.exports = router;
