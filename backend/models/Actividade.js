const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricion: { type: String },
  data: { type: Date, required: true },
  lugar: { type: String },
  participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Socio' }]
});

module.exports = mongoose.model('Actividad', actividadSchema);