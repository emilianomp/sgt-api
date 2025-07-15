const Task = require('../models/Task');

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear nueva tarea
exports.createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
    return newTask; // ← importante para emitir evento socket
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar una tarea por ID
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.json(updatedTask);
    return updatedTask; // ← necesario para socket
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una tarea por ID
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.json({ message: 'Tarea eliminada correctamente' });
    return deletedTask; // ← necesario para socket
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// const Task = require('../models/Task');

// // Obtener todas las tareas
// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Crear nueva tarea
// exports.createTask = async (req, res) => {
//   const task = new Task({
//     title: req.body.title,
//     description: req.body.description,
//     completed: req.body.completed || false
//   });

//   try {
//     const newTask = await task.save();
//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Obtener una tarea por ID
// exports.getTaskById = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Actualizar una tarea por ID
// exports.updateTask = async (req, res) => {
//   try {
//     const updatedTask = await Task.findByIdAndUpdate(
//       req.params.id,
//       {
//         title: req.body.title,
//         description: req.body.description,
//         completed: req.body.completed
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedTask) return res.status(404).json({ message: 'Tarea no encontrada' });

//     res.json(updatedTask);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Eliminar una tarea por ID
// exports.deleteTask = async (req, res) => {
//   try {
//     const deletedTask = await Task.findByIdAndDelete(req.params.id);
//     if (!deletedTask) return res.status(404).json({ message: 'Tarea no encontrada' });

//     res.json({ message: 'Tarea eliminada correctamente' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
