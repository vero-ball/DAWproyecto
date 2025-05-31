const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  fecha: { type: Date, required: true },
  lugar: { type: String },
  participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Socio' }]
});

module.exports = mongoose.model('Actividad', actividadSchema);