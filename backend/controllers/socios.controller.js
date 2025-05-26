const Socio = require('../models/Socio');

// Crear novo socio
exports.crearSocio = async (req, res) => {
  try {
    const novoSocio = new Socio(req.body);
    await novoSocio.save();
    res.status(201).json(novoSocio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todos os socios
exports.obterSocios = async (req, res) => {
  try {
    const socios = await Socio.find();
    res.json(socios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter un socio por ID
exports.obterSocio = async (req, res) => {
  try {
    const socio = await Socio.findById(req.params.id);
    if (!socio) return res.status(404).json({ msg: 'Socio non atopado' });
    res.json(socio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar socio
exports.actualizarSocio = async (req, res) => {
  try {
    const socio = await Socio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(socio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar socio
exports.eliminarSocio = async (req, res) => {
  try {
    await Socio.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Socio eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
