'use strict'
const jwt = require('jwt-simple'),
      moment = require('moment');
var secret = 'clave_secreta';

exports.ensureAuth = function(req, res, next){
    let payload;
    if (!req.headers.authorization) {
        return res.status(403).send({message:'La peticion no tiene la cabecera de auntenticacion'});
    }   

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        let payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({message:'El token expiro'});
        }
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message:'Token no valido'});
    }

    req.user = payload;
    next();
};