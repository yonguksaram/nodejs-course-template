const { CommonHelper } = require('../../../src/helper/commonHelper');
const fs = require('fs');

function getAll() {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.getAllItems('src/resources/boards/boards.json');
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function getBoardById(boardId) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.getItem(
        'src/resources/boards/boards.json',
        boardId
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function createBoard(board) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.createItem(
        'src/resources/boards/boards.json',
        board
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function updateBoard(board) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.updateItem(
        'src/resources/boards/boards.json',
        board,
        'The board was updated'
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function deleteBoard(boardId) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.deleteItem(
        'src/resources/boards/boards.json',
        boardId,
        'The board was deleted'
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function deleteBoardTasks(boardId) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile('src/resources/tasks/tasks.json', 'utf8', (error, data) => {
        if (error) {
          reject(error);
        }
        data = data.replace(/}{/g, '},{');
        data = JSON.parse(`[${data}]`);
        let doesItemExist = false;
        for (const index in data) {
          if (data[index].boardId && boardId === data[index].boardId) {
            data[index] = {};
            doesItemExist = true;
          }
        }
        if (doesItemExist) {
          data = data.filter(item => item.id);
          data = JSON.stringify(data);
          data = data.slice(1, data.length - 1);
          fs.writeFileSync('src/resources/tasks/tasks.json', data);
          resolve('There tasks were deleted');
        } else {
          resolve('There is no tasks fot this board');
        }
      });
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
  deleteBoard,
  deleteBoardTasks
};
