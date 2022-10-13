const {Character,Movie,Genere} = require('../db.js');
const { Router } = require('express');
const { Op } = require('sequelize');

const getDbInfo=async()=>{
    return await Movie.findAll({
        include:{
            model: Character,
            attributes: ['name'],
            through: {
                attributes: []
            },
        }
    })
};
//Listado de Películas
const getMovies = async (req, res) => {
    const movies = await Movie.findAll();

    const filter=movies.map((e)=>{return {title:e.title, picture:e.picture,creationdate:e.creationdate}});
    res.status(200).json(filter);
    }
   // Detalle de Película / Serie con sus personajes
const detailsMovieCharacter = async (req, res) => {
    const movies = await getDbInfo ();
    const filter=movies.map((e)=>{return {title:e.title, picture:e.picture,creationdate:e.creationdate,rating:e.rating,character:e.characters.map((e=>e.name))}});
    res.status(200).json(filter);
    };

    //Creación, Edición y Eliminación de Película / Serie
const postMovie = async (req, res) => {
    const {title,creationdate,rating,picture,character}=req.body;
    try {
        const dog = await Movie.create(req.body)

        let tempDb = await Character.findAll({
            where: {id : character}
        })

        await dog.addCharacter(character)

        return res
            .status(201)
            .send({msg: "movie created",})
        } catch (error) {
        console.log(error)
        }
    };

    const deleteMovie = async (req, res) => {
        const {id} = req.params;
        const movie = await Movie.findByPk(id);
        if(!movie){
            return res.status(404).send({msg: "movie not found"})}
        await movie.destroy();
        res.status(200).send({msg: "movie deleted"})
    };

const putMovie = async (req, res) => {
    const {id} = req.params;
    const {title,creationdate,rating,picture}=req.body;
    const movie = await Movie.update({title,creationdate,rating,picture},{where:{id}});
    res.status(200).send({msg: "movie updated"});
    };
    
const filter = async (req, res) => {
    //let{genere}
    let {genereId,sort,search } = req.query;
    //let { search } = req.params;

    if(search === undefined){
        res.status(400).json({ error: 'Debe ingresar un termino de busqueda'})
    }else{
        search = search.toLowerCase();
        if(!genereId){
            const moviesFound = await Movie.findAll({
                
                where: { 
                    title: {[Op.like]: '%' + search + '%'}
                }
            })
            if(moviesFound.length === 0){
                res.json({search: search})
            }else{
                res.json(moviesFound)
                console.log(moviesFound)
            }
        }

        if(genereId){
            const moviesFound = await Movie.findAll({ 
                include: {
                    model: Genere,
                    attributes: ['id', 'name'] ,
                    where: {
                        id: {[Op.eq]: genereId}
                    }
                },
                


                where: {
                    title: { [Op.like]: '%' + search + '%'}
                },
                // where: {
                //     [Op.and]: {
                //         title: { [Op.like]: '%' + search + '%'},
                //         genereId: { [Op.like]: '%' + genereId + '%'}
                //     }
                // },
                order: [['creationdate', typeof sort === "undefined" ? "ASC" : sort ]]
            })
            if(moviesFound.length === 0){
                res.status(204).json({msg: 'No results'})
            }else{
                res.json(moviesFound)
            }
        }

 
        } 

        }



    

module.exports = {
    getMovies,
    detailsMovieCharacter,
    postMovie,
    deleteMovie,
    putMovie,
    filter

};