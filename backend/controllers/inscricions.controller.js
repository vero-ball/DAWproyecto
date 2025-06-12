const Inscricion = require('../models/Inscricion');

// Crear inscrición
exports.crearInscricion = async (req, res) => {
  try {
    const { socio, actividade } = req.body;
    // Comprobar se xa existe inscrición
    const existe = await Inscricion.findOne({ socio, actividade });
    if (existe) return res.status(400).json({ msg: 'Xa está inscrito.' });

    const inscricion = new Inscricion({ socio, actividade });
    await inscricion.save();
    res.status(201).json(inscricion);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Listar inscritos dunha actividade
exports.inscritosPorActividade = async (req, res) => {
  try {
    const { actividadeId } = req.params;
    const inscritos = await Inscricion.find({ actividade: actividadeId }).populate('socio');
    res.json(inscritos);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Borrar inscrición
exports.borrarInscricion = async (req, res) => {
  try {
    const { id } = req.params;
    await Inscricion.findByIdAndDelete(id);
    res.json({ msg: 'Inscrición borrada' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};