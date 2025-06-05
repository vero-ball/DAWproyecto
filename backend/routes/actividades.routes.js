const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const actividadesController = require('../controllers/actividades.controller');

// Crear nova actividade
router.post('/', auth, actividadesController.crearActividade);

// Obter todas as actividades
router.get('/', auth, actividadesController.obterActividades);

// Obter unha actividade por ID
router.get('/:id', auth, actividadesController.obterActividade);

// Actualizar actividade
router.put('/:id', auth, actividadesController.actualizarActividade);

// Eliminar actividade
router.delete('/:id', auth, actividadesController.eliminarActividade);

module.exports = router;