const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//var Autor = mongoose.model('Autor')

const nominacionSchema = new mongoose.Schema({
    titulo: String,
    paginas:String,
    autor:{
        type: mongoose.Schema.ObjectId,
        ref: "Autor"
    }
});

module.exports = mongoose.model('Libro',nominacionSchema);