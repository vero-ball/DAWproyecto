const express = require('express');
const router = express.Router();

const controlador = require('../controllers/socios.controller');

router.post('/', controlador.crearSocio);
router.get('/', controlador.obterSocios);
router.get('/:id', controlador.obterSocio);
router.put('/:id', controlador.actualizarSocio);
router.delete('/:id', controlador.eliminarSocio);

module.exports = router;
