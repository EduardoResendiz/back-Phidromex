const express = require('express'),
      usuarioRegistradoModel = require('../models/usuarioLoginModel'),
      app = express();

app.get('/',(req, res) =>{
    usuarioRegistradoModel.find((err, users)=>{
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'No se encontraron los usuarios',
                err
            });
        }
        res.status(200).json({
            users
        });
    });
});

app.post('/create', (req, res) =>{
    let body = req.body;
    let newUser = {
        email: body.email,
        password: body.password,
        nombre: body.nombre,
        apellido: body.apellido,
        fecha: body.fecha
    };
    usuarioRegistradoModel.create(newUser, (err, users) =>{
        if (err) {
            res.status(400).json({
                ok:false,
                message:'No se pudo registrar el usuario',
                err
            })
        }
        res.status(200).json({
            users
        });
    });
});

app.get('/:id', (req, res) =>{
    let id = req.params.id;
    usuarioRegistradoModel.findById(id, (err, newFindUser) =>{
        if (err) {
          res.status(404).json({
              ok:false,
              message: `no se encotro la tienda ${id}`,
              err
          });  
        }
        res.status(200).json({
            newFindUser
        });
    });
});

module.exports = app;