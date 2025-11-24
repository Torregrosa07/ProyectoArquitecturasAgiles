const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- IMPORTAR RUTAS ---
// Aquí le decimos donde están los archivos que creaste
const authRoutes = require('./routes/auth');
const torneosRoutes = require('./routes/torneos'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- USAR RUTAS ---
// Aquí conectamos la URL con el archivo
// Todo lo que empiece por /api/auth se va al archivo auth.js
app.use('/api/auth', authRoutes);

// Todo lo que empiece por /api/torneos se va al archivo torneos.js
app.use('/api/torneos', torneosRoutes);

// Conexión a Base de Datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Conectado exitosamente a MongoDB Atlas"))
  .catch((error) => console.error("🔴 Error al conectar a MongoDB:", error));

// Arrancar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});