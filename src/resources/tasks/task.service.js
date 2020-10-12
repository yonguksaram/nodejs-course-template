const tasksRepo = require('./task.memory.repository');

function getAll() {
  return new Promise((resolve, reject) => {
    resolve(tasksRepo.getAll());
  });
}

function getTaskById(taskId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(tasksRepo.getTaskById(taskId));
    } catch (error) {
      reject('an error occured');
    }
  });
}

function createTask(task, boardId) {
  return new Promise((resolve, reject) => {
    task.boardId = boardId;
    try {
      resolve(tasksRepo.createTask(task));
    } catch (error) {
      reject('an error occured');
    }
  });
}

function updateTask(task) {
  return new Promise((resolve, reject) => {
    try {
      resolve(tasksRepo.updateTask(task));
    } catch (error) {
      reject('an error occured');
    }
  });
}

function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(tasksRepo.deleteTask(taskId));
    } catch (error) {
      reject('an error occured');
    }
  });
}

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask };
