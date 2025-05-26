// backend/models/Socio.js
const mongoose = require('mongoose');

const socioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  apelidos: { type: String, required: true },
  numeroSocio: { type: Number, required: true, unique: true },
  dni: { type: String, required: true, unique: true },
  enderezo: { type: String },
  telefono: { type: String },
  correo: { type: String },
  dataAlta: { type: Date, required: true },
  dataBaixa: { type: Date },
  motivoBaixa: { type: String },
//   reciboNumero: { type: Number, required: true },
//   ano: { type: Number, required: true },
//   cota: { type: Number, required: true },
//   dataCobro: { type: Date },
//   impago: { type: Boolean, default: false }
});

module.exports = mongoose.model('Socio', socioSchema);
