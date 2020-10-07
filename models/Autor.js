var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const autorSchema = new Schema({
    nombre: String,
    biografia: String,
    nacionalidad: String
})

module.exports = mongoose.model('Autor', autorSchema);