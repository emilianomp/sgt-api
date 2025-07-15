// const express = require('express');
// const router = express.Router();
// const taskController = require('../controllers/taskController');

// // Obtener todas las tareas
// router.get('/', taskController.getAllTasks);

// // Crear una nueva tarea
// router.post('/', taskController.createTask);

// // Obtener una tarea por ID
// router.get('/:id', taskController.getTaskById);

// // Actualizar una tarea por ID
// router.put('/:id', taskController.updateTask);

// // Eliminar una tarea por ID
// router.delete('/:id', taskController.deleteTask);

// module.exports = router;


const express = require('express');
const taskController = require('../controllers/taskController');

module.exports = function(io) {
  const router = express.Router();

  // Obtener todas las tareas
  router.get('/', taskController.getAllTasks);

  // Crear una nueva tarea
  router.post('/', async (req, res) => {
    const result = await taskController.createTask(req, res);
    if (result) io.emit('taskCreated', result);
  });

  // Obtener una tarea por ID
  router.get('/:id', taskController.getTaskById);

  // Actualizar una tarea por ID
  router.put('/:id', async (req, res) => {
    const result = await taskController.updateTask(req, res);
    if (result) io.emit('taskUpdated', result);
  });

  // Eliminar una tarea por ID
  router.delete('/:id', async (req, res) => {
    const result = await taskController.deleteTask(req, res);
    if (result) io.emit('taskDeleted', result);
  });

  return router;
};
