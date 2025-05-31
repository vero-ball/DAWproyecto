const Actividade = require('../models/Actividade');

// Crear nova actividade
exports.crearActividade = async (req, res) => {
  try {
    const novaActividade = new Actividade(req.body);
    await novaActividade.save();
    res.status(201).json(novaActividade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todas as actividades
exports.obterActividades = async (req, res) => {
  try {
    const actividades = await Actividade.find().populate('participantes');
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter unha actividade por ID
exports.obterActividade = async (req, res) => {
  try {
    const actividade = await Actividade.findById(req.params.id).populate('participantes');
    if (!actividade) return res.status(404).json({ msg: 'Actividade non atopada' });
    res.json(actividade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar actividade
exports.actualizarActividade = async (req, res) => {
  try {
    const actividade = await Actividade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actividade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar actividade
exports.eliminarActividade = async (req, res) => {
  try {
    await Actividade.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Actividade eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};