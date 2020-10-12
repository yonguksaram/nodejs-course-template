const boardsRepo = require('./board.memory.repository');

function getAll() {
  return new Promise((resolve, reject) => {
    resolve(boardsRepo.getAll());
  });
}

function getBoardById(boardId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(boardsRepo.getBoardById(boardId));
    } catch (error) {
      reject('an error occured');
    }
  });
}

function createBoard(board) {
  return new Promise((resolve, reject) => {
    try {
      resolve(boardsRepo.createBoard(board));
    } catch (error) {
      reject('an error occured');
    }
  });
}

function updateBoard(board) {
  return new Promise((resolve, reject) => {
    try {
      resolve(boardsRepo.updateBoard(board));
    } catch (error) {
      reject('an error occured');
    }
  });
}

function deleteBoard(boardId) {
  return new Promise((resolve, reject) => {
    try {
      boardsRepo
        .deleteBoardTasks(boardId)
        .then(result => resolve(boardsRepo.deleteBoard(boardId)));
    } catch (error) {
      reject('an error occured');
    }
  });
}

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
