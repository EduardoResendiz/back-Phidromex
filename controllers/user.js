'use strict'
const User = require('../models/userModel'),
      jwt = require('../services/jwt'),
      bcrypt = require('bcrypt-nodejs');

function pruebas(req, res){
    res.status(200).send({
        message:'Probando una accion del controlador de usuarios'
    });
}

function saveUser(req, res){
    let user = new User();
    let params = req.body;

    console.log(params);

    user.email = params.email;
    user.password = params.password;
    user.nombre = params.nombre;
    user.apellido = params.apellido;
    user.fecha = params.fecha;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if (params.password) {
      bcrypt.hash(params.password, null, null, (err, hash)=>{
          user.password = hash;
          if (user.nombre != null && user.apellido != null && user.email != null) {
              //Guardar al usuario
              user.save((err, userStored) =>{
                if (err) {
                    res.status(500).send({message:'Error al guardar el usuario'});
                }else{
                    if (!userStored) {
                        res.status(404).send({message:'No se registro el usuario'});
                    }else{
                        res.status(200).send({user: userStored});
                    }
                }
              });
          }else{
            res.status(200).send({message: 'Rellena todos los campos'});
          }
      });
    }else{
        res.status(500).send({message: 'Introduce la contraseña'});
    }

}

function loginUser(req, res){
    var params = req.body;

    let email = params.email;
    let password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) =>{
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if (!user) {
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                //Comprobar la contraseña
                bcrypt.compare(password, user.password,(err, check)=>{
                    if (check) {
                        //devolver los datos del ususrio logueado
                        if (params.gethash) {
                            //Devolverf token
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no se pudo loguearse'});
                    }
                });
            }
        }
    });
}

function updateUser(req, res){
    let userId = req.params.id;
    let update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) =>{
        if (err) {
            res.status(500).send({message: 'El usuario no se ha podido actualizar'});
        }else{
            if (!userUpdated) {
                res.status(404).send({message:'No se ha podido actualizar'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

function uploadImage( req, res){
    let userId = req.params.id,
        file_name = 'No subido..';
        if (req.files) {
            let file_path = req.files.image.path
            console.log(file_path)
        }else{
            res.status(200).send({message: 'No has subido imagen'});
        }

    // if (req.files) {
    //     let file_path = req.files.image.path,
    //         file_split = file_path.split('\\'),
    //         file_name = file_split[2],
    //         ext_split = file_name.split('\.'),
    //         file_ext = ext_split[1];

    //     if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
    //         User.findByIdAndUpdate(userId, {image: file_name}, (err,userUpdated)=>{
    //             if (!userUpdated) {
    //                 res(404).send({message:'No se actualizo el usuario'});
    //             }else{
    //                 res.status(200).send({user: userUpdated});
    //             }
    //         });
    //     }else{
    //         res.status(200).send({message: 'Extension del archivo no valida'});
    //     }
    // }else{
    //     res.status(200).send({message: 'No has subido imagen'});
    // }
}


module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage
};