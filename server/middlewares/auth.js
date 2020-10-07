//Verificar el token
const jwt = require('jsonwebtoken');
function verificarToken(req, res, next){
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded) =>{
        if(err){
            return res.json({
                err
            });
            req.user = decoded; //decodifica la codificacion del token
            next();
        }
    })
}

module.exports = {verificarToken};
