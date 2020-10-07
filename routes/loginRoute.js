const express = require('express'),
      usuarioLoginModel = require('../models/usuarioLoginModel'),
      jwt = require('jsonwebtoken'),
      app = express();

app.post('/',(req, res) =>{
    let body = req.body;
    usuarioLoginModel.findOne({email: body.email}, (err, usuarioEncontrado) =>{
        if (err) {
            return res.status(400).json({
                err
            });
        }
        if(!usuarioEncontrado) {
          return res.status(400).json({
              message:'El usuario que ingreso es incorrecto'
          })  
        }
        if (usuarioEncontrado.password != body.password) {
            return res.status(400).json({
                message: 'La contraseña es incorrecta'
            });
        }
        let token = jwt.sign({
            user: usuarioEncontrado
        },
        process.env.SEED,
        {
            expiresIn: process.env.CADUCIDAD_TOKEN
        }
        );
        res.status(200).json({
            token,
            usuarioEncontrado
        });
    });
});
module.exports = app;