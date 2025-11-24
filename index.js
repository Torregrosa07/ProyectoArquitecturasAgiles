const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Esto carga las variables del archivo .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- CONEXIÓN A MONGODB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Conectado exitosamente a MongoDB Atlas"))
  .catch((error) => console.error("🔴 Error al conectar a MongoDB:", error));

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Arrancar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});