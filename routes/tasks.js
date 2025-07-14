const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.post('/', taskController.getTaskById);
router.post('/', taskController.updateTask);
router.post('/', taskController.deleteTask);

module.exports = router;