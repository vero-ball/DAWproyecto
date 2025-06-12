const mongoose = require('mongoose');

const inscricionSchema = new mongoose.Schema({
  socio: { type: mongoose.Schema.Types.ObjectId, ref: 'Socio', required: true },
  actividade: { type: mongoose.Schema.Types.ObjectId, ref: 'Actividade', required: true },
  dataInscricion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inscricion', inscricionSchema);