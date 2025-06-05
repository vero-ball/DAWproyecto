const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controlador = require('../controllers/socios.controller');

router.post('/', auth, controlador.crearSocio);
router.get('/', auth, controlador.obterSocios);
router.get('/:id', auth, controlador.obterSocio);
router.put('/:id', auth, controlador.actualizarSocio);
router.delete('/:id', auth, controlador.eliminarSocio);

module.exports = router;
