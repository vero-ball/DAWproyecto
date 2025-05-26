const mongoose = require('mongoose');
const Socio = require('./models/Socio');

mongoose.connect('mongodb://localhost:27017/asociacion', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('🟢 Conectado a MongoDB. Inserindo datos de mostra...');

  // Borra os existentes (opcional)
  await Socio.deleteMany({});

  // Inserir datos de mostra
  await Socio.insertMany([
    {
      nome: 'Ana',
      apelidos: 'Pérez González',
      numeroSocio: 1,
      dni: '12345678A',
      enderezo: 'Rúa da Paz 12, A Coruña',
      telefono: '654321987',
      correo: 'ana.perez@example.com',
      dataAlta: new Date('2021-03-15'),
    //   reciboNumero: 1001,
    //   ano: 2024,
    //   cota: 50,
    //   dataCobro: new Date('2024-01-10'),
    //   impago: false
    },
    {
      nome: 'Xoán',
      apelidos: 'Rodríguez Varela',
      numeroSocio: 2,
      dni: '87654321B',
      enderezo: 'Avda. Galicia 45, Lugo',
      telefono: '612345678',
      correo: 'xoan.rodriguez@example.com',
      dataAlta: new Date('2022-06-01'),
    //   reciboNumero: 1002,
    //   ano: 2024,
    //   cota: 50,
    //   dataCobro: new Date('2024-02-20'),
    //   impago: false
    },
    {
      nome: 'María',
      apelidos: 'López Souto',
      numeroSocio: 3,
      dni: '11223344C',
      enderezo: 'Rúa do Sol 8, Ourense',
      telefono: '698745123',
      correo: 'maria.lopez@example.com',
      dataAlta: new Date('2020-11-10'),
      dataBaixa: new Date('2023-05-15'),
      motivoBaixa: 'Cambio de domicilio',
    //   reciboNumero: 1003,
    //   ano: 2023,
    //   cota: 50,
    //   dataCobro: new Date('2023-01-05'),
    //   impago: true
    }
  ]);

  console.log('✅ Datos insertados correctamente!');
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Erro ao conectar ou insertar:', err);
});
