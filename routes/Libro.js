const express = require('express'),
      Libro = require('../models/Libro'),
      Autor = require('../models/Autor'),
      app = express();

app.get('/',(req, res) =>{
    Libro.find((err, libros)=>{
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'No se encontraron los Libros',
                err
            });
        }
        res.status(200).json({
            libros
        });
    });
});

app.post('/create', (req, res) =>{
    let body = req.body;
    let newLibro = {
        titulo: body.titulo,
        paginas:body.paginas,
        autor:body.autor
    };
    Libro.create(newLibro, (err, libros) =>{
        if (err) {
            res.status(400).json({
                ok:false,
                message:'No se pudo registrar el libro',
                err
            })
        }
        res.status(200).json({
            libros
        });
    });
});

app.get('/libros', (req, res)=>{
    Libro.find({},(err,libros)=>{
        Autor.populate(libros,{path:"autor"},(err,libros)=>{
            res.status(200).send(libros);
        });
    });
});
module.exports = app;