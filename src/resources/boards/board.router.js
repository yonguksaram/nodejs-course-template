const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.get('/', async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards.map(Board.toResponse));
});

router.post('/', async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(Board.toResponse(board));
});

router.get('/:id', async (req, res) => {
  const board = await boardsService.getBoardById(req.params.id);
  if (board) {
    res.status(200);
    res.json(Board.toResponse(board));
  } else {
    res.status(404);
    res.send('The board was not found');
  }
});

router.put('/:id', async (req, res) => {
  const board = await boardsService.updateBoard(req.body);
  if (board) {
    res.status(200);
    res.json(Board.toResponse(board));
  } else {
    res.status(404);
    res.send('The board was not found');
  }
});

router.delete('/:id', async (req, res) => {
  const result = await boardsService.deleteBoard(req.params.id);
  res.status(200).send(result);
});

module.exports = router;
