const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// REGISTRO
router.post('/registro', async (req, res) => {
  try {
    // Solo extraemos el email para validar si ya existe
    const { email } = req.body;
    
    // 1. Verificar si ya existe en la base de datos
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: "El email ya existe" });

    // 2. Crear el usuario con TODO el objeto que viene del Postman
    // Al usar 'req.body', Mongoose se encarga de leer los mazos, cartas, edad, etc.
    const nuevoUsuario = new Usuario(req.body);
    
    // 3. Guardar en MongoDB
    await nuevoUsuario.save();
    
    res.status(201).json({ mensaje: "Jugador registrado con sus mazos", usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN (Simple)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });

    // Verificar si existe y si la contraseña coincide
    if (!usuario || usuario.password !== password) {
      return res.status(400).json({ mensaje: "Credenciales incorrectas" });
    }

    res.json({ mensaje: "Login exitoso", usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;