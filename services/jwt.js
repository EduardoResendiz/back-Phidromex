'use strict'
const jwt = require('jwt-simple'),
      moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = (user) =>{
    let payload ={
        sub: user._id,
        email : user.email,
        password : user.password,
        nombre : user.nombre,
        apellido : user.apellido,
        fecha : user.fecha,
        role : user.role,
        image : user.image,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix
    };

    return jwt.encode(payload, secret);
};

