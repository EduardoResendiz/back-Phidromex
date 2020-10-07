const express = require('express'),
      autor = require('../models/Autor'),
      app = express();

app.get('/',(req, res) =>{
    autor.find((err, autores) =>{
        if (err) {
            res.status(400).json({
                ok:false,
                message: 'No se encontro',
                err
            });
        }
        res.status(200).json({
            autores
        });
    });
});

app.post('/create', (req, res) =>{
    let body = req.body;
    let newAutor = {
        nombre: body.nombre,
        biografia: body.biografia,
        nacionalidad: body.nacionalidad
    };

    autor.create(newAutor, (err, autores) =>{
        if (err) {
            res.status(400).json({
                ok:false,
                message:'No se pudo registrar el autor',
                err
            })
        }
        res.status(200).json({
            autores
        });
    })
})
module.exports = app;