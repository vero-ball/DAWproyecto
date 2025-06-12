const Actividade = require('../models/Actividade');

// Crear nova actividade
exports.crearActividade = async (req, res) => {
  try {
    // Adaptar participantes ao novo formato
    const participantes = (req.body.participantes || []).map(p => {
      if (p.eSocio) {
        return { socio: p._id, eSocio: true };
      } else {
        return { nome: p.nome, apelidos: p.apelidos, eSocio: false };
      }
    });
    const novaActividade = new Actividade({ ...req.body, participantes });
    await novaActividade.save();
    res.status(201).json(novaActividade);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// Obter todas as actividades
exports.obterActividades = async (req, res) => {
  try {
    const actividades = await Actividade.find().populate('participantes.socio');
    res.json(actividades); // Isto debe ser un array []
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter unha actividade por ID
exports.crearActividade = async (req, res) => {
  try {
    const { nome, descricion, data, lugar, participantes } = req.body;
    const novaActividade = new Actividade({
      nome,
      descricion,
      data,
      lugar,
      participantes // array de ObjectId de socios
    });
    await novaActividade.save();
    res.status(201).json(novaActividade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar actividade
exports.actualizarActividade = async (req, res) => {
  try {
    const { nome, descricion, data, lugar, participantes } = req.body;
    const actividade = await Actividade.findByIdAndUpdate(
      req.params.id,
      { nome, descricion, data, lugar, participantes },
      { new: true }
    );
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