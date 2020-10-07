const express = require('express'),
      nominacionModel = require('../models/nominacionModel'),
      app = express();

    //POST
app.post('/create', (req,res) =>{
    let body = req.body;
    let newData = {
        nombre:body.nombre,
        apellidos:body.apellidos,
        telefono:body.telefono,
        licencia:body.licencia,
        nTracto:body.nTracto,
        placaTracto:body.placaTracto,
        tipo:body.tipo,
        placas1:body.placas1,
        placas2:body.placas2,
        capacidad1:body.capacidad1,
        capacidad2:body.capacidad2,
        nEco1:body.nEco1,
        nEco2:body.nEco2,
        estacion:body.estacion,
        rfc:body.rfc,
        direccion:body.direccion,
        cre:body.cre
    };

    nominacionModel.create(newData, (err, nominacion) =>{
        if (err) {
            res.status(400).json({
                ok:false,
                message:'No se pudo registrar los datos',
                err
            })
        }
        res.status(200).json({
            nominacion
        });
    });
});
    //GET
app.get('/', (req, res) =>{
    nominacionModel.find((err, nominacion) =>{
        if (err) {
            res.status(400).json({
                ok: false,
                message:'No se pudo consultar Nominacion',
                err
            });
        }
        res.status(200).json({
            nominacion
        });
    });
});
    //GET ID
app.get('/:id', (req, res) =>{
    let: id = req.params.id;

    nominacionModel.findById(id, (err, newFindNominacion) =>{
        if (err) {
            res.status(404).json({
                ok:false,
                message:`no se encontro los datos con el id ${id}`,
                err
            });
        }

        res.status(200).json({
            newFindNominacion
        });
    });
});
    //UPDATE
app.put('/:id', (req, res) =>{
    let id = req.params.id;
    let body = req.body;

    nominacionModel.findById(id, (err, newNominacion) =>{
        if (err) {
            return res.status(400).json({
                ok: true,
                message: `No se encontro el id ${id}`,
                err
            });
        }

        if (!newNominacion) {
            return res.status(500).json({
                ok:true,
                message: `No existe la nominacion con el id ${id}`,
            });
        }
        newNominacion.nombre= body.nombre,
        newNominacion.apellidos= body.apellidos,
        newNominacion.telefono= body.telefono,
        newNominacion.licencia= body.licencia,
        newNominacion.nTracto= body.nTracto,
        newNominacion.placaTracto= body.placaTracto,
        newNominacion.tipo= body.tipo,
        newNominacion.placas1= body.placas1,
        newNominacion.placas2= body.placas2,
        newNominacion.capacidad1= body.capacidad1,
        newNominacion.capacidad2= body.capacidad2,
        newNominacion.nEco1= body.nEco1,
        newNominacion.nEco2= body.nEco2,
        newNominacion.estacion= body.estacion,
        newNominacion.rfc= body.rfc,
        newNominacion.direccion= body.direccion,
        newNominacion.cre= body.cre

        newNominacion.save((err, nominacionActualizada) =>{
            if (err) {
                return res.status(400).json({
                   ok: false,
                   message:'Error al actualizar'
                });
            }
            return res.status(200).json({
                nominacionActualizada
            });
        });
    });
});
    //DELETE ID
app.delete('/:id',(req, res) =>{
    let id = req.params.id;
    nominacionModel.findByIdAndRemove(id, (err,nominacionDelete) =>{
        if (err) {
            return res.status(400).json({
                ok:false,
                message: 'No se pudo borrar ',
                err
            });
        }
        if(!nominacionDelete){
            return res.status(400).json({
                ok:false,
                message:'No se pudo borrar la imagen',
                err
            });
        }
        res.status(200).json({
            nominacionDelete
        });
    });
})

module.exports = app;