const {Character,Movie} = require('../db.js');
const { Router } = require('express');
const sequelize = require('../db');
const { Op } = require('sequelize');

const getDbInfo=async()=>{
    return await Character.findAll({
        include:{
            model: Movie,
            attributes: ['title'],
            through: {
                attributes: []
            },
        }
    })
};
/* El listado deberá mostrar:
● Imagen.
● Nombre.*/
const getCharacters = async (req, res) => {
    const characters = await getDbInfo ();
    const filter=characters.map((e)=>{return {name:e.name, picture:e.picture}});
    
    res.status(200).json(filter);
   
    };

const postCharacter = async (req, res) => {
    const {name,age,weight,history,picture,movie}=req.body;
    try {
        const dog = await Character.create(req.body)
    
        let tempDb = await Movie.findAll({
          where: {id : movie}
        })
    
        await dog.addMovie(movie)
    
        return res
          .status(201)
          .send({msg: "character created",})
      } catch (error) {
        console.log(error)
      }
    };
const putCharacter = async (req, res) => {
    const {id}=req.params;
    const {name,age,weight,history,picture}=req.body;
    const character = await Character.update({name,age,weight,history,picture},{where:{id}});
    res.status(200).json({msg:'Character updated'});
    };
const deleteCharacter = async (req, res) => {
    const {id}=req.params;
    const character = await Character.destroy({where:{id}});
    res.status(200).json({msg:'Character deleted'});
    };
   // Detalle de Personaje
const detailsCharacter = async (req, res) => {
    const characters = await getDbInfo ();
    const filter=characters.map((e)=>{return {name:e.name, picture:e.picture,age:e.age,weight:e.weight,history:e.history,movie:e.movies.map((e=>e.title))}});
    
    res.status(200).json(filter);
   
    };
// Búsqueda de Personajes
const filterCharacter = async (req, res) => {
    let { age, weight, movieId } = req.query;
    let { search } = req.params;
    if(search === undefined){
        res.status(400).json({ error: "Debe ingresar un termino de busqueda"})
    }else{
        search = search.toLowerCase();
        if(!age && !weight && !movieId){
            const characterFound = await Character.findAll({ 
                include: {
                    model: Movie,
                    
                    attributes: ['title', 'id']
                },
                where: {
                    name: { [Op.like]: '%' + search + '%'}
                },
            })
            if(characterFound.length === 0){
                res.status(204).json({msg: 'No results'})
            }else{
                res.json(characterFound)
            }
        }
    }

    if(movieId){
        const characterFound = await Character.findAll({ 
            include: {
                model: Movie,
              
                attributes: ['title', 'id'],
                where: {
                    id: {[Op.eq]: movieId}
                }
            },
            where: {
                name: { [Op.like]: '%' + search + '%'}
            }
        })
        if(characterFound.length === 0){
            res.status(204).json({msg: 'No results'})
        }else{
            res.json(characterFound)
        }
    }

    if(weight){
        const characterFound = await Character.findAll({ where: {
            [Op.and]: [
                { name: {[Op.like]: '%' + search + '%'}}, 
                { weight: {[Op.eq]: weight}}
            ]},
        })
        if(characterFound.length === 0){
            res.status(204).json({msg: 'No results'})
        }else{
            res.json(characterFound)
        }
    }

    if(age){
        const characterFound = await Character.findAll({ where: {
            [Op.and]: [{ name: {[Op.like]: '%' + search + '%'}}, {age: {[Op.eq]: age}}]
            },
        })
        if(characterFound.length === 0){
            res.status(204).json({msg: 'No results'})
        }else{
            res.json(characterFound)
            console.log(characterFound)
        }
    }
}

    
   
    





module.exports = {
    getCharacters,
    
    postCharacter,
    putCharacter,
    deleteCharacter,
    detailsCharacter,
    filterCharacter
};