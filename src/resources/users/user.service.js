const usersRepo = require('./user.memory.repository');
const fs = require('fs');

function getAll() {
  return new Promise((resolve, reject) => {
    resolve(usersRepo.getAll());
  });
}

function getUserById(userId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(usersRepo.getUserById(userId));
    } catch (error) {
      reject('an error occured');
    }
  });
}

function createUser(user) {
  return new Promise((resolve, reject) => {
    try {
      resolve(usersRepo.createUser(user));
    } catch (error) {
      reject('an error occured');
    }
  });
}

function updateUser(user) {
  return new Promise((resolve, reject) => {
    try {
      resolve(usersRepo.updateUser(user));
    } catch (error) {
      reject('an error occured');
    }
  });
}

function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    try {
      usersRepo
        .deleteUserTasks(userId)
        .then(result => resolve(usersRepo.deleteUser(userId)));
    } catch (error) {
      reject('an error occured');
    }
  });
}

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
