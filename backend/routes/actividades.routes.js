const express = require('express');
const router = express.Router();
const actividadesController = require('../controllers/actividades.controller');

// Crear nova actividade
router.post('/', actividadesController.crearActividade);

// Obter todas as actividades
router.get('/', actividadesController.obterActividades);

// Obter unha actividade por ID
router.get('/:id', actividadesController.obterActividade);

// Actualizar actividade
router.put('/:id', actividadesController.actualizarActividade);

// Eliminar actividade
router.delete('/:id', actividadesController.eliminarActividade);

module.exports = router;