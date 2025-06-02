// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Ruta para el endpoint raíz
app.get('/', (req, res) => {
  res.send("Bienvenido a la API de ejemplo. Usa /users para acceder a la lista de usuarios.");
});

// GET /users - Recupera una lista de usuarios
app.get('/users', (req, res) => {
  // Datos simulados de usuarios
  const users = [
    { id: 1, name: 'Emanuel', email: 'emanuel@example.com' },
    { id: 2, name: 'Alice', email: 'alice@example.com' },
    { id: 3, name: 'Bob', email: 'bob@example.com' }
  ];
  res.json(users);
});

// POST /users - Crea un nuevo usuario
app.post('/users', (req, res) => {
  const newUser = req.body;
  // Simulamos la creación asignándole un ID basado en la marca de tiempo
  newUser.id = Date.now();
  res.status(201).json({
    message: 'Usuario creado exitosamente',
    user: newUser
  });
});

// PUT /users/:id - Reemplaza completamente la información de un usuario
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  updatedUser.id = id; // Aseguramos que el ID corresponda al parámetro
  res.json({
    message: `Usuario ${id} actualizado completamente`,
    user: updatedUser
  });
});

// PATCH /users/:id - Actualiza parcialmente la información de un usuario
app.patch('/users/:id', (req, res) => {
  const id = req.params.id;
  const userUpdates = req.body;
  res.json({
    message: `Usuario ${id} actualizado parcialmente`,
    updates: userUpdates
  });
});

// DELETE /users/:id - Elimina un usuario
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({
    message: `Usuario ${id} eliminado exitosamente`
  });
});

// HEAD /users/:id - Devuelve solo los encabezados para verificar la existencia de un recurso
app.head('/users/:id', (req, res) => {
  res.status(200).end();
});

// OPTIONS /users - Informa sobre los métodos HTTP permitidos para esta ruta
app.options('/users', (req, res) => {
  // Indicamos en la cabecera 'Allow' los métodos que soporta esta ruta
  res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS').send();
});

// Inicializa el servidor
app.listen(PORT, () => {
  console.log(`API en ejecución en http://localhost:${PORT}`);
});