const mongoose = require('mongoose');
const app = require('./server');
const PORT = process.env.PORT || 5000;

mongoose.promise = global.Promise;

// Usar a mesma URI de conexión que en server.js se existe
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/asociacion';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ Conexión a MongoDB exitosa');
        
        // Iniciar el servidor una vez que la conexión a la base de datos sea exitosa
        app.listen(PORT, () => {
            console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
            console.log(`📊 Base de datos: ${MONGO_URI}`);
        });
    })
    .catch(err => {
        console.error('❌ Error al conectar a MongoDB:', err);
        process.exit(1);
    });