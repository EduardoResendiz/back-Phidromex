const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const licenciaSchema = new Schema({
    title: {type:String},
    description: {type: String},
    filename: {type: String},
    path:{type: String},
    originalname:{type: String},
    mimetype:{type: String},
    size:{type: Number},
    created_at:{type: Date, default: Date.now()},
    IdChofer:{
        type: Schema.ObjectId,
        ref:"IdChofer"
    }
});

module.exports = mongoose.model('licenciaOperador', licenciaSchema);
