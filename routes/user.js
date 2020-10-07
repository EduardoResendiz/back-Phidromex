'use strict'
const express = require('express'),
      multipart = require('connect-multiparty'),
      userController = require('../controllers/user'),
      md_uploadAvatar = multipart({uploadDir: '../uploads/users'}) ,
      md_auth = require('../server/middlewares/authen');
const user = require('../controllers/user');

var api = express.Router();

api.get('/probando-controlador',md_auth.ensureAuth, userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,userController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_uploadAvatar],userController.uploadImage);
//api.put('/update-user/:id',userController.updateUser);

module.exports = api;