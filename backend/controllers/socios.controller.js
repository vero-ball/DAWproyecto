const Socio = require('../models/Socio');
const bcrypt = require('bcryptjs');

// Crear novo socio
exports.crearSocio = async (req, res) => {
  console.log('📝 Creando novo socio:', req.body);
  try {
    const { password, ...resto } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const novoSocio = new Socio({ ...resto, password: hashedPassword });
    await novoSocio.save();
    console.log('✅ Socio creado exitosamente:', novoSocio);
    res.status(201).json(novoSocio);
  } catch (error) {
    console.error('❌ Error creando socio:', error);
    res.status(400).json({ error: error.message });
  }
};

// Obter todos os socios
exports.obterSocios = async (req, res) => {
  try {
    const socios = await Socio.find().lean();
    if (!socios) return res.status(404).json({ msg: 'Socios non atopados' });

    // Buscar actividades nas que participaron
    const Actividade = require('../models/Actividade');
    const actividades = await Actividade.find({ 'participantes.socio': { $in: socios.map(s => s._id) } });
    socios.forEach(s => {
      s.actividades = actividades.filter(a => a.participantes.some(p => p.socio.equals(s._id)));
    });

    res.json(socios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter un socio por ID
exports.obterSocio = async (req, res) => {
  console.log('🔍 Buscando socio con ID:', req.params.id);
  try {
    const socio = await Socio.findById(req.params.id);
    if (!socio) {
      console.log('❌ Socio non atopado');
      return res.status(404).json({ msg: 'Socio non atopado' });
    }
    console.log('✅ Socio encontrado:', socio);
    res.json(socio);
  } catch (error) {
    console.error('❌ Error buscando socio:', error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar socio
exports.actualizarSocio = async (req, res) => {
  console.log('✏️ Actualizando socio:', req.params.id, req.body);
  try {
    const socio = await Socio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log('✅ Socio actualizado:', socio);
    res.json(socio);
  } catch (error) {
    console.error('❌ Error actualizando socio:', error);
    res.status(400).json({ error: error.message });
  }
};

// Eliminar socio
exports.eliminarSocio = async (req, res) => {
  console.log('🗑️ Eliminando socio:', req.params.id);
  try {
    await Socio.findByIdAndDelete(req.params.id);
    console.log('✅ Socio eliminado');
    res.json({ msg: 'Socio eliminado' });
  } catch (error) {
    console.error('❌ Error eliminando socio:', error);
    res.status(500).json({ error: error.message });
  }
};