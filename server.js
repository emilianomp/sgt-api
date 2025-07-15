require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io')

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas (gratuito)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a nuestra API - SGT - Sistema de Gestion de Tareas' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});