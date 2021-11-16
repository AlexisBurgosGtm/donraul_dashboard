var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const execute = require('./router/connection');

var routerISC = require('./router/routerISC');
var routerUsers = require('./router/routerUsers');
var routerVentas = require('./router/routerVentas');
var routerClientes = require('./router/routerClientes');
var routerSupervisor = require('./router/routerSupervisor');
var routerapi = require('./router/routerapi');
var routerEmpleados = require('./router/routerEmpleados');
var routerTipoDocs = require('./router/routerTipoDocs');
var routerCotizaciones = require('./router/routerCotizaciones');
var routerFinca = require('./router/routerFinca');

var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 4100;

app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  /*
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
        // Set to true if you need the website to include cookies in the requests sent
      res.setHeader('Access-Control-Allow-Credentials', true);
*/
  console.log("/" + req.toString());
  next();
});

app.get("/",function(req,res){
  execute.start();
	res.sendFile(path + 'index.html');
}); 

app.get("/api/index",function(req,res){
  
	res.sendFile(path + '/APP/VENTAS/index.html');
}); 

//Router para ISC
app.use('/reports', routerISC);


//Router para FINCA
app.use('/finca', routerFinca);


//Router para SUPERVISOR
app.use('/supervisor', routerSupervisor);

//Router para app VENTAS
app.use('/ventas', routerVentas);

//Router para app CLIENTES
app.use('/clientes', routerClientes);

//Router para usuarios
app.use('/usuarios', routerUsers);

//Router de las solicitudes a APP DE VENTAS
app.use('/api', routerapi);

//Router de las solicitudes a EMPLEADOS
app.use('/empleados', routerEmpleados);

// Router para Tipodocumentos
app.use('/tipodocumentos', routerTipoDocs);

// Cotizaciones
app.use('/cotizaciones', routerCotizaciones);


app.use("/",router);

app.use("*",function(req,res){
  res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});


io.on('connection', function(socket){
  
  socket.on('ventas nueva',function(msg,user){
    io.emit('ventas nueva',msg);
  });

  socket.on('solicitudes precio',function(msg,user){
    io.emit('solicitudes precio',msg);
  });

  socket.on('solicitudes precioaprobada',function(msg,user){
    io.emit('solicitudes precioaprobada',msg);
  });

  socket.on('solicitudes preciodenegado',function(msg,user){
    io.emit('solicitudes preciodenegado',msg);
  });

  
  
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

/*
app.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
*/
