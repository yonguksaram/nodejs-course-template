const { CommonHelper } = require('../../../src/helper/commonHelper');
const fs = require('fs');

function getAll() {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.getAllItems('src/resources/users/users.json');
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function getUserById(userId) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.getItem(
        'src/resources/users/users.json',
        userId
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function createUser(user) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.createItem(
        'src/resources/users/users.json',
        user,
        'The user was created'
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function updateUser(user) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.updateItem(
        'src/resources/users/users.json',
        user,
        'The user was updated'
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    try {
      const data = CommonHelper.deleteItem(
        'src/resources/users/users.json',
        userId,
        'The user was deleted'
      );
      resolve(data);
    } catch (error) {
      reject('an error occured');
    }
  });
}

function deleteUserTasks(userId) {
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
          if (data[index].userId && userId === data[index].userId) {
            data[index].userId = null;
            doesItemExist = true;
          }
        }
        if (doesItemExist) {
          data = JSON.stringify(data);
          data = data.slice(1, data.length - 1);
          fs.writeFileSync('src/resources/tasks/tasks.json', data);
          resolve('The tasks were deleted');
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
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteUserTasks
};
