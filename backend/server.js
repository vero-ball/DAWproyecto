const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Importar multer para manejar la subida de archivos
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Arquivos de rutas
const sociosRoutes = require('./routes/socios.routes');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de CORS
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

app.post('/upload', upload.single('archivo'), (req, res) => {
  console.log(req.file);
  res.send('Archivo subido');
});

// Rutas
// app.get('/', (req, res) => {
//   res.send('API funcionando correctamente');
// });
app.use('/api/socios', sociosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escoitando en http://localhost:${PORT}`);
});
