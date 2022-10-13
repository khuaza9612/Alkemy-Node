const {User} = require('../db.js');
const { Router } = require('express');
const sequelize = require('../db');
const {bcrypt} = require("bcrypt");
const generarTokenID=require('../utils/generarTokenUser.js');
const {createSendToken}=require('./authcontroller')
const {sendEmail,}=require('../utils/email.js');
/*Para realizar peticiones a los endpoints subsiguientes el usuario deberá contar con un token que
obtendrá al autenticarse. Para ello, deberán desarrollarse los endpoints de registro y login, que
permitan obtener el token.*/
const createUser=async(req,res)=>{
    const {name,lastName,email,image,password,passConfirmation,rol,isBlocked,clave}=req.body;
    const use=await User.findOne({where:{email}});
    const comprePass=(a,b)=>{
        if(a===b){
            return true;
        }
        return false;
    };
    if(use){
        return res.status(400).json({msg:'User already exists'});
    }else if(!comprePass(password,passConfirmation)){
        return res.status(400).json({msg:'Password does not match'});
    }

    const beforeCreate=async(user)=>{
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password,salt);
        user.passConfirmation=user.password;}
    const newUser=await User.create({name,lastName,email,image,password,passConfirmation,rol,isBlocked:"false",clave:generarTokenID()});
    const createdUser = newUser.dataValues;

  sendEmail({
     
      name: newUser.nombre,
      email: newUser.email,
     
    });
  
  return createSendToken(newUser, 201, res);

};

    module.exports={
        createUser
    };