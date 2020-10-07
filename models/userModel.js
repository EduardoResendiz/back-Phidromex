const mongoose = require('mongoose');

const usuarioLoginSchema = new mongoose.Schema({
    email:{
        type: String,
        //required: true,
        unique: true
    },
    password:{
        type: String,
       // required: true
    },
    nombre:{
        type: String,
        //required: true
    },
    apellido:{
        type: String,
       // required: true
    },
    fecha:{
        type: Date,
        default: Date.now()
    },
    role:{
        type:String
    } ,
    image:{
        type:String
    }
});

module.exports = mongoose.model('Users', usuarioLoginSchema);