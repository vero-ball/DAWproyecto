// const express = require('express');
// const app = express();
const Socio = require('../models/Socio');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// app.use(express.json());

exports.login = async (req, res) => {
  const { dni, password } = req.body;
  console.log('Intentando login con DNI:', dni);
  console.log('Body recibido:', req.body);

  try {
    const socio = await Socio.findOne({ dni });
    if (!socio) return res.status(404).json({ msg: 'Socio non atopado' });

    const isMatch = await bcrypt.compare(password, socio.password);
    if (!isMatch) return res.status(401).json({ msg: 'Contrasinal incorrecto' });

    const token = jwt.sign(
      { id: socio._id, directivo: socio.directivo },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      socio: {
        id: socio._id,
        nome: socio.nome,
        apelidos: socio.apelidos,
        directivo: socio.directivo
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  const socios = await Socio.find();
  console.log('DNI dos socios na base de datos:', socios.map(s => s.dni));
};