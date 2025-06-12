const mongoose = require('mongoose');

const actividadeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricion: String,
  data: { type: Date, required: true },
  lugar: String,
  participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Socio' }]
});

module.exports = mongoose.model('Actividade', actividadeSchema);