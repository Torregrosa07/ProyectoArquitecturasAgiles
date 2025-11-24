const express = require('express');
const router = express.Router();
const Torneo = require('../models/Torneo');

// 1. OBTENER TODOS LOS TORNEOS
// Usamos .populate() para que nos traiga los datos reales del Creador y de los Participantes
router.get('/', async (req, res) => {
  try {
    const torneos = await Torneo.find()
      .populate('creador', 'nombre tagClash') // Trae nombre y tag del creador
      .populate('participantes.jugador', 'nombre tagClash'); // Trae datos de los jugadores inscritos
      
    res.json(torneos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. CREAR TORNEO
router.post('/', async (req, res) => {
  try {
    // req.body debe traer: nombre, fecha, creador (ID), etc.
    const nuevoTorneo = new Torneo(req.body);
    const guardado = await nuevoTorneo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. INSCRIBIRSE A UN TORNEO
router.put('/unirse/:idTorneo', async (req, res) => {
  const { idUsuario } = req.body; // El ID del jugador que se inscribe

  try {
    const torneo = await Torneo.findById(req.params.idTorneo);

    if (!torneo) return res.status(404).json({ mensaje: "Torneo no encontrado" });

    // Validar si ya está inscrito
    // (Buscamos si en el array participantes existe alguno con ese ID)
    const yaInscrito = torneo.participantes.some(
      (p) => p.jugador.toString() === idUsuario
    );

    if (yaInscrito) {
      return res.status(400).json({ mensaje: "Ya estás inscrito en este torneo" });
    }

    // Agregamos al array con la estructura de tu nuevo Schema
    torneo.participantes.push({ jugador: idUsuario });
    
    await torneo.save();
    res.json({ mensaje: "Inscripción exitosa", torneo });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;