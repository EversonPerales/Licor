const cookieParser = require('cookie-parser');
require('dotenv').config();
var handlebars = require ('express-handlebars')
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha('6Le-zEspAAAAAKBnMLEltJkPi7BaJejSzSQ_p6Ql', '6Le-zEspAAAAAOrp_wdWtdwYHcwTSJ9LBThuvVp3');
const multer = require('multer');
const http = require('http');
const { obtenerDireccionIp} = require('./middleware/direccionIP.js')
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
//app.use(bodyParser.urlencoded({extended: true}));
const path = require('path');
const baseDatos = require('./models/baseDeDatos.js');
const utils = require('./utils/uploadImg.js');
const {verifyToken} = require ('./middleware/JWT.js');
const {verifyToken2} = require('./middleware/JWT2.js');

const {ADMIN,PASSWORD,port,secretKey2} = process.env;
let ext;




//--------------------------------------------------------------
const server = http.createServer(app);

const {Server} = require('socket.io');

const io = new Server(server);

io.on('connection', (socket)=>{
  console.log('Un usuario se ha conectado');
  socket.emit('mensajeServer', 'Hola, cliente');
  socket.on('disconect',()=>{
    console.log('un usuario se ha desconectado');
  });
});





let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads')
  },
  filename: function (req, file, cb) {
    ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + utils.getContentType(ext))
  }
})

let upload = multer({ storage: storage });
//---------------------------------------------------------------

//recursos que se van a cargar en el server 
app.use(express.static(__dirname+'/static'));

//-----------------------------------------------------------------
//Configuración del Servidor
app.set('view engine','ejs');//definimos el motor de plantilla con archivos ejs
app.set('views',path.join(__dirname,"./views"));//definimos la ruta del motor de plantilla
app.use(express.urlencoded({extended:false}));//permite recuperar los valores publicados en un request
app.use(cookieParser());
app.use(express.json());
app.use(obtenerDireccionIp);
const jwt = require('jsonwebtoken');
console.log('Servidor corriendo exitosamente en el puerto 5000');



//-----------------------------------------------------------
//enruptamiento
app.get('/',(req,res)=>{
  res.render('index.ejs')
});

app.get('/login',(req,res)=>{
res.render('iniciarSesion.ejs');
});


app.post('/login',(req,res)=>{

 const {admin,password} = req.body;
 const dato= {
  admin,
  password
 }

   if(admin === ADMIN && password === PASSWORD){
    const token = jwt.sign(dato,secretKey2,{expiresIn:60 * 60 * 24});
    res.cookie('token2', token,{httpOnly: true, secure: true});
    
    res.redirect('/productos');
   }else{
   res.json({ERROR:'Contraseña o usuario incorrecto'})
   }

});
  

app.get('/add',verifyToken2,(req,res)=>{
res.render('add.ejs');
});

//---------------------------------------------------------
app.get('/addImagen/:id',verifyToken2 ,(req,res)=>{
baseDatos.getImagen(req,res);
});


app.post('/addImagen/:id',upload.single('img'),(req,res)=>{ 
baseDatos.aggIMG(req,res);
});


app.post('/addPost',(req,res)=>{   
baseDatos.aggDato(req,res);
});


app.get('/productos',verifyToken2,(req,res)=>{
  baseDatos.mostrarProductos(req,res);
});
//-------------------------------------------------------
// GET /editar/:id
app.get('/update/:id',verifyToken2,(req, res) => {
baseDatos.mostrarUpdate(req,res);

});
//-------------------------------------------------------
// POST /editar/:id
app.post('/update/:id', (req, res) => {
 baseDatos.update(req,res);
});
//-------------------------------------------------------
// GET /eliminar/:id
app.get('/delete/:id',verifyToken2, (req, res) => {
 baseDatos.mostrarDelete(req,res);
});
//-------------------------------------------------------
// POST /eliminar/:id
app.post('/delete/:id', (req, res) => {
 baseDatos.deletee(req,res);
});
//------------------------------------------------------
app.get('/categorias',verifyToken2, (req, res) => {
 baseDatos.getCategorias(req,res);
});
//-------------------------------------------------------
app.get('/addCategorias',verifyToken2, (req, res) => {
 res.render('addcategoria.ejs');
});
//-------------------------------------------------------
app.post('/addcategorias', (req, res) => {
 baseDatos.postCategorias(req,res);
});
//-------------------------------------------------------
app.get('/updateCategoria/:id',verifyToken2,(req,res)=>{
 baseDatos.mostrarUpdateC(req,res);
});
//-------------------------------------------------------
app.post('/updateCategoria/:id',(req,res)=>{
baseDatos.updateCateg(req,res);
});
//-------------------------------------------------------
app.get('/eliminarCategoria/:id',verifyToken2,(req,res)=>{
  baseDatos.deleteCategoriaGET(req,res);
 });
//-------------------------------------------------------
app.get('/clientes',verifyToken,(req,res)=>{
  console.log('mostrando pagina la cliente!');
baseDatos.ClientesGET(req,res);
})
//-------------------------------------------------------

//-------------------------------------------------------
app.post('/cliente', (req, res) => {
  baseDatos.filtrar(req,res);
 });
//-------------------------------------------------------
app.get('/clientico', (req, res) => {
 baseDatos.filtrar2(req,res);
});
//-------------------------------------------------------
app.get('/detalles/:id',(req,res)=>{
  baseDatos.detalles(req,res);
  });
  //-------------------------------------------------------
  app.get('/ruta', (req, res) => {
    const {nombre,codigo,precio,descripcion,calidad,cantidad,url,id} = req.query;
  
    let datos = {
      nombre:nombre,
      codigo:codigo,
      precio:precio,
      descripcion:descripcion,
      calidad:calidad,
      cantidad:cantidad,
      url:url,
      id:id
    }
   
    console.log(datos,'Valor de Busqueda--por fin');
    res.render('buscar.ejs',{result:datos});
  
  });
//-------------------------------------------------------
app.get('/loginUsers',(req,res)=>{
  baseDatos.loginUsers(req,res);
  });
  //-------------------------------------------------------
app.post('/loginUsers',(req,res)=>{
  baseDatos.postLoginCliente(req,res);
  });
  //-------------------------------------------------------
  app.get('/registroUsers',(req,res)=>{
    baseDatos.registroUsers(req,res);
    });
//-------------------------------------------------------
app.post('/registroUsuariosPost',recaptcha.middleware.verify, (req, res) => {
  

  if(!req.recaptcha.error){
    baseDatos.registroUsuariosPost(req,res);

  } else{
    res.send('Debes validar el recaptcha');
  }
 });
//-------------------------------------------------------
app.get('/comprar/:id',obtenerDireccionIp,verifyToken,(req,res)=>{
  res.clearCookie('transaction');
  baseDatos.comprar(req,res);
  });
//-------------------------------------------------------
app.post('/comprarPost',async(req,res)=>{
  baseDatos.comprarPOST(req,res);
});
//-------------------------------------------------------
app.get('/transaction',(req,res)=>{
  const transaction = req.cookies.transaccion;
  console.log('transaction desde controllers',transaction);
  res.json(transaction);


  });
//-------------------------------------------------------

app.get('/eliminarTransaction',(req,res)=>{
  res.clearCookie('transaccion');
  res.json({message:'transaccion eliminada'})
  });
  //-------------------------------------------------------

app.get('/usuarios',(req,res)=>{
  baseDatos.mostrarUsers(req,res);
  });
//-------------------------------------------------------

  app.get('/compras',(req,res)=>{
    baseDatos.MostrarCompras(req,res);
    });
//-------------------------------------------------------

app.get('/addUser',(req,res)=>{
  baseDatos.addUser(req,res);
  });
//-------------------------------------------------------
app.post('/addUser',async(req,res)=>{
  baseDatos.addUserPOST(req,res);
});

//-------------------------------------------------------

app.get('/updateUser/:id',(req,res)=>{
  baseDatos.updateUser(req,res);
  })
  //------------------------------------------------------
  app.post('/updateUser/:id',(req,res)=>{
  baseDatos.updateUserPOST(req,res);
  })
//-------------------------------------------------------

app.get('/deleteUser/:id',(req,res)=>{
  baseDatos.deleteUser(req,res);
  });
//-------------------------------------------------------

app.get('/deleteCompra/:id',(req,res)=>{
  baseDatos.deleteCompra(req,res);
  });

//-------------------------------------------------------
app.get('/logout',(req,res)=>{
  res.clearCookie('token');
  res.redirect('/');
});
//------------------------------------------------------
app.get('/logout2',(req,res)=>{
  res.clearCookie('token2');
  res.redirect('/');
});
//------------------------------------------------------
app.get('/*',(req,res)=>{
  res.render('notfound.ejs')
});
//---------------------------------------------------
server.listen(port,()=>{
  console.log(`Servidor corriendo exitosamente en el puerto ${port}`);
});

