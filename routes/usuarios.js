// Path: api/usuarios

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios } = require('../controllers/usuarios');

const router = Router();

// Validar JWT
router.get('/', validarJWT, getUsuarios)


module.exports = router;