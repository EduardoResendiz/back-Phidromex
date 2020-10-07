const express = require('express'),
      docChofer = require('../../models/document/docChofer'),
      nominacion = require('../../models/nominacionModel'),
      app = express();

app.get('/',(req, res) =>{
    docChofer.find((err, registroNominacion) =>{
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'No se encontraron los registros',
                err
            });
        }
        res.status(200).json({
            registroNominacion
        });
    });
});

app.post('/create', (req, res) =>{
    let body = req.body;
    let newDocs = {
        licencia: body.licencia,
        imss: body.imss,
        tarjetaCirculacion: body.tarjetaCirculacion,
        polizaSeguroTracto: body.polizaSeguroTracto,
        polizaSeguroTanques: body.polizaSeguroTanques,
        choferID: body.choferID
    };
    docChofer.create(newDocs, (err, documents) =>{
        if (err) {
            res.status(400).json({
                ok:false,
                message:'No se pudo registrar el libro',
                err
            })
        }
        res.status(200).json({
            documents
        });
    });
});

app.get('/nominacion', (req, res)=>{
    docChofer.find({}, (err, datos) =>{
        nominacion.populate(datos,{path:'choferID'},(err, datos) =>{
            res.status(200).send(datos);
        });
    });
});
module.exports = app;