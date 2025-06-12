const express = require('express');
const router = express.Router();
const inscricionsCtrl = require('../controllers/inscricions.controller');

router.post('/', inscricionsCtrl.crearInscricion);
router.get('/actividade/:actividadeId', inscricionsCtrl.inscritosPorActividade);
router.delete('/:id', inscricionsCtrl.borrarInscricion);

module.exports = router;