require('./config/config');
const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      loginRoute = require('../routes/loginRoute'),
      registrarUserRoute = require('../routes/registrarUsuarioRoute'),
      nominacionRoute = require('../routes/nominacionRoute'),
      user_routes = require('../routes/user'),
      autor = require('../routes/Autor'),
      libros = require('../routes/Libro'),
      licenciaOp = require('../routes/document/licenciaOperador'),
      docChofer = require('../routes/document/docChofer'),
      app = express(),
      cors = require('cors');
//Realizamos la conexion a base de datos
mongoose.connect("mongodb://localhost:27017/PortalHidromex",
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(()=>{console.log('Base de datos en linea');})
.catch((err)=>console.log('Error'));

//Inicializamos los Middlewares
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rutas
app.get('/',(req, res) =>{
    res.send('Bienvenido al portal')
}) 

app.use('/user',registrarUserRoute);
app.use('/user/login',loginRoute);
app.use('/nominacion',nominacionRoute);
app.use('/api', user_routes);
app.use('/autor',autor);
app.use('/libros',libros);
app.use('/docChofer', docChofer);
app.use('/licenciaOp', licenciaOp);

//Listen the port
app.listen(process.env.PORT, ()=>{console.log('Vivio el back')})