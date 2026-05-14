const { tasks, createTaskData, findTask } = require('../models/taskModel');

function getAllTasks(req, res) {
  res.json(tasks);
}

function getTaskById(req, res, next) {
  const taskId = Number(req.params.id);
  const task = findTask(taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  res.json(task);
}

function createTask(req, res) {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'O título é obrigatório.' });
  }

  const task = createTaskData({ title, description });
  res.status(201).json(task);
}

function updateTask(req, res) {
  const taskId = Number(req.params.id);
  const task = findTask(taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  const { title, description, completed } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'O título é obrigatório.' });
  }

  task.title = title;
  task.description = description || task.description;
  task.completed = typeof completed === 'boolean' ? completed : task.completed;

  res.json(task);
}

function deleteTask(req, res) {
  const taskId = Number(req.params.id);
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  tasks.splice(index, 1);
  res.status(204).end();
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
