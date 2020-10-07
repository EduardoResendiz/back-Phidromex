const mongoose = require('mongoose');

const nominacionSchema = new mongoose.Schema({
    nombre:{
        type: String
    },
    apellidos:{
        type:String
    },
    telefono:{
        type:String
    },
    licencia:{
        type:String
    },
    nTracto:{
        type:String
    },
    placaTracto:{
        type:String
    },
    tipo:{
        type:String
    },
    placas1:{
        type:String
    },
    placas2:{
        type:String
    },
    capacidad1:{
        type:String
    },
    capacidad2:{
        type:String
    },
    nEco1:{
        type:String
    },
    nEco2:{
        type:String
    },
    estacion:{
        type:String
    },
    rfc:{
        type:String
    },
    direccion:{
        type:String
    },
    cre:{
        type:String
    }
});

module.exports = mongoose.model('Nominacion', nominacionSchema);