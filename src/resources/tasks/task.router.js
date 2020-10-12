const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.get('/', async (req, res) => {
  const tasks = await tasksService.getAll();
  res.status(200).json(tasks.map(Task.toResponse));
});

router.post('/', async (req, res) => {
  const boardId = req.boardId;
  const task = await tasksService.createTask(req.body, boardId);
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(Task.toResponse(task));
});

router.get('/:id', async (req, res) => {
  const task = await tasksService.getTaskById(req.params.id);
  if (task) {
    res.status(200);
    res.json(Task.toResponse(task));
  } else {
    res.status(404);
    res.send('The task was not found');
  }
});

router.put('/:id', async (req, res) => {
  const task = await tasksService.updateTask(req.body);
  if (task) {
    res.status(200);
    res.json(Task.toResponse(task));
  } else {
    res.status(404);
    res.send('The task was not found');
  }
});

router.delete('/:id', async (req, res) => {
  const result = await tasksService.deleteTask(req.params.id);
  res.status(200).send(result);
});

module.exports = router;
