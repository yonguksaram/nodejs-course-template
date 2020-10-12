const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.post('/', async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.json(User.toResponse(user));
});

router.get('/:id', async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  res.status(200);
  res.json(User.toResponse(user));
});

router.put('/:id', async (req, res) => {
  const user = await usersService.updateUser(req.body);
  res.status(200);
  res.json(User.toResponse(user));
});

router.delete('/:id', async (req, res) => {
  const result = await usersService.deleteUser(req.params.id);
  res.status(200).send(result);
});

module.exports = router;
