const mongoose = require('mongoose');

const participanteSchema = new mongoose.Schema({
  socio: { type: mongoose.Schema.Types.ObjectId, ref: 'Socio' },
  nome: String,
  apelidos: String,
  eSocio: { type: Boolean, required: true }
}, { _id: false });

const actividadeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricion: String,
  data: { type: Date, required: true },
  lugar: String,
  participantes: [participanteSchema]
});

module.exports = mongoose.model('Actividade', actividadeSchema);