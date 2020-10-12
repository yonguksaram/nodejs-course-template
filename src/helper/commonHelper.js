const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class CommonHelper {
  static getAllItems(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        }
        data = data.replace(/}{/g, '},{');
        resolve(JSON.parse(`[${data}]`));
      });
    });
  }

  static getItem(path, itemId) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        }
        data = data.replace(/}{/g, '},{');
        data = JSON.parse(`[${data}]`);
        let result;
        for (const item of data) {
          if (item.id && itemId === item.id) {
            result = item;
            break;
          }
        }
        resolve(result);
      });
    });
  }

  static createItem(path, item) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        }
        item.id = uuidv4();
        fs.appendFileSync(path, JSON.stringify(item));
        resolve(item);
      });
    });
  }

  static updateItem(path, item, responseString) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        }
        data = data.replace(/}{/g, '},{');
        data = JSON.parse(`[${data}]`);
        let doesItemExist = false;
        for (const index in data) {
          if (data[index].id && item.id === data[index].id) {
            data[index] = item;
            doesItemExist = true;
            break;
          }
        }
        data = JSON.stringify(data);
        data = data.slice(1, data.length - 1);
        fs.writeFileSync(path, data);
        resolve(item);
      });
    });
  }

  static deleteItem(path, itemId, responseString) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        }
        data = data.replace(/}{/g, '},{');
        data = JSON.parse(`[${data}]`);
        let doesItemExist = false;
        for (const index in data) {
          if (data[index].id && itemId === data[index].id) {
            data[index] = {};
            doesItemExist = true;
            break;
          }
        }
        if (doesItemExist) {
          data = data.filter(item => item.id);
          data = JSON.stringify(data);
          data = data.slice(1, data.length - 1);
          fs.writeFileSync(path, data);
          resolve(responseString);
        } else {
          resolve('The item was not found');
        }
      });
    });
  }
}

module.exports = {
  CommonHelper
};
