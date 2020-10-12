const { CommonHelper } = require('../../../src/helper/commonHelper');

function getAll() {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.getAllItems('src/resources/tasks/tasks.json');
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function getTaskById(taskId) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.getItem(
        'src/resources/tasks/tasks.json',
        taskId
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function createTask(task) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.createItem(
        'src/resources/tasks/tasks.json',
        task
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function updateTask(task) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.updateItem(
        'src/resources/tasks/tasks.json',
        task,
        'The task was updated'
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.deleteItem(
        'src/resources/tasks/tasks.json',
        taskId,
        'The task was deleted'
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask };
