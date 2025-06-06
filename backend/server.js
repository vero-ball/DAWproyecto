const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Importar multer para manejar la subida de archivos
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Configuración de CORS
// app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('archivo'), (req, res) => {
  console.log(req.file);
  res.send('Archivo subido');
});

// Engade isto ANTES das rutas
app.use(cors({
  origin: 'http://localhost:4200', // ou '*', pero mellor especificar
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rutas
app.use('/api/socios', require('./routes/socios.routes'));
app.use('/api/actividades', require('./routes/actividades.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

// Exportar la aplicación sin iniciar el servidor
module.exports = app;