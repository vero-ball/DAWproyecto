const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Socio = require('./models/Socio');

mongoose.connect('mongodb://localhost:27017/asociacion', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('🟢 Conectado a MongoDB. Inserindo datos de mostra...');

  // Borra os existentes
  await Socio.deleteMany({});

  // Datos de socios de mostra
  const socios = [
    {
      nome: "Ana",
      apelidos: "Pérez García",
      numeroSocio: 1,
      dni: "12345678A",
      enderezo: "Rúa Principal 10, Vigo",
      telefono: "666123456",
      correo: "ana.perez@email.com",
      dataAlta: new Date("2024-01-15"),
      password: "proba123", // Sen hashear, faise despois
      directivo: false
    },
    {
      nome: "Manuel",
      apelidos: "López Fernández",
      numeroSocio: 2,
      dni: "87654321B",
      enderezo: "Rúa Secundaria 5, Vigo",
      telefono: "666654321",
      correo: "manuel.lopez@email.com",
      dataAlta: new Date("2023-11-10"),
      password: "admin123",
      directivo: true
    }
  ];

  // Hashear contrasinais e gardar socios
  for (const socioData of socios) {
    const hashedPassword = await bcrypt.hash(socioData.password, 10);
    const socio = new Socio({ ...socioData, password: hashedPassword });
    await socio.save();
    console.log(`✅ Socio creado: ${socio.nome} (${socio.directivo ? 'Directivo' : 'Socio'})`);
  }

  console.log('✅ Seed completado.');
  process.exit();
})
.catch(err => {
  console.error('❌ Erro conectando a MongoDB:', err);
  process.exit(1);
});
