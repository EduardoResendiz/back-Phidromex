const express = require('express'),
      photo = require('../../models/document/licenciaOperador'),
      nominacion = require('../../models/nominacionModel'),
      multer = require('multer'),
      path = require('path'),
      fs = require('fs'),
      app = express();
      const uuid = require('uuid/v4');

//Storage para leer el fichero ademas agregamos la extencion
const storage = multer.diskStorage({
    destination: path.join('public/uploads/licenciaOperador'),
    filename: (req, file, cb) =>{
        cb(null, uuid() + path.extname( file.originalname));
    }
});
//Settings
app.set('Views', path.join(__dirname,'views'));
app.set('View engine', 'ejs');

//Middlewares
app.use(multer({storage}).single('myfile'));

app.post('/create', (req, res) =>{
    let body = req.body;
    let file = req.file;
        
    let newPhoto ={
        title: body.title,
        description: body.description,
        filename: file.filename,
        path: 'public/uploads/Elemento1/photos/' + req.file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        IdChofer:body.IdChofer
    };


    photo.create(newPhoto, (err, image) =>{
        if (err) {
            res.status(404).json({
                ok:false,
                message: ' Error al subir la imagen'
            })
        }
        res.json({
            ok:true,
            image
        })
    })

});

app.get('/', (req, res) =>{
    photo.find({},(err,photos)=>{
        nominacion.populate(photos, {path:"IdChofer"}, (err, photos) =>{
            res.status(200).send(photos);
        });
    });
});

app.get('/:id', (req, res)=>{
    let id = req.params.id;
    photo.findById(id,(err, photos) =>{
        if (err) {
            res.status(404).json({
                ok:false,
                message:`no se encontro los datos con el id ${id}`,
                err
            });
        }
        nominacion.populate(photos, {path:"IdChofer"}, (err, photos) =>{
            res.status(200).send(photos);
        });

    });
});

module.exports = app;