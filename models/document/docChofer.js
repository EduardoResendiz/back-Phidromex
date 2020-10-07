const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const nominacionModel = mongoose.model('nominacionModel');

const docChoferSchema = new Schema({
    licencia: String,
    imss: String,
    tarjetaCirculacion: String,
    polizaSeguroTracto: String,
    polizaSeguroTanques: String,
    choferID:{
        type: mongoose.Schema.ObjectId,
        ref: "registroNominacionMohhdel"
    }
});

module.exports = mongoose.model('docChofer', docChoferSchema);