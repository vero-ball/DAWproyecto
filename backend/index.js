'use strict'

const mongoose = require('mongoose');
const app = require('./server');
const PORT = process.env.PORT || 5000;

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/asociacion')
    .then(() => {
        console.log('Conexión a MongoDB exitosa');
        // Iniciar el servidor una vez que la conexión a la base de datos sea exitosa
        app.listen(PORT, () => {
            console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB:', err);
    });