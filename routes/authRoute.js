const express = require('express'),
      { verificarToken } = require('../server/middlewares/auth'),
      app = express();

Router.get('/', [verificarToken], (req, res) =>{
    return res.status(200).json({
        user: req.user
    });
});

module.exports = app;