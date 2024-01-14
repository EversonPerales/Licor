// Middleware para obtener la dirección IP del cliente
const obtenerDireccionIP = (req, res, next) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  req.ip = ipAddress;
  next();
};


module.exports={
 obtenerDireccionIP 
}

