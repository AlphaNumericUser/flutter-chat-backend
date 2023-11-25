// Path: /api/mensajes

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajes');

const router = Router();

// Validar JWT
router.get('/:de', validarJWT, obtenerChat)


module.exports = router;